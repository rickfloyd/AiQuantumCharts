# Gaming Portal Development Tools Re-Lock Script (Windows PowerShell)
# Adapted from development tools firewall removal
# Immediately removes all development tool firewall exceptions

param(
    [switch]$Force = $false
)

$GamingPortalDir = "C:\GamingPortal"
$LogDir = "$GamingPortalDir\Logs"
$DevToolsLog = "$LogDir\dev-tools-relock.log"

# Create directories if they don't exist
if (!(Test-Path $LogDir)) {
    New-Item -ItemType Directory -Path $LogDir -Force | Out-Null
}

function Write-RelockLog {
    param([string]$Message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logEntry = "$timestamp - $Message"
    Write-Host $logEntry
    Add-Content -Path $DevToolsLog -Value $logEntry
}

function Remove-DevelopmentToolsAccess {
    Write-RelockLog "🔒 Re-locking all development tools for Gaming Portal..."
    
    try {
        # Remove all Gaming Portal development firewall rules
        $devRules = Get-NetFirewallRule -DisplayName "*Gaming Portal Dev*" -ErrorAction SilentlyContinue
        
        if ($devRules) {
            $ruleCount = $devRules.Count
            Write-RelockLog "📋 Found $ruleCount development tool firewall rules to remove"
            
            foreach ($rule in $devRules) {
                Remove-NetFirewallRule -DisplayName $rule.DisplayName -Confirm:$false
                Write-RelockLog "✅ Removed: $($rule.DisplayName)"
            }
            
            Write-RelockLog "🔒 All $ruleCount development tool rules removed successfully"
        } else {
            Write-RelockLog "ℹ️ No development tool firewall rules found"
        }
        
        # Remove any scheduled auto-unlock tasks
        $scheduledTasks = Get-ScheduledTask -TaskName "*Gaming Portal*Dev*" -ErrorAction SilentlyContinue
        if ($scheduledTasks) {
            foreach ($task in $scheduledTasks) {
                Unregister-ScheduledTask -TaskName $task.TaskName -Confirm:$false
                Write-RelockLog "✅ Removed scheduled task: $($task.TaskName)"
            }
        }
        
        # Check for any remaining gaming-related processes
        $gamingProcesses = Get-Process | Where-Object {
            $_.ProcessName -match "(node|chrome|code)" -and 
            $_.MainWindowTitle -match "(gaming|portal|localhost:)"
        }
        
        if ($gamingProcesses -and $Force) {
            Write-RelockLog "⚠️ Force terminating Gaming Portal development processes..."
            foreach ($process in $gamingProcesses) {
                try {
                    Stop-Process -Id $process.Id -Force
                    Write-RelockLog "🛑 Terminated: $($process.ProcessName) (PID: $($process.Id))"
                } catch {
                    Write-RelockLog "❌ Failed to terminate: $($process.ProcessName) - $($_.Exception.Message)"
                }
            }
        } elseif ($gamingProcesses) {
            Write-RelockLog "⚠️ Found active Gaming Portal processes (use -Force to terminate):"
            foreach ($process in $gamingProcesses) {
                Write-RelockLog "   🔄 $($process.ProcessName) (PID: $($process.Id))"
            }
        }
        
        # Reset any modified network settings
        Write-RelockLog "🔧 Resetting network settings..."
        
        # Clear any custom DNS that might have been set for development
        $adapters = Get-NetAdapter | Where-Object {$_.Status -eq "Up"}
        foreach ($adapter in $adapters) {
            try {
                Set-DnsClientServerAddress -InterfaceIndex $adapter.InterfaceIndex -ResetServerAddresses
                Write-RelockLog "✅ Reset DNS for adapter: $($adapter.Name)"
            } catch {
                Write-RelockLog "⚠️ Could not reset DNS for: $($adapter.Name)"
            }
        }
        
        # Clear any temporary proxy settings
        try {
            $proxySettings = Get-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings"
            if ($proxySettings.ProxyEnable -eq 1) {
                Set-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings" -Name "ProxyEnable" -Value 0
                Write-RelockLog "✅ Disabled proxy settings"
            }
        } catch {
            Write-RelockLog "ℹ️ No proxy settings to clear"
        }
        
        Write-RelockLog "🔒 Development tools re-lock completed successfully"
        
    } catch {
        Write-RelockLog "❌ Error during re-lock process: $($_.Exception.Message)"
        throw
    }
}

function Show-SecurityStatus {
    Write-Host "`n🔍 Gaming Portal Security Status After Re-Lock" -ForegroundColor Cyan
    Write-Host "===============================================" -ForegroundColor Cyan
    
    # Check for any remaining development rules
    $remainingRules = Get-NetFirewallRule -DisplayName "*Gaming Portal Dev*" -ErrorAction SilentlyContinue
    if ($remainingRules) {
        Write-Host "⚠️ WARNING: Some development rules still exist:" -ForegroundColor Yellow
        foreach ($rule in $remainingRules) {
            Write-Host "   $($rule.DisplayName)" -ForegroundColor Red
        }
    } else {
        Write-Host "✅ All development tool firewall rules removed" -ForegroundColor Green
    }
    
    # Check for active gaming processes
    $activeProcesses = Get-Process | Where-Object {
        $_.ProcessName -match "(node|chrome|code)" -and 
        $_.MainWindowTitle -match "(gaming|portal|localhost)"
    }
    
    if ($activeProcesses) {
        Write-Host "⚠️ Active Gaming Portal processes detected:" -ForegroundColor Yellow
        foreach ($process in $activeProcesses) {
            Write-Host "   $($process.ProcessName) (PID: $($process.Id))" -ForegroundColor White
        }
        Write-Host "   Use -Force parameter to terminate these processes" -ForegroundColor Gray
    } else {
        Write-Host "✅ No active Gaming Portal development processes" -ForegroundColor Green
    }
    
    # Check firewall status
    $firewallStatus = Get-NetFirewallProfile
    $allEnabled = $true
    foreach ($profile in $firewallStatus) {
        if (!$profile.Enabled) {
            $allEnabled = $false
            break
        }
    }
    
    if ($allEnabled) {
        Write-Host "✅ Windows Firewall is enabled on all profiles" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Windows Firewall is not fully enabled" -ForegroundColor Yellow
    }
}

# Check if running as administrator
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "❌ This script requires administrator privileges. Please run as administrator." -ForegroundColor Red
    exit 1
}

# Main execution
Write-Host "🔒 Gaming Portal Development Tools Re-Lock" -ForegroundColor Red
Write-Host "===========================================" -ForegroundColor Red

if (!$Force) {
    Write-Host "⚠️ This will remove ALL development tool firewall exceptions for Gaming Portal." -ForegroundColor Yellow
    Write-Host "   Active development processes will NOT be terminated (use -Force to terminate)." -ForegroundColor Yellow
    $confirmation = Read-Host "Continue? (y/N)"
    if ($confirmation -ne 'y' -and $confirmation -ne 'Y') {
        Write-Host "❌ Operation cancelled by user." -ForegroundColor Red
        exit 0
    }
}

try {
    Remove-DevelopmentToolsAccess
    Show-SecurityStatus
    
    Write-Host "`n✅ Development tools have been successfully re-locked!" -ForegroundColor Green
    Write-Host "🔒 Gaming Portal is now in secure mode." -ForegroundColor Green
    
    if (!$Force) {
        Write-Host "`nℹ️ To allow development tools again, run:" -ForegroundColor Cyan
        Write-Host "   .\dev-tools-manager.ps1 -Action Allow" -ForegroundColor White
    }
    
} catch {
    Write-Host "`n❌ Re-lock process failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Please check the log file: $DevToolsLog" -ForegroundColor Yellow
    exit 1
}

Write-RelockLog "🔒 Re-lock process completed at $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"