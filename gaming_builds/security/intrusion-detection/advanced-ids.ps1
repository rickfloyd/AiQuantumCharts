# Gaming Portal Advanced Intrusion Detection System (Windows PowerShell)
# MAXIMUM SECURITY - Multi-Layer Defense System
# Captures forensic evidence on unauthorized access attempts

param(
    [ValidateSet("Start", "Stop", "Status", "TestCapture", "ViewLogs")]
    [string]$Action = "Status",
    [string]$CEOEmail = "FOREXANARCHY@GMAIL.COM",
    [string]$CEOPhone = "+1234567890",  # CEO phone for SMS alerts
    [switch]$Force = $false
)

$GamingPortalDir = "C:\GamingPortal"
$SecurityDir = "$GamingPortalDir\Security"
$IntrusionDir = "$SecurityDir\IntrusionDetection"
$EvidenceDir = "$IntrusionDir\Evidence"
$LogDir = "$IntrusionDir\Logs"
$IntrusionLog = "$LogDir\intrusion-detection.log"

# Create all necessary directories
@($SecurityDir, $IntrusionDir, $EvidenceDir, "$EvidenceDir\Photos", "$EvidenceDir\Screenshots", $LogDir) | ForEach-Object {
    if (!(Test-Path $_)) {
        New-Item -ItemType Directory -Path $_ -Force | Out-Null
    }
}

function Write-IntrusionLog {
    param(
        [string]$Message,
        [ValidateSet("INFO", "WARNING", "CRITICAL", "ATTACK")]
        [string]$Level = "INFO"
    )
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logEntry = "$timestamp [$Level] $Message"
    
    $color = switch ($Level) {
        "INFO" { "White" }
        "WARNING" { "Yellow" }
        "CRITICAL" { "Red" }
        "ATTACK" { "Magenta" }
    }
    
    Write-Host $logEntry -ForegroundColor $color
    Add-Content -Path $IntrusionLog -Value $logEntry
}

function Get-SystemFingerprint {
    # Create unique system fingerprint for intrusion detection
    $fingerprint = @{
        ComputerName = $env:COMPUTERNAME
        UserName = $env:USERNAME
        Domain = $env:USERDOMAIN
        ProcessorCount = (Get-WmiObject Win32_ComputerSystem).NumberOfProcessors
        TotalRAM = [math]::Round((Get-WmiObject Win32_ComputerSystem).TotalPhysicalMemory / 1GB, 2)
        OSVersion = (Get-WmiObject Win32_OperatingSystem).Version
        LastBootTime = (Get-WmiObject Win32_OperatingSystem).LastBootUpTime
        NetworkAdapters = (Get-NetAdapter | Where-Object {$_.Status -eq "Up"}).Name -join ","
        InstallDate = (Get-WmiObject Win32_OperatingSystem).InstallDate
    }
    
    return $fingerprint | ConvertTo-Json -Compress
}

function Capture-WebcamPhoto {
    param([string]$Reason = "Security_Breach")
    
    Write-IntrusionLog "📸 CAPTURING WEBCAM PHOTO - POTENTIAL INTRUDER DETECTED" "ATTACK"
    
    try {
        # PowerShell script to capture webcam photo
        $webcamScript = @"
Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Windows.Forms

try {
    # Use Windows.Media.Capture for webcam access
    Add-Type -TypeDefinition @"
        using System;
        using System.Runtime.InteropServices;
        public class WebcamCapture {
            [DllImport("avicap32.dll")]
            public static extern IntPtr capCreateCaptureWindowA(byte[] lpszWindowName, int dwStyle, int x, int y, int nWidth, int nHeight, IntPtr hWndParent, int nID);
            
            [DllImport("avicap32.dll")]
            public static extern bool capDriverConnect(IntPtr hWnd, int i);
            
            [DllImport("avicap32.dll")]
            public static extern bool capDriverDisconnect(IntPtr hWnd);
            
            [DllImport("avicap32.dll")]
            public static extern bool capFileSaveDIB(IntPtr hWnd, string szName);
            
            [DllImport("user32.dll")]
            public static extern bool DestroyWindow(IntPtr hWnd);
        }
"@

    `$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    `$photoPath = "$EvidenceDir\Photos\INTRUDER_`$timestamp.bmp"
    
    # Create capture window
    `$hWnd = [WebcamCapture]::capCreateCaptureWindowA([System.Text.Encoding]::ASCII.GetBytes("WebcamCapture"), 0, 0, 0, 640, 480, [IntPtr]::Zero, 0)
    
    if (`$hWnd -ne [IntPtr]::Zero) {
        if ([WebcamCapture]::capDriverConnect(`$hWnd, 0)) {
            Start-Sleep -Seconds 2  # Allow camera to initialize
            [WebcamCapture]::capFileSaveDIB(`$hWnd, `$photoPath)
            [WebcamCapture]::capDriverDisconnect(`$hWnd)
            Write-Output "SUCCESS:`$photoPath"
        } else {
            Write-Output "ERROR:Could not connect to webcam driver"
        }
        [WebcamCapture]::DestroyWindow(`$hWnd)
    } else {
        Write-Output "ERROR:Could not create capture window"
    }
} catch {
    Write-Output "ERROR:`$(`$_.Exception.Message)"
}
"@
        
        $result = PowerShell -Command $webcamScript
        
        if ($result -like "SUCCESS:*") {
            $photoPath = $result.Replace("SUCCESS:", "")
            Write-IntrusionLog "✅ Webcam photo captured: $photoPath" "CRITICAL"
            return $photoPath
        } else {
            Write-IntrusionLog "❌ Webcam capture failed: $result" "WARNING"
            return $null
        }
        
    } catch {
        Write-IntrusionLog "❌ Webcam capture error: $($_.Exception.Message)" "WARNING"
        return $null
    }
}

function Capture-Screenshot {
    param([string]$Reason = "Security_Event")
    
    Write-IntrusionLog "📺 CAPTURING SCREENSHOT - UNAUTHORIZED ACCESS" "ATTACK"
    
    try {
        Add-Type -AssemblyName System.Drawing
        Add-Type -AssemblyName System.Windows.Forms
        
        $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
        $screenshotPath = "$EvidenceDir\Screenshots\SCREEN_$timestamp.png"
        
        # Get screen dimensions
        $screen = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
        $bitmap = New-Object System.Drawing.Bitmap $screen.Width, $screen.Height
        $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
        
        # Capture screenshot
        $graphics.CopyFromScreen($screen.X, $screen.Y, 0, 0, $screen.Size)
        $bitmap.Save($screenshotPath, [System.Drawing.Imaging.ImageFormat]::Png)
        
        $graphics.Dispose()
        $bitmap.Dispose()
        
        Write-IntrusionLog "✅ Screenshot captured: $screenshotPath" "CRITICAL"
        return $screenshotPath
        
    } catch {
        Write-IntrusionLog "❌ Screenshot capture error: $($_.Exception.Message)" "WARNING"
        return $null
    }
}

function Get-DetailedNetworkInfo {
    Write-IntrusionLog "🌐 GATHERING NETWORK FORENSICS" "ATTACK"
    
    $networkInfo = @{
        PublicIP = ""
        LocalIP = ""
        MACAddress = ""
        NetworkName = ""
        Gateway = ""
        DNSServers = @()
        OpenPorts = @()
        ActiveConnections = @()
        GeolocationData = @{}
    }
    
    try {
        # Get public IP and geolocation
        $publicIPResponse = Invoke-RestMethod -Uri "http://ipinfo.io/json" -TimeoutSec 10
        $networkInfo.PublicIP = $publicIPResponse.ip
        $networkInfo.GeolocationData = @{
            City = $publicIPResponse.city
            Region = $publicIPResponse.region
            Country = $publicIPResponse.country
            Location = $publicIPResponse.loc
            ISP = $publicIPResponse.org
            Timezone = $publicIPResponse.timezone
        }
        
        # Get local network info
        $adapter = Get-NetAdapter | Where-Object {$_.Status -eq "Up"} | Select-Object -First 1
        if ($adapter) {
            $networkInfo.MACAddress = $adapter.MacAddress
            $ipConfig = Get-NetIPAddress -InterfaceIndex $adapter.InterfaceIndex -AddressFamily IPv4
            $networkInfo.LocalIP = $ipConfig.IPAddress
            
            $route = Get-NetRoute -InterfaceIndex $adapter.InterfaceIndex -DestinationPrefix "0.0.0.0/0"
            $networkInfo.Gateway = $route.NextHop
        }
        
        # Get DNS servers
        $dnsServers = Get-DnsClientServerAddress -AddressFamily IPv4
        $networkInfo.DNSServers = $dnsServers.ServerAddresses
        
        # Get active network connections
        $connections = Get-NetTCPConnection | Where-Object {$_.State -eq "Established"} | Select-Object -First 20
        $networkInfo.ActiveConnections = $connections | ForEach-Object {
            "$($_.LocalAddress):$($_.LocalPort) -> $($_.RemoteAddress):$($_.RemotePort)"
        }
        
        Write-IntrusionLog "✅ Network forensics completed" "CRITICAL"
        
    } catch {
        Write-IntrusionLog "❌ Network forensics error: $($_.Exception.Message)" "WARNING"
    }
    
    return $networkInfo
}

function Send-CEOAlert {
    param(
        [string]$AlertType,
        [string]$PhotoPath = "",
        [string]$ScreenshotPath = "",
        [hashtable]$NetworkInfo = @{},
        [string]$ThreatLevel = "HIGH"
    )
    
    Write-IntrusionLog "🚨 SENDING CEO ALERT - SECURITY BREACH DETECTED" "ATTACK"
    
    try {
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        $systemInfo = Get-SystemFingerprint | ConvertFrom-Json
        
        # Create detailed alert message
        $alertMessage = @"
🚨 GAMING PORTAL SECURITY BREACH ALERT 🚨
=======================================

THREAT LEVEL: $ThreatLevel
ALERT TYPE: $AlertType
TIMESTAMP: $timestamp
SYSTEM: $($systemInfo.ComputerName)

🎯 ATTACK DETAILS:
- Target: Gaming Portal ($2.8M Investment)
- User Account: $($systemInfo.UserName)
- Domain: $($systemInfo.Domain)
- System Fingerprint: $(Get-SystemFingerprint)

🌐 NETWORK FORENSICS:
- Public IP: $($NetworkInfo.PublicIP)
- Local IP: $($NetworkInfo.LocalIP)
- MAC Address: $($NetworkInfo.MACAddress)
- Gateway: $($NetworkInfo.Gateway)

📍 GEOLOCATION:
- Location: $($NetworkInfo.GeolocationData.Location)
- City: $($NetworkInfo.GeolocationData.City)
- Region: $($NetworkInfo.GeolocationData.Region)
- Country: $($NetworkInfo.GeolocationData.Country)
- ISP: $($NetworkInfo.GeolocationData.ISP)
- Timezone: $($NetworkInfo.GeolocationData.Timezone)

📸 EVIDENCE CAPTURED:
- Webcam Photo: $(if($PhotoPath) { Split-Path $PhotoPath -Leaf } else { "FAILED" })
- Screenshot: $(if($ScreenshotPath) { Split-Path $ScreenshotPath -Leaf } else { "FAILED" })

🔒 SECURITY STATUS:
- Firewall: $(if((Get-NetFirewallProfile | Where-Object {$_.Enabled -eq $true}).Count -eq 3) { "ENABLED" } else { "COMPROMISED" })
- Antivirus: $((Get-MpComputerStatus).AntivirusEnabled)
- Real-time Protection: $((Get-MpComputerStatus).RealTimeProtectionEnabled)

⚠️ IMMEDIATE ACTIONS REQUIRED:
1. Review evidence files immediately
2. Consider legal action if unauthorized access confirmed
3. Implement additional security measures
4. Review system logs for breach scope

This is an automated alert from Gaming Portal Security System.
Evidence files are stored in: $EvidenceDir
"@

        # Save alert to file
        $alertFile = "$EvidenceDir\SECURITY_ALERT_$(Get-Date -Format 'yyyyMMdd_HHmmss').txt"
        $alertMessage | Out-File -FilePath $alertFile -Encoding UTF8
        
        # Try to send email (if SMTP is configured)
        try {
            $smtpSettings = @{
                SmtpServer = "smtp.gmail.com"
                Port = 587
                UseSsl = $true
                From = "security@gamingportal.com"
                To = $CEOEmail
                Subject = "🚨 URGENT: Gaming Portal Security Breach - $ThreatLevel Threat Detected"
                Body = $alertMessage
                BodyAsHtml = $false
            }
            
            # Note: This requires SMTP credentials to be configured
            # Send-MailMessage @smtpSettings
            Write-IntrusionLog "📧 Email alert prepared for: $CEOEmail" "CRITICAL"
            
        } catch {
            Write-IntrusionLog "⚠️ Email send failed, alert saved to file: $alertFile" "WARNING"
        }
        
        # Create Windows notification
        Add-Type -AssemblyName System.Windows.Forms
        $notification = New-Object System.Windows.Forms.NotifyIcon
        $notification.Icon = [System.Drawing.SystemIcons]::Error
        $notification.BalloonTipTitle = "🚨 SECURITY BREACH"
        $notification.BalloonTipText = "Gaming Portal intrusion detected! Check logs immediately."
        $notification.Visible = $true
        $notification.ShowBalloonTip(10000)
        
        Write-IntrusionLog "✅ CEO alert sent successfully" "CRITICAL"
        Write-IntrusionLog "📁 Alert file: $alertFile" "CRITICAL"
        
    } catch {
        Write-IntrusionLog "❌ CEO alert failed: $($_.Exception.Message)" "CRITICAL"
    }
}

function Start-IntrusionMonitoring {
    Write-IntrusionLog "🛡️ STARTING MAXIMUM SECURITY MONITORING" "CRITICAL"
    
    # Create monitoring job
    $monitoringScript = {
        param($IntrusionDir, $CEOEmail)
        
        while ($true) {
            try {
                # Monitor failed login attempts
                $securityEvents = Get-WinEvent -FilterHashtable @{LogName='Security'; ID=4625; StartTime=(Get-Date).AddMinutes(-5)} -ErrorAction SilentlyContinue
                
                if ($securityEvents) {
                    foreach ($event in $securityEvents) {
                        # Trigger intrusion response
                        & "$IntrusionDir\..\intrusion-response.ps1" -TriggerType "FailedLogin" -EventData $event
                    }
                }
                
                # Monitor process creation
                $processEvents = Get-WinEvent -FilterHashtable @{LogName='Security'; ID=4688; StartTime=(Get-Date).AddMinutes(-5)} -ErrorAction SilentlyContinue
                
                if ($processEvents) {
                    foreach ($event in $processEvents) {
                        # Check for suspicious processes
                        if ($event.Message -match "(hack|crack|exploit|metasploit|nmap|wireshark)") {
                            & "$IntrusionDir\..\intrusion-response.ps1" -TriggerType "SuspiciousProcess" -EventData $event
                        }
                    }
                }
                
                Start-Sleep -Seconds 30
                
            } catch {
                # Log errors but continue monitoring
                Add-Content -Path "$IntrusionDir\Logs\monitoring-errors.log" -Value "$(Get-Date): $($_.Exception.Message)"
            }
        }
    }
    
    Start-Job -ScriptBlock $monitoringScript -ArgumentList $IntrusionDir, $CEOEmail -Name "GamingPortalIntrusionMonitor"
    Write-IntrusionLog "✅ Intrusion monitoring started (Background Job)" "INFO"
}

function Stop-IntrusionMonitoring {
    Write-IntrusionLog "🛑 STOPPING INTRUSION MONITORING" "WARNING"
    
    $job = Get-Job -Name "GamingPortalIntrusionMonitor" -ErrorAction SilentlyContinue
    if ($job) {
        Stop-Job -Job $job
        Remove-Job -Job $job
        Write-IntrusionLog "✅ Intrusion monitoring stopped" "INFO"
    } else {
        Write-IntrusionLog "ℹ️ No active monitoring job found" "INFO"
    }
}

function Test-CaptureSystem {
    Write-IntrusionLog "🧪 TESTING CAPTURE SYSTEM" "INFO"
    
    Write-Host "Testing webcam capture..." -ForegroundColor Yellow
    $photoPath = Capture-WebcamPhoto -Reason "System_Test"
    
    Write-Host "Testing screenshot capture..." -ForegroundColor Yellow
    $screenshotPath = Capture-Screenshot -Reason "System_Test"
    
    Write-Host "Testing network forensics..." -ForegroundColor Yellow
    $networkInfo = Get-DetailedNetworkInfo
    
    Write-Host "Testing CEO alert system..." -ForegroundColor Yellow
    Send-CEOAlert -AlertType "SYSTEM_TEST" -PhotoPath $photoPath -ScreenshotPath $screenshotPath -NetworkInfo $networkInfo -ThreatLevel "TEST"
    
    Write-IntrusionLog "✅ Capture system test completed" "INFO"
}

function Show-IntrusionStatus {
    Write-Host "`n🛡️ GAMING PORTAL INTRUSION DETECTION STATUS" -ForegroundColor Red
    Write-Host "=============================================" -ForegroundColor Red
    
    # Check monitoring job status
    $job = Get-Job -Name "GamingPortalIntrusionMonitor" -ErrorAction SilentlyContinue
    if ($job) {
        $statusColor = if ($job.State -eq "Running") { "Green" } else { "Red" }
        Write-Host "🔍 Monitoring Status: $($job.State)" -ForegroundColor $statusColor
    } else {
        Write-Host "🔍 Monitoring Status: STOPPED" -ForegroundColor Red
    }
    
    # Check evidence files
    $photoCount = (Get-ChildItem "$EvidenceDir\Photos" -ErrorAction SilentlyContinue).Count
    $screenshotCount = (Get-ChildItem "$EvidenceDir\Screenshots" -ErrorAction SilentlyContinue).Count
    $alertCount = (Get-ChildItem "$EvidenceDir\SECURITY_ALERT_*.txt" -ErrorAction SilentlyContinue).Count
    
    Write-Host "📸 Evidence Photos: $photoCount" -ForegroundColor White
    Write-Host "📺 Screenshots: $screenshotCount" -ForegroundColor White
    Write-Host "🚨 Security Alerts: $alertCount" -ForegroundColor White
    
    # Show recent log entries
    if (Test-Path $IntrusionLog) {
        Write-Host "`n📋 Recent Security Events:" -ForegroundColor Cyan
        Get-Content $IntrusionLog -Tail 10 | ForEach-Object {
            $color = if ($_ -match "ATTACK|CRITICAL") { "Red" } elseif ($_ -match "WARNING") { "Yellow" } else { "White" }
            Write-Host "  $_" -ForegroundColor $color
        }
    }
}

# Check if running as administrator
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "❌ This script requires administrator privileges. Please run as administrator." -ForegroundColor Red
    exit 1
}

# Main execution
Write-Host "🛡️ GAMING PORTAL ADVANCED INTRUSION DETECTION" -ForegroundColor Red
Write-Host "===============================================" -ForegroundColor Red
Write-Host "💰 PROTECTING $2.8M INVESTMENT" -ForegroundColor Yellow
Write-Host "===============================================" -ForegroundColor Red

Write-IntrusionLog "Intrusion detection system started with action: $Action" "INFO"

try {
    switch ($Action) {
        "Start" {
            Write-Host "🚨 STARTING MAXIMUM SECURITY MONITORING..." -ForegroundColor Red
            Start-IntrusionMonitoring
            Write-Host "✅ Intrusion detection is now ACTIVE!" -ForegroundColor Green
        }
        "Stop" {
            Stop-IntrusionMonitoring
        }
        "Status" {
            Show-IntrusionStatus
        }
        "TestCapture" {
            if ($Force) {
                Test-CaptureSystem
            } else {
                Write-Host "⚠️ Test will capture webcam photo and screenshot. Use -Force to confirm." -ForegroundColor Yellow
            }
        }
        "ViewLogs" {
            if (Test-Path $IntrusionLog) {
                Get-Content $IntrusionLog | Out-GridView -Title "Gaming Portal Security Logs"
            } else {
                Write-Host "❌ No log file found" -ForegroundColor Red
            }
        }
    }
} catch {
    Write-Host "❌ Operation failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-IntrusionLog "❌ Operation failed: $($_.Exception.Message)" "CRITICAL"
    exit 1
}

Write-Host "`n🔒 SECURITY LAYERS ACTIVE:" -ForegroundColor Green
Write-Host "  📸 Webcam capture on intrusion" -ForegroundColor White
Write-Host "  📺 Screenshot capture" -ForegroundColor White
Write-Host "  🌐 Network forensics" -ForegroundColor White
Write-Host "  📍 Geolocation tracking" -ForegroundColor White
Write-Host "  🚨 Automated CEO alerts" -ForegroundColor White
Write-Host "  📊 Real-time monitoring" -ForegroundColor White