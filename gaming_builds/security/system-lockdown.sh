#!/bin/bash
# Gaming Portal Security Lockdown Script
# Adapted from QuantumDiamond Security System
# Usage: ./system-lockdown.sh [enable|disable]

GAMING_PORTAL_DIR="/opt/gaming-portal"
LOG_DIR="$GAMING_PORTAL_DIR/logs"
SECURITY_LOG="$LOG_DIR/security-lockdown.log"

# Create directories if they don't exist
sudo mkdir -p "$LOG_DIR"
sudo chmod 755 "$LOG_DIR"

log_message() {
    echo "$(date) - $1" | sudo tee -a "$SECURITY_LOG"
}

enable_lockdown() {
    log_message "🔒 Gaming Portal Security Lockdown - ENABLING"
    
    # Disable unnecessary services for gaming security
    sudo launchctl unload -w /System/Library/LaunchDaemons/ssh.plist 2>/dev/null
    log_message "✅ SSH service disabled"
    
    # Set secure proxy for gaming traffic (redirect to local security proxy)
    sudo networksetup -setsecurewebproxy "Wi-Fi" "127.0.0.1" 8080
    sudo networksetup -setsecurewebproxy "Ethernet" "127.0.0.1" 8080
    log_message "✅ Secure web proxy configured for gaming traffic"
    
    # Enable macOS firewall for enhanced security
    sudo defaults write /Library/Preferences/com.apple.alf globalstate -int 2
    sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on
    log_message "✅ Firewall enabled"
    
    # Gaming-specific security rules
    sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /usr/local/bin/node
    sudo /usr/libexec/ApplicationFirewall/socketfilterfw --unblockapp /usr/local/bin/node
    log_message "✅ Node.js gaming server whitelisted in firewall"
    
    # Block known gaming cheat/hack domains
    echo "# Gaming Portal Security - Block cheat sites" | sudo tee -a /etc/hosts
    echo "127.0.0.1 cheatengine.org" | sudo tee -a /etc/hosts
    echo "127.0.0.1 wemod.com" | sudo tee -a /etc/hosts
    log_message "✅ Gaming cheat sites blocked"
    
    log_message "🔒 Gaming Portal Security Lockdown - COMPLETED"
    echo "✅ Gaming Portal security lockdown enabled successfully!"
}

disable_lockdown() {
    log_message "🔓 Gaming Portal Security Lockdown - DISABLING"
    
    # Re-enable SSH if needed
    sudo launchctl load -w /System/Library/LaunchDaemons/ssh.plist 2>/dev/null
    log_message "✅ SSH service re-enabled"
    
    # Remove proxy settings
    sudo networksetup -setsecurewebproxystate "Wi-Fi" off
    sudo networksetup -setsecurewebproxystate "Ethernet" off
    log_message "✅ Secure web proxy disabled"
    
    # Clean up hosts file
    sudo sed -i '' '/# Gaming Portal Security/,+3d' /etc/hosts
    log_message "✅ Hosts file cleaned"
    
    log_message "🔓 Gaming Portal Security Lockdown - DISABLED"
    echo "✅ Gaming Portal security lockdown disabled successfully!"
}

case "$1" in
    enable)
        enable_lockdown
        ;;
    disable)
        disable_lockdown
        ;;
    *)
        echo "Usage: $0 {enable|disable}"
        echo "  enable  - Enable gaming portal security lockdown"
        echo "  disable - Disable gaming portal security lockdown"
        exit 1
        ;;
esac