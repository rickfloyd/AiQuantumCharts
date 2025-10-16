# Gaming Portal Development Tools Manager (Windows PowerShell)
# Adapted from development tools firewall management
# Temporarily allows development tools through firewall for gaming portal development

param(
    [ValidateSet("Allow", "Block", "Status")]
    [string]$Action = "Status",
    [int]$TimeoutMinutes = 60
)

$GamingPortalDir = "C:\GamingPortal"
$LogDir = "$GamingPortalDir\Logs"
$DevToolsLog = "$LogDir\dev-tools-manager.log"

# Development tools for Gaming Portal
$DevelopmentTools = @{
    "Node.js" = @{
        "Paths" = @("C:\Program Files\nodejs\node.exe", "C:\Program Files (x86)\nodejs\node.exe")
        "Ports" = @(3000, 5173, 8080, 9229)
        "Description" = "Node.js runtime for backend server"
    }
    "npm" = @{
        "Paths" = @("C:\Program Files\nodejs\npm.cmd", "C:\Program Files (x86)\nodejs\npm.cmd")
        "Ports" = @()
        "Description" = "Node Package Manager"
    }
    "Chrome" = @{
        "Paths" = @("C:\Program Files\Google\Chrome\Application\chrome.exe", "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe")
        "Ports" = @(9222)
        "Description" = "Chrome browser for debugging"
    }
    "VSCode" = @{
        "Paths" = @("$env:LOCALAPPDATA\Programs\Microsoft VS Code\Code.exe", "C:\Program Files\Microsoft VS Code\Code.exe")
        "Ports" = @()
        "Description" = "Visual Studio Code editor"
    }
    "Git" = @{
        "Paths" = @("C:\Program Files\Git\bin\git.exe", "C:\Program Files (x86)\Git\bin\git.exe")
        "Ports" = @()
        "Description" = "Git version control"
    }
    "Python" = @{
        "Paths" = @("C:\Python*\python.exe", "$env:LOCALAPPDATA\Programs\Python\Python*\python.exe")
        "Ports" = @(8000, 8080)
        "Description" = "Python runtime for scripts"
    }
}

# Create directories if they don't exist
if (!(Test-Path $LogDir)) {
    New-Item -ItemType Directory -Path $LogDir -Force | Out-Null
}

function Write-DevLog {
    param([string]$Message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logEntry = "$timestamp - $Message"
    Write-Host $logEntry
    Add-Content -Path $DevToolsLog -Value $logEntry
}

function Get-ToolExecutable {
    param([array]$Paths)
    
    foreach ($path in $Paths) {
        if ($path -contains "*") {
            # Handle wildcard paths
            $resolvedPaths = Resolve-Path $path -ErrorAction SilentlyContinue
            if ($resolvedPaths) {
                return $resolvedPaths[0].Path
            }
        } elseif (Test-Path $path) {
            return $path
        }
    }
    return $null
}

function Allow-DevelopmentTools {
    Write-DevLog "🔓 Allowing development tools for Gaming Portal development..."
    
    foreach ($toolName in $DevelopmentTools.Keys) {
        $tool = $DevelopmentTools[$toolName]
        $executablePath = Get-ToolExecutable -Paths $tool.Paths
        
        if ($executablePath) {
            try {
                # Create firewall rule for executable
                $ruleName = "Gaming Portal Dev - $toolName"
                Remove-NetFirewallRule -DisplayName $ruleName -ErrorAction SilentlyContinue
                New-NetFirewallRule -DisplayName $ruleName -Direction Inbound -Program $executablePath -Action Allow -Profile Any
                Write-DevLog "✅ Allowed $toolName ($executablePath)"
                
                # Create rules for specific ports if defined
                foreach ($port in $tool.Ports) {
                    $portRuleName = "Gaming Portal Dev - $toolName Port $port"
                    Remove-NetFirewallRule -DisplayName $portRuleName -ErrorAction SilentlyContinue
                    New-NetFirewallRule -DisplayName $portRuleName -Direction Inbound -Protocol TCP -LocalPort $port -Action Allow -Profile Any
                    Write-DevLog "✅ Allowed port $port for $toolName"
                }
                
            } catch {
                Write-DevLog "❌ Failed to allow $toolName : $($_.Exception.Message)"
            }
        } else {
            Write-DevLog "⚠️ $toolName not found in standard locations"
        }
    }
    
    # Set timeout if specified
    if ($TimeoutMinutes -gt 0) {
        Write-DevLog "⏰ Development tools access will expire in $TimeoutMinutes minutes"
        $timeoutTime = (Get-Date).AddMinutes($TimeoutMinutes)
        
        # Create a scheduled task to block tools after timeout
        $taskAction = New-ScheduledTaskAction -Execute "PowerShell.exe" -Argument "-File `"$PSScriptRoot\dev-tools-manager.ps1`" -Action Block"
        $taskTrigger = New-ScheduledTaskTrigger -Once -At $timeoutTime
        $taskSettings = New-ScheduledTaskSettingsSet -DeleteExpiredTaskAfter (New-TimeSpan -Hours 1)
        
        Register-ScheduledTask -TaskName "Gaming Portal - Block Dev Tools" -Action $taskAction -Trigger $taskTrigger -Settings $taskSettings -Force
        Write-DevLog "✅ Auto-block scheduled for $timeoutTime"
    }
}

function Block-DevelopmentTools {
    Write-DevLog "🔒 Blocking development tools access..."
    
    # Remove all gaming portal development firewall rules
    $rules = Get-NetFirewallRule -DisplayName "*Gaming Portal Dev*" -ErrorAction SilentlyContinue
    foreach ($rule in $rules) {
        Remove-NetFirewallRule -DisplayName $rule.DisplayName
        Write-DevLog "✅ Removed rule: $($rule.DisplayName)"
    }
    
    # Remove scheduled task if exists
    Unregister-ScheduledTask -TaskName "Gaming Portal - Block Dev Tools" -Confirm:$false -ErrorAction SilentlyContinue
    Write-DevLog "✅ Removed auto-block scheduled task"
}

function Show-DevelopmentToolsStatus {
    Write-Host "`n🛠️ Gaming Portal Development Tools Status" -ForegroundColor Cyan
    Write-Host "===========================================" -ForegroundColor Cyan
    
    $activeRules = Get-NetFirewallRule -DisplayName "*Gaming Portal Dev*" -ErrorAction SilentlyContinue
    
    if ($activeRules) {
        Write-Host "`n✅ Development tools are currently ALLOWED:" -ForegroundColor Green
        foreach ($rule in $activeRules) {
            Write-Host "  📋 $($rule.DisplayName)" -ForegroundColor White
        }
        
        # Check for scheduled auto-block
        $scheduledTask = Get-ScheduledTask -TaskName "Gaming Portal - Block Dev Tools" -ErrorAction SilentlyContinue
        if ($scheduledTask) {
            $nextRun = $scheduledTask.Triggers[0].StartBoundary
            Write-Host "`n⏰ Auto-block scheduled for: $nextRun" -ForegroundColor Yellow
        }
    } else {
        Write-Host "`n🔒 Development tools are currently BLOCKED" -ForegroundColor Red
    }
    
    Write-Host "`n🔍 Available Development Tools:" -ForegroundColor Cyan
    foreach ($toolName in $DevelopmentTools.Keys) {
        $tool = $DevelopmentTools[$toolName]
        $executablePath = Get-ToolExecutable -Paths $tool.Paths
        
        if ($executablePath) {
            Write-Host "  ✅ $toolName - $($tool.Description)" -ForegroundColor Green
            Write-Host "     Path: $executablePath" -ForegroundColor Gray
        } else {
            Write-Host "  ❌ $toolName - Not found" -ForegroundColor Red
        }
    }
    
    Write-Host "`n📊 Current Gaming Portal Processes:" -ForegroundColor Cyan
    $gamingProcesses = Get-Process | Where-Object {
        $_.ProcessName -match "(node|chrome|code)" -and 
        $_.MainWindowTitle -match "(gaming|portal|localhost)"
    }
    
    if ($gamingProcesses) {
        foreach ($process in $gamingProcesses) {
            Write-Host "  🔄 $($process.ProcessName) (PID: $($process.Id))" -ForegroundColor White
        }
    } else {
        Write-Host "  No active gaming portal processes detected" -ForegroundColor Gray
    }
}

# Check if running as administrator
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "❌ This script requires administrator privileges. Please run as administrator." -ForegroundColor Red
    exit 1
}

# Main execution
Write-Host "🎮 Gaming Portal Development Tools Manager" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan

switch ($Action) {
    "Allow" {
        Allow-DevelopmentTools
        Write-Host "`n✅ Development tools access has been enabled for Gaming Portal development!" -ForegroundColor Green
        if ($TimeoutMinutes -gt 0) {
            Write-Host "⏰ Access will automatically expire in $TimeoutMinutes minutes." -ForegroundColor Yellow
        }
    }
    "Block" {
        Block-DevelopmentTools
        Write-Host "`n🔒 Development tools access has been blocked." -ForegroundColor Red
    }
    "Status" {
        Show-DevelopmentToolsStatus
    }
}

Write-Host "`n📋 Usage Examples:" -ForegroundColor Cyan
Write-Host "  .\dev-tools-manager.ps1 -Action Allow                    # Allow dev tools indefinitely" -ForegroundColor White
Write-Host "  .\dev-tools-manager.ps1 -Action Allow -TimeoutMinutes 120  # Allow for 2 hours" -ForegroundColor White
Write-Host "  .\dev-tools-manager.ps1 -Action Block                    # Block dev tools" -ForegroundColor White
Write-Host "  .\dev-tools-manager.ps1 -Action Status                   # Show current status" -ForegroundColor White