# Gaming Portal Master Security Controller (Windows PowerShell)
# Comprehensive security management for Gaming Portal
# Combines all security scripts into one unified interface

param(
    [ValidateSet("Status", "EnableSecurity", "DisableSecurity", "DevToolsAllow", "DevToolsBlock", "SecurityReport", "FullLockdown", "Help")]
    [string]$Action = "Help",
    [string]$EmailRecipient = "FOREXANARCHY@GMAIL.COM",
    [int]$DevToolsTimeout = 60,
    [switch]$Force = $false,
    [switch]$SendEmail = $false
)

$GamingPortalDir = "C:\GamingPortal"
$LogDir = "$GamingPortalDir\Logs"
$SecurityScriptsDir = Split-Path $MyInvocation.MyCommand.Path
$MasterLog = "$LogDir\master-security.log"

# Create directories if they don't exist
if (!(Test-Path $LogDir)) {
    New-Item -ItemType Directory -Path $LogDir -Force | Out-Null
}

function Write-MasterLog {
    param([string]$Message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logEntry = "$timestamp - [MASTER] $Message"
    Write-Host $logEntry -ForegroundColor Cyan
    Add-Content -Path $MasterLog -Value $logEntry
}

function Show-SecurityOverview {
    Write-Host "`n🎮 GAMING PORTAL SECURITY OVERVIEW" -ForegroundColor Green
    Write-Host "===================================" -ForegroundColor Green
    
    Write-Host "`n🔍 System Status:" -ForegroundColor Cyan
    
    # Check if other security scripts exist
    $securityScripts = @{
        "System Lockdown" = "$SecurityScriptsDir\system-lockdown.ps1"
        "Development Tools Manager" = "$SecurityScriptsDir\dev-tools-manager.ps1"
        "Security Monitor" = "$SecurityScriptsDir\security-monitor.ps1"
        "System Encryption" = "$SecurityScriptsDir\system-encryption.ps1"
        "Dev Tools Re-lock" = "$SecurityScriptsDir\dev-tools-relock.ps1"
    }
    
    foreach ($scriptName in $securityScripts.Keys) {
        $scriptPath = $securityScripts[$scriptName]
        if (Test-Path $scriptPath) {
            Write-Host "  ✅ $scriptName - Available" -ForegroundColor Green
        } else {
            Write-Host "  ❌ $scriptName - Missing" -ForegroundColor Red
        }
    }
    
    # Check firewall status
    Write-Host "`n🛡️ Firewall Status:" -ForegroundColor Cyan
    $firewallProfiles = Get-NetFirewallProfile
    foreach ($profile in $firewallProfiles) {
        $color = if ($profile.Enabled) { "Green" } else { "Red" }
        Write-Host "  $($profile.Name): $($profile.Enabled)" -ForegroundColor $color
    }
    
    # Check development tools status
    Write-Host "`n🛠️ Development Tools:" -ForegroundColor Cyan
    $devRules = Get-NetFirewallRule -DisplayName "*Gaming Portal Dev*" -ErrorAction SilentlyContinue
    if ($devRules) {
        Write-Host "  🔓 ALLOWED ($($devRules.Count) rules active)" -ForegroundColor Yellow
    } else {
        Write-Host "  🔒 BLOCKED" -ForegroundColor Green
    }
    
    # Check gaming processes
    Write-Host "`n🎮 Gaming Processes:" -ForegroundColor Cyan
    $gamingProcesses = Get-Process | Where-Object {
        $_.ProcessName -match "(node|chrome|code)" -and 
        $_.MainWindowTitle -match "(gaming|portal|localhost)"
    }
    
    if ($gamingProcesses) {
        Write-Host "  🔄 $($gamingProcesses.Count) active processes" -ForegroundColor White
    } else {
        Write-Host "  💤 No active gaming processes" -ForegroundColor Gray
    }
}

function Enable-FullSecurity {
    Write-MasterLog "🔒 Enabling full Gaming Portal security..."
    
    try {
        # Run system lockdown
        if (Test-Path "$SecurityScriptsDir\system-lockdown.ps1") {
            Write-MasterLog "🛡️ Running system lockdown..."
            & "$SecurityScriptsDir\system-lockdown.ps1" -Action Enable
        }
        
        # Block development tools
        if (Test-Path "$SecurityScriptsDir\dev-tools-relock.ps1") {
            Write-MasterLog "🔒 Blocking development tools..."
            & "$SecurityScriptsDir\dev-tools-relock.ps1" -Force:$Force
        }
        
        # Enable encryption if requested
        if ($Force -and (Test-Path "$SecurityScriptsDir\system-encryption.ps1")) {
            Write-MasterLog "🔐 Enabling system encryption..."
            & "$SecurityScriptsDir\system-encryption.ps1" -Action Enable
        }
        
        Write-MasterLog "✅ Full security enabled successfully"
        
    } catch {
        Write-MasterLog "❌ Error enabling security: $($_.Exception.Message)"
        throw
    }
}

function Disable-FullSecurity {
    Write-MasterLog "🔓 Disabling Gaming Portal security (development mode)..."
    
    try {
        # Allow development tools
        if (Test-Path "$SecurityScriptsDir\dev-tools-manager.ps1") {
            Write-MasterLog "🛠️ Allowing development tools..."
            & "$SecurityScriptsDir\dev-tools-manager.ps1" -Action Allow -TimeoutMinutes $DevToolsTimeout
        }
        
        # Disable system lockdown
        if (Test-Path "$SecurityScriptsDir\system-lockdown.ps1") {
            Write-MasterLog "🔓 Disabling system lockdown..."
            & "$SecurityScriptsDir\system-lockdown.ps1" -Action Disable
        }
        
        Write-MasterLog "✅ Security disabled for development"
        
    } catch {
        Write-MasterLog "❌ Error disabling security: $($_.Exception.Message)"
        throw
    }
}

function Invoke-SecurityReport {
    Write-MasterLog "📊 Generating comprehensive security report..."
    
    try {
        if (Test-Path "$SecurityScriptsDir\security-monitor.ps1") {
            & "$SecurityScriptsDir\security-monitor.ps1" -EmailRecipient $EmailRecipient -SendEmail:$SendEmail
            Write-MasterLog "✅ Security report generated"
        } else {
            Write-MasterLog "❌ Security monitor script not found"
        }
    } catch {
        Write-MasterLog "❌ Error generating security report: $($_.Exception.Message)"
        throw
    }
}

function Show-Help {
    Write-Host @"

🎮 GAMING PORTAL MASTER SECURITY CONTROLLER
==========================================

USAGE: .\master-security.ps1 -Action <ActionName> [Options]

ACTIONS:
  Status           Show complete security overview
  EnableSecurity   Enable all security features (production mode)
  DisableSecurity  Disable security for development
  DevToolsAllow    Allow development tools temporarily
  DevToolsBlock    Block all development tools immediately
  SecurityReport   Generate comprehensive security report
  FullLockdown     Maximum security (encryption + lockdown)
  Help             Show this help message

OPTIONS:
  -EmailRecipient <email>     Email address for security reports
  -DevToolsTimeout <minutes>  Timeout for development tools (default: 60)
  -Force                      Force operations without confirmation
  -SendEmail                  Send security report via email

EXAMPLES:
  .\master-security.ps1 -Action Status
  .\master-security.ps1 -Action EnableSecurity
  .\master-security.ps1 -Action DisableSecurity -DevToolsTimeout 120
  .\master-security.ps1 -Action SecurityReport -SendEmail
  .\master-security.ps1 -Action FullLockdown -Force

SECURITY LEVELS:
  🔓 Development Mode: All tools allowed, minimal security
  🔒 Standard Security: Firewall enabled, dev tools blocked
  🛡️ Full Lockdown: Maximum security with encryption

"@ -ForegroundColor White
}

# Check if running as administrator
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "❌ This script requires administrator privileges. Please run as administrator." -ForegroundColor Red
    exit 1
}

# Main execution
Write-Host "🎮 Gaming Portal Master Security Controller" -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Green

Write-MasterLog "Master security controller started with action: $Action"

try {
    switch ($Action) {
        "Status" {
            Show-SecurityOverview
        }
        "EnableSecurity" {
            Write-Host "🔒 Enabling full Gaming Portal security..." -ForegroundColor Yellow
            Enable-FullSecurity
            Write-Host "✅ Security enabled successfully!" -ForegroundColor Green
        }
        "DisableSecurity" {
            Write-Host "🔓 Disabling security for development..." -ForegroundColor Yellow
            Disable-FullSecurity
            Write-Host "✅ Development mode enabled!" -ForegroundColor Green
        }
        "DevToolsAllow" {
            if (Test-Path "$SecurityScriptsDir\dev-tools-manager.ps1") {
                & "$SecurityScriptsDir\dev-tools-manager.ps1" -Action Allow -TimeoutMinutes $DevToolsTimeout
            }
        }
        "DevToolsBlock" {
            if (Test-Path "$SecurityScriptsDir\dev-tools-relock.ps1") {
                & "$SecurityScriptsDir\dev-tools-relock.ps1" -Force:$Force
            }
        }
        "SecurityReport" {
            Invoke-SecurityReport
        }
        "FullLockdown" {
            Write-Host "🛡️ Applying maximum security lockdown..." -ForegroundColor Red
            Enable-FullSecurity
            if (Test-Path "$SecurityScriptsDir\system-encryption.ps1") {
                & "$SecurityScriptsDir\system-encryption.ps1" -Action FullHardening
            }
            Write-Host "🛡️ Maximum security applied!" -ForegroundColor Green
        }
        "Help" {
            Show-Help
        }
        default {
            Show-Help
        }
    }
} catch {
    Write-Host "❌ Operation failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-MasterLog "❌ Operation failed: $($_.Exception.Message)"
    exit 1
}

Write-MasterLog "Master security controller completed successfully"
Write-Host "`n📊 Current Status:" -ForegroundColor Cyan
Show-SecurityOverview