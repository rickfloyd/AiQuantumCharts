# Gaming Portal System Encryption & Security Hardening Script (Windows PowerShell)
# Adapted from FileVault encryption and system updates
# Enables BitLocker, configures security settings, and manages Windows updates

param(
    [ValidateSet("Enable", "Status", "Update", "FullHardening")]
    [string]$Action = "Status",
    [switch]$Force = $false
)

$GamingPortalDir = "C:\GamingPortal"
$LogDir = "$GamingPortalDir\Logs"
$EncryptionLog = "$LogDir\system-encryption.log"

# Create directories if they don't exist
if (!(Test-Path $LogDir)) {
    New-Item -ItemType Directory -Path $LogDir -Force | Out-Null
}

function Write-EncryptionLog {
    param([string]$Message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logEntry = "$timestamp - $Message"
    Write-Host $logEntry
    Add-Content -Path $EncryptionLog -Value $logEntry
}

function Enable-SystemEncryption {
    Write-EncryptionLog "🔐 Enabling BitLocker encryption for Gaming Portal security..."
    
    try {
        # Check if BitLocker is available
        $bitlockerStatus = Get-BitLockerVolume -ErrorAction SilentlyContinue
        if (!$bitlockerStatus) {
            Write-EncryptionLog "❌ BitLocker not available on this system"
            throw "BitLocker is not available on this Windows edition"
        }
        
        # Get system drive
        $systemDrive = $env:SystemDrive
        $volume = Get-BitLockerVolume -MountPoint $systemDrive
        
        if ($volume.VolumeStatus -eq "FullyEncrypted") {
            Write-EncryptionLog "ℹ️ System drive is already encrypted"
            return
        }
        
        if ($volume.VolumeStatus -eq "EncryptionInProgress") {
            Write-EncryptionLog "ℹ️ Encryption is already in progress"
            return
        }
        
        Write-EncryptionLog "🔧 Enabling BitLocker on system drive ($systemDrive)..."
        
        # Add TPM protector if available
        try {
            Add-BitLockerKeyProtector -MountPoint $systemDrive -TpmProtector -ErrorAction SilentlyContinue
            Write-EncryptionLog "✅ TPM protector added"
        } catch {
            Write-EncryptionLog "⚠️ TPM not available, using password protector"
            
            # Generate secure password
            $securePassword = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 12 | ForEach-Object {[char]$_})
            $recoveryPassword = ConvertTo-SecureString $securePassword -AsPlainText -Force
            
            Add-BitLockerKeyProtector -MountPoint $systemDrive -PasswordProtector -Password $recoveryPassword
            Write-EncryptionLog "✅ Password protector added"
            
            # Save recovery key
            $recoveryKeyFile = "$GamingPortalDir\BitLocker_Recovery_Key.txt"
            "BitLocker Recovery Key for $env:COMPUTERNAME" | Out-File $recoveryKeyFile
            "Generated: $(Get-Date)" | Add-Content $recoveryKeyFile
            "Recovery Password: $securePassword" | Add-Content $recoveryKeyFile
            Write-EncryptionLog "🔑 Recovery key saved to: $recoveryKeyFile"
        }
        
        # Enable encryption
        Enable-BitLocker -MountPoint $systemDrive -EncryptionMethod Aes256 -UsedSpaceOnly
        Write-EncryptionLog "✅ BitLocker encryption started on $systemDrive"
        
    } catch {
        Write-EncryptionLog "❌ BitLocker encryption failed: $($_.Exception.Message)"
        throw
    }
}

function Show-EncryptionStatus {
    Write-Host "`n🔐 Gaming Portal System Encryption Status" -ForegroundColor Cyan
    Write-Host "==========================================" -ForegroundColor Cyan
    
    try {
        $volumes = Get-BitLockerVolume -ErrorAction SilentlyContinue
        if ($volumes) {
            foreach ($volume in $volumes) {
                $statusColor = switch ($volume.VolumeStatus) {
                    "FullyEncrypted" { "Green" }
                    "EncryptionInProgress" { "Yellow" }
                    "FullyDecrypted" { "Red" }
                    default { "White" }
                }
                
                Write-Host "📂 Drive $($volume.MountPoint): $($volume.VolumeStatus)" -ForegroundColor $statusColor
                if ($volume.EncryptionPercentage) {
                    Write-Host "   Progress: $($volume.EncryptionPercentage)%" -ForegroundColor Gray
                }
            }
        } else {
            Write-Host "❌ BitLocker not available or accessible" -ForegroundColor Red
        }
    } catch {
        Write-Host "❌ Unable to check BitLocker status: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    # Check other security settings
    Write-Host "`n🛡️ Security Settings:" -ForegroundColor Cyan
    
    # Windows Defender status
    try {
        $defenderStatus = Get-MpComputerStatus -ErrorAction SilentlyContinue
        if ($defenderStatus) {
            $realtimeColor = if ($defenderStatus.RealTimeProtectionEnabled) { "Green" } else { "Red" }
            Write-Host "🛡️ Windows Defender Real-time: $($defenderStatus.RealTimeProtectionEnabled)" -ForegroundColor $realtimeColor
            
            $antivirusColor = if ($defenderStatus.AntivirusEnabled) { "Green" } else { "Red" }
            Write-Host "🦠 Antivirus: $($defenderStatus.AntivirusEnabled)" -ForegroundColor $antivirusColor
        }
    } catch {
        Write-Host "⚠️ Unable to check Windows Defender status" -ForegroundColor Yellow
    }
    
    # UAC status
    try {
        $uacSetting = Get-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" -Name "ConsentPromptBehaviorAdmin" -ErrorAction SilentlyContinue
        if ($uacSetting) {
            $uacEnabled = $uacSetting.ConsentPromptBehaviorAdmin -ne 0
            $uacColor = if ($uacEnabled) { "Green" } else { "Red" }
            Write-Host "🔐 UAC (User Account Control): $uacEnabled" -ForegroundColor $uacColor
        }
    } catch {
        Write-Host "⚠️ Unable to check UAC status" -ForegroundColor Yellow
    }
}

function Update-WindowsSystem {
    Write-EncryptionLog "🔄 Checking for Windows updates for Gaming Portal security..."
    
    try {
        # Check if PSWindowsUpdate module is available
        if (!(Get-Module -ListAvailable -Name PSWindowsUpdate)) {
            Write-EncryptionLog "📦 Installing PSWindowsUpdate module..."
            Install-Module PSWindowsUpdate -Force -AllowClobber
        }
        
        Import-Module PSWindowsUpdate
        
        # Get available updates
        Write-EncryptionLog "🔍 Scanning for available updates..."
        $updates = Get-WindowsUpdate -AcceptAll -IgnoreReboot
        
        if ($updates) {
            Write-EncryptionLog "📋 Found $($updates.Count) available updates"
            foreach ($update in $updates) {
                Write-EncryptionLog "   📦 $($update.Title) - Size: $($update.Size)"
            }
            
            if ($Force) {
                Write-EncryptionLog "⬇️ Installing updates (forced)..."
                Install-WindowsUpdate -AcceptAll -AutoReboot:$false
                Write-EncryptionLog "✅ Updates installed successfully"
            } else {
                Write-EncryptionLog "ℹ️ Use -Force parameter to install updates automatically"
            }
        } else {
            Write-EncryptionLog "✅ System is up to date"
        }
        
    } catch {
        Write-EncryptionLog "❌ Windows Update check failed: $($_.Exception.Message)"
        
        # Fallback to built-in Windows Update
        Write-EncryptionLog "🔄 Trying built-in Windows Update service..."
        try {
            Start-Service -Name "wuauserv" -ErrorAction SilentlyContinue
            Write-EncryptionLog "✅ Windows Update service started"
        } catch {
            Write-EncryptionLog "⚠️ Could not start Windows Update service"
        }
    }
}

function Enable-FullSystemHardening {
    Write-EncryptionLog "🔒 Applying full system hardening for Gaming Portal..."
    
    try {
        # Enable BitLocker encryption
        Enable-SystemEncryption
        
        # Configure Windows Defender
        Write-EncryptionLog "🛡️ Configuring Windows Defender..."
        Set-MpPreference -DisableRealtimeMonitoring $false -ErrorAction SilentlyContinue
        Set-MpPreference -DisableBehaviorMonitoring $false -ErrorAction SilentlyContinue
        Set-MpPreference -DisableIOAVProtection $false -ErrorAction SilentlyContinue
        Write-EncryptionLog "✅ Windows Defender hardened"
        
        # Enable UAC
        Write-EncryptionLog "🔐 Enabling User Account Control..."
        Set-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" -Name "ConsentPromptBehaviorAdmin" -Value 2
        Write-EncryptionLog "✅ UAC enabled"
        
        # Configure secure boot (if supported)
        try {
            $secureBootStatus = Confirm-SecureBootUEFI -ErrorAction SilentlyContinue
            if ($secureBootStatus) {
                Write-EncryptionLog "✅ Secure Boot is already enabled"
            } else {
                Write-EncryptionLog "⚠️ Secure Boot not enabled (may require UEFI configuration)"
            }
        } catch {
            Write-EncryptionLog "ℹ️ Unable to check Secure Boot status"
        }
        
        # Disable unnecessary services for gaming security
        $servicesToDisable = @("RemoteRegistry", "TelnetServer", "SNMP")
        foreach ($service in $servicesToDisable) {
            try {
                $svc = Get-Service -Name $service -ErrorAction SilentlyContinue
                if ($svc -and $svc.Status -eq "Running") {
                    Stop-Service -Name $service -Force
                    Set-Service -Name $service -StartupType Disabled
                    Write-EncryptionLog "✅ Disabled service: $service"
                }
            } catch {
                Write-EncryptionLog "ℹ️ Service not found or already disabled: $service"
            }
        }
        
        # Configure network security
        Write-EncryptionLog "🌐 Configuring network security..."
        netsh advfirewall set allprofiles firewallpolicy blockinbound,blockoutbound
        netsh advfirewall set allprofiles state on
        Write-EncryptionLog "✅ Firewall configured to block by default"
        
        Write-EncryptionLog "🔒 Full system hardening completed"
        
    } catch {
        Write-EncryptionLog "❌ System hardening failed: $($_.Exception.Message)"
        throw
    }
}

# Check if running as administrator
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "❌ This script requires administrator privileges. Please run as administrator." -ForegroundColor Red
    exit 1
}

# Main execution
Write-Host "🔐 Gaming Portal System Encryption & Security" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

try {
    switch ($Action) {
        "Enable" {
            Write-Host "🔐 Enabling system encryption..." -ForegroundColor Yellow
            Enable-SystemEncryption
            Write-Host "✅ System encryption has been enabled!" -ForegroundColor Green
        }
        "Status" {
            Show-EncryptionStatus
        }
        "Update" {
            Write-Host "🔄 Checking for system updates..." -ForegroundColor Yellow
            Update-WindowsSystem
            Write-Host "✅ Update check completed!" -ForegroundColor Green
        }
        "FullHardening" {
            Write-Host "🔒 Applying full system hardening..." -ForegroundColor Yellow
            Enable-FullSystemHardening
            Write-Host "✅ Full system hardening completed!" -ForegroundColor Green
        }
    }
} catch {
    Write-Host "❌ Operation failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Check the log file: $EncryptionLog" -ForegroundColor Yellow
    exit 1
}

Write-Host "`n📋 Usage Examples:" -ForegroundColor Cyan
Write-Host "  .\system-encryption.ps1 -Action Enable         # Enable BitLocker encryption" -ForegroundColor White
Write-Host "  .\system-encryption.ps1 -Action Status         # Show encryption status" -ForegroundColor White
Write-Host "  .\system-encryption.ps1 -Action Update -Force  # Install Windows updates" -ForegroundColor White
Write-Host "  .\system-encryption.ps1 -Action FullHardening  # Apply all security settings" -ForegroundColor White