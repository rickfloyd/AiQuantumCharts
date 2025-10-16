# Gaming Portal Security Lockdown Script (Windows PowerShell)
# Adapted from QuantumDiamond Security System
# Usage: .\system-lockdown.ps1 -Action [Enable|Disable]

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("Enable", "Disable")]
    [string]$Action
)

$GamingPortalDir = "C:\GamingPortal"
$LogDir = "$GamingPortalDir\Logs"
$SecurityLog = "$LogDir\security-lockdown.log"

# Create directories if they don't exist
if (!(Test-Path $LogDir)) {
    New-Item -ItemType Directory -Path $LogDir -Force | Out-Null
}

function Write-SecurityLog {
    param([string]$Message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logEntry = "$timestamp - $Message"
    Write-Host $logEntry
    Add-Content -Path $SecurityLog -Value $logEntry
}

function Enable-GamingSecurityLockdown {
    Write-SecurityLog "🔒 Gaming Portal Security Lockdown - ENABLING"
    
    try {
        # Disable Windows Remote Desktop for security
        Set-ItemProperty -Path "HKLM:\System\CurrentControlSet\Control\Terminal Server" -Name "fDenyTSConnections" -Value 1
        Write-SecurityLog "✅ Remote Desktop disabled"
        
        # Enable Windows Firewall
        Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled True
        Write-SecurityLog "✅ Windows Firewall enabled for all profiles"
        
        # Create firewall rules for Gaming Portal
        New-NetFirewallRule -DisplayName "Gaming Portal Frontend" -Direction Inbound -Protocol TCP -LocalPort 5173 -Action Allow -ErrorAction SilentlyContinue
        New-NetFirewallRule -DisplayName "Gaming Portal Backend" -Direction Inbound -Protocol TCP -LocalPort 3000 -Action Allow -ErrorAction SilentlyContinue
        Write-SecurityLog "✅ Gaming Portal firewall rules created"
        
        # Block known gaming cheat websites
        $hostsFile = "$env:WINDIR\System32\drivers\etc\hosts"
        $cheatSites = @(
            "127.0.0.1 cheatengine.org",
            "127.0.0.1 wemod.com",
            "127.0.0.1 trainerhacks.com",
            "127.0.0.1 megagames.com"
        )
        
        Add-Content -Path $hostsFile -Value "`n# Gaming Portal Security - Block cheat sites"
        foreach ($site in $cheatSites) {
            Add-Content -Path $hostsFile -Value $site
        }
        Write-SecurityLog "✅ Gaming cheat sites blocked in hosts file"
        
        # Set secure DNS (Cloudflare for gaming)
        $adapters = Get-NetAdapter | Where-Object {$_.Status -eq "Up"}
        foreach ($adapter in $adapters) {
            Set-DnsClientServerAddress -InterfaceIndex $adapter.InterfaceIndex -ServerAddresses "1.1.1.1", "1.0.0.1"
        }
        Write-SecurityLog "✅ Secure DNS configured for gaming"
        
        # Disable unnecessary Windows services for gaming performance
        $servicesToDisable = @("Spooler", "Fax", "WSearch")
        foreach ($service in $servicesToDisable) {
            try {
                Set-Service -Name $service -StartupType Disabled -ErrorAction SilentlyContinue
                Stop-Service -Name $service -Force -ErrorAction SilentlyContinue
                Write-SecurityLog "✅ Disabled service: $service"
            } catch {
                Write-SecurityLog "⚠️ Could not disable service: $service"
            }
        }
        
        Write-SecurityLog "🔒 Gaming Portal Security Lockdown - COMPLETED"
        Write-Host "✅ Gaming Portal security lockdown enabled successfully!" -ForegroundColor Green
        
    } catch {
        Write-SecurityLog "❌ Error during lockdown: $($_.Exception.Message)"
        Write-Host "❌ Error during security lockdown: $($_.Exception.Message)" -ForegroundColor Red
    }
}

function Disable-GamingSecurityLockdown {
    Write-SecurityLog "🔓 Gaming Portal Security Lockdown - DISABLING"
    
    try {
        # Re-enable Remote Desktop if needed
        Set-ItemProperty -Path "HKLM:\System\CurrentControlSet\Control\Terminal Server" -Name "fDenyTSConnections" -Value 0
        Write-SecurityLog "✅ Remote Desktop re-enabled"
        
        # Remove Gaming Portal firewall rules
        Remove-NetFirewallRule -DisplayName "Gaming Portal Frontend" -ErrorAction SilentlyContinue
        Remove-NetFirewallRule -DisplayName "Gaming Portal Backend" -ErrorAction SilentlyContinue
        Write-SecurityLog "✅ Gaming Portal firewall rules removed"
        
        # Clean up hosts file
        $hostsFile = "$env:WINDIR\System32\drivers\etc\hosts"
        $hostsContent = Get-Content $hostsFile
        $cleanedContent = @()
        $skip = $false
        
        foreach ($line in $hostsContent) {
            if ($line -match "# Gaming Portal Security") {
                $skip = $true
                continue
            }
            if ($skip -and $line.Trim() -eq "") {
                $skip = $false
                continue
            }
            if (!$skip) {
                $cleanedContent += $line
            }
        }
        
        $cleanedContent | Set-Content $hostsFile
        Write-SecurityLog "✅ Hosts file cleaned"
        
        # Reset DNS to automatic
        $adapters = Get-NetAdapter | Where-Object {$_.Status -eq "Up"}
        foreach ($adapter in $adapters) {
            Set-DnsClientServerAddress -InterfaceIndex $adapter.InterfaceIndex -ResetServerAddresses
        }
        Write-SecurityLog "✅ DNS reset to automatic"
        
        Write-SecurityLog "🔓 Gaming Portal Security Lockdown - DISABLED"
        Write-Host "✅ Gaming Portal security lockdown disabled successfully!" -ForegroundColor Green
        
    } catch {
        Write-SecurityLog "❌ Error during lockdown removal: $($_.Exception.Message)"
        Write-Host "❌ Error during security lockdown removal: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Check if running as administrator
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "❌ This script requires administrator privileges. Please run as administrator." -ForegroundColor Red
    exit 1
}

# Execute based on action parameter
switch ($Action) {
    "Enable" {
        Enable-GamingSecurityLockdown
    }
    "Disable" {
        Disable-GamingSecurityLockdown
    }
}

Write-Host "`n📊 Security Status Check:" -ForegroundColor Cyan
Write-Host "Firewall Status: $((Get-NetFirewallProfile -Profile Domain).Enabled)" -ForegroundColor Yellow
Write-Host "Gaming Portal Rules: $((Get-NetFirewallRule -DisplayName "*Gaming Portal*" -ErrorAction SilentlyContinue).Count) rules" -ForegroundColor Yellow
Write-Host "Log file: $SecurityLog" -ForegroundColor Yellow