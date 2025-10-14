# Gaming Portal Security Monitoring & Reporting Script (Windows PowerShell)
# Adapted from QuantumDiamond Security System
# Generates security reports and sends via email

param(
    [string]$EmailRecipient = "FOREXANARCHY@GMAIL.COM",
    [switch]$SendEmail = $false
)

$GamingPortalDir = "C:\GamingPortal"
$LogDir = "$GamingPortalDir\Logs"
$CredFile = "$GamingPortalDir\credentials\smtp_credentials.txt"
$hostname = $env:COMPUTERNAME
$SecurityLogFile = "$LogDir\${hostname}_SecurityReport.txt"

# Create directories if they don't exist
if (!(Test-Path $LogDir)) {
    New-Item -ItemType Directory -Path $LogDir -Force | Out-Null
}

function Write-SecurityReport {
    Write-Host "🔍 Generating Security Report for Gaming Portal..." -ForegroundColor Cyan
    
    # Start security report
    $reportContent = @"
🎮 GAMING PORTAL SECURITY REPORT
================================
Hostname: $hostname
Date: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
Gaming Portal Directory: $GamingPortalDir

🔍 SYSTEM SECURITY STATUS
========================

"@

    # Check Windows Firewall Status
    $reportContent += "`n🛡️ FIREWALL STATUS:`n"
    $firewallProfiles = Get-NetFirewallProfile
    foreach ($profile in $firewallProfiles) {
        $reportContent += "  $($profile.Name): $($profile.Enabled)`n"
    }
    
    # Check Gaming Portal Firewall Rules
    $reportContent += "`n🎮 GAMING PORTAL FIREWALL RULES:`n"
    $gamingRules = Get-NetFirewallRule -DisplayName "*Gaming Portal*" -ErrorAction SilentlyContinue
    if ($gamingRules) {
        foreach ($rule in $gamingRules) {
            $reportContent += "  $($rule.DisplayName): $($rule.Enabled)`n"
        }
    } else {
        $reportContent += "  No Gaming Portal firewall rules found`n"
    }
    
    # Check Running Processes (Gaming Related)
    $reportContent += "`n🔄 GAMING-RELATED PROCESSES:`n"
    $gamingProcesses = Get-Process | Where-Object {
        $_.ProcessName -match "(node|chrome|firefox|steam|epic|xbox|discord|obs)" -or
        $_.MainWindowTitle -match "(gaming|game|portal)"
    }
    foreach ($process in $gamingProcesses) {
        $reportContent += "  $($process.ProcessName) (PID: $($process.Id)) - CPU: $($process.CPU)%`n"
    }
    
    # Check Network Connections
    $reportContent += "`n🌐 NETWORK CONNECTIONS (Gaming Ports):`n"
    $connections = Get-NetTCPConnection | Where-Object {
        $_.LocalPort -in @(3000, 5173, 8080, 27015, 7777) -or
        $_.RemotePort -in @(80, 443, 27015, 7777)
    }
    foreach ($conn in $connections) {
        $reportContent += "  $($conn.LocalAddress):$($conn.LocalPort) -> $($conn.RemoteAddress):$($conn.RemotePort) [$($conn.State)]`n"
    }
    
    # Check Services Status
    $reportContent += "`n⚙️ GAMING SERVICES STATUS:`n"
    $gamingServices = @("WinHttpAutoProxySvc", "Dnscache", "LanmanServer", "LanmanWorkstation")
    foreach ($serviceName in $gamingServices) {
        $service = Get-Service -Name $serviceName -ErrorAction SilentlyContinue
        if ($service) {
            $reportContent += "  $($service.Name): $($service.Status)`n"
        }
    }
    
    # Check DNS Settings
    $reportContent += "`n🔍 DNS CONFIGURATION:`n"
    $adapters = Get-NetAdapter | Where-Object {$_.Status -eq "Up"}
    foreach ($adapter in $adapters) {
        $dnsServers = Get-DnsClientServerAddress -InterfaceIndex $adapter.InterfaceIndex -AddressFamily IPv4
        $reportContent += "  $($adapter.Name): $($dnsServers.ServerAddresses -join ', ')`n"
    }
    
    # Check Gaming Portal Files
    $reportContent += "`n📁 GAMING PORTAL FILES STATUS:`n"
    $criticalFiles = @(
        "$GamingPortalDir\gaming_builds\package.json",
        "$GamingPortalDir\gaming_builds\src\App.tsx",
        "$GamingPortalDir\gaming_builds\backend\server.js"
    )
    foreach ($file in $criticalFiles) {
        if (Test-Path $file) {
            $fileInfo = Get-Item $file
            $reportContent += "  ✅ $($fileInfo.Name) - Modified: $($fileInfo.LastWriteTime)`n"
        } else {
            $reportContent += "  ❌ $(Split-Path $file -Leaf) - NOT FOUND`n"
        }
    }
    
    # Check Event Logs for Security Events
    $reportContent += "`n🚨 RECENT SECURITY EVENTS:`n"
    $securityEvents = Get-WinEvent -FilterHashtable @{LogName='Security'; Level=2,3; StartTime=(Get-Date).AddHours(-24)} -MaxEvents 10 -ErrorAction SilentlyContinue
    if ($securityEvents) {
        foreach ($event in $securityEvents) {
            $reportContent += "  [$(Get-Date $event.TimeCreated -Format 'HH:mm:ss')] ID:$($event.Id) - $($event.LevelDisplayName)`n"
        }
    } else {
        $reportContent += "  No critical security events in last 24 hours`n"
    }
    
    # System Performance for Gaming
    $reportContent += "`n💻 SYSTEM PERFORMANCE (Gaming Metrics):`n"
    $cpu = Get-Counter "\Processor(_Total)\% Processor Time" -SampleInterval 1 -MaxSamples 1
    $memory = Get-Counter "\Memory\Available MBytes" -SampleInterval 1 -MaxSamples 1
    $reportContent += "  CPU Usage: $([math]::Round(100 - $cpu.CounterSamples.CookedValue, 2))%`n"
    $reportContent += "  Available Memory: $([math]::Round($memory.CounterSamples.CookedValue, 0)) MB`n"
    
    # GPU Status (if available)
    try {
        $gpu = Get-CimInstance -ClassName Win32_VideoController | Where-Object {$_.Name -notmatch "Basic"}
        if ($gpu) {
            $reportContent += "  GPU: $($gpu.Name)`n"
        }
    } catch {
        $reportContent += "  GPU: Unable to detect`n"
    }
    
    $reportContent += "`n" + "="*50 + "`n"
    $reportContent += "Report generated on $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')`n"
    $reportContent += "Gaming Portal Security Monitor v1.0`n"
    
    # Save report to file
    $reportContent | Out-File -FilePath $SecurityLogFile -Encoding UTF8
    Write-Host "✅ Security report saved to: $SecurityLogFile" -ForegroundColor Green
    
    return $reportContent
}

function Send-SecurityReport {
    param([string]$ReportContent)
    
    if (!(Test-Path $CredFile)) {
        Write-Host "❌ SMTP credentials file not found: $CredFile" -ForegroundColor Red
        Write-Host "   Please run the credential manager first to set up email credentials." -ForegroundColor Yellow
        return
    }
    
    try {
        $credentials = Get-Content $CredFile
        $email = $credentials[0]
        $password = $credentials[1]
        
        # Create email message
        $subject = "🎮 Gaming Portal Security Report - $hostname - $(Get-Date -Format 'yyyy-MM-dd')"
        
        # Use PowerShell's Send-MailMessage (requires SMTP settings)
        $smtpSettings = @{
            SmtpServer = "smtp.gmail.com"
            Port = 587
            UseSsl = $true
            Credential = New-Object System.Management.Automation.PSCredential($email, (ConvertTo-SecureString $password -AsPlainText -Force))
            From = $email
            To = $EmailRecipient
            Subject = $subject
            Body = $ReportContent
            BodyAsHtml = $false
        }
        
        Send-MailMessage @smtpSettings
        Write-Host "✅ Security report sent to: $EmailRecipient" -ForegroundColor Green
        
    } catch {
        Write-Host "❌ Failed to send email: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "   Please check SMTP credentials and network connectivity." -ForegroundColor Yellow
    }
}

# Main execution
Write-Host "🎮 Gaming Portal Security Monitor" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan

$securityReport = Write-SecurityReport

if ($SendEmail) {
    Write-Host "`n📧 Sending security report via email..." -ForegroundColor Yellow
    Send-SecurityReport -ReportContent $securityReport
} else {
    Write-Host "`n📋 Security report generated. Use -SendEmail flag to send via email." -ForegroundColor Yellow
}

Write-Host "`n📊 Security Report Summary:" -ForegroundColor Cyan
Write-Host "  Report File: $SecurityLogFile" -ForegroundColor White
Write-Host "  Hostname: $hostname" -ForegroundColor White
Write-Host "  Timestamp: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor White

if (Test-Path $SecurityLogFile) {
    Write-Host "`n📖 To view the full report:" -ForegroundColor Green
    Write-Host "  Get-Content '$SecurityLogFile'" -ForegroundColor White
}