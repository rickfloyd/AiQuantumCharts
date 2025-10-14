#!/bin/bash
# Gaming Portal Credential Manager
# Adapted from QuantumDiamond SMTP Credential System
# Secure storage for OAuth tokens, API keys, and gaming platform credentials

GAMING_PORTAL_DIR="/opt/gaming-portal"
CRED_DIR="$GAMING_PORTAL_DIR/credentials"
LOG_DIR="$GAMING_PORTAL_DIR/logs"

# Credential files
OAUTH_CRED_FILE="$CRED_DIR/oauth_credentials.txt"
API_KEYS_FILE="$CRED_DIR/api_keys.txt"
DB_CRED_FILE="$CRED_DIR/database_credentials.txt"
SECURITY_LOG="$LOG_DIR/credential-manager.log"

# Create secure directories
sudo mkdir -p "$CRED_DIR" "$LOG_DIR"
sudo chmod 700 "$CRED_DIR"
sudo chmod 755 "$LOG_DIR"

log_message() {
    echo "$(date) - $1" | sudo tee -a "$SECURITY_LOG"
}

setup_oauth_credentials() {
    echo "🎮 Gaming Portal OAuth Credential Setup"
    echo "========================================"
    
    echo "Enter Xbox Live Client ID:"
    read xbox_client_id
    echo "Enter Xbox Live Client Secret:"
    read -s xbox_secret
    
    echo "Enter Steam Web API Key:"
    read steam_api_key
    
    echo "Enter Epic Games Client ID:"
    read epic_client_id
    echo "Enter Epic Games Client Secret:"
    read -s epic_secret
    
    echo "Enter PlayStation Network Client ID:"
    read psn_client_id
    echo "Enter PlayStation Network Client Secret:"
    read -s psn_secret
    
    # Save OAuth credentials securely
    {
        echo "XBOX_CLIENT_ID=$xbox_client_id"
        echo "XBOX_CLIENT_SECRET=$xbox_secret"
        echo "STEAM_API_KEY=$steam_api_key"
        echo "EPIC_CLIENT_ID=$epic_client_id"
        echo "EPIC_CLIENT_SECRET=$epic_secret"
        echo "PSN_CLIENT_ID=$psn_client_id"
        echo "PSN_CLIENT_SECRET=$psn_secret"
        echo "CREATED_AT=$(date)"
    } | sudo tee "$OAUTH_CRED_FILE" > /dev/null
    
    sudo chmod 600 "$OAUTH_CRED_FILE"
    log_message "✅ OAuth credentials saved securely"
    echo "✅ OAuth credentials saved to $OAUTH_CRED_FILE"
}

setup_database_credentials() {
    echo "🗄️ Database Credential Setup"
    echo "============================"
    
    echo "Enter PostgreSQL Host (default: localhost):"
    read db_host
    db_host=${db_host:-localhost}
    
    echo "Enter PostgreSQL Port (default: 5432):"
    read db_port
    db_port=${db_port:-5432}
    
    echo "Enter PostgreSQL Database Name:"
    read db_name
    
    echo "Enter PostgreSQL Username:"
    read db_user
    
    echo "Enter PostgreSQL Password:"
    read -s db_password
    
    # Save database credentials
    {
        echo "DB_HOST=$db_host"
        echo "DB_PORT=$db_port"
        echo "DB_NAME=$db_name"
        echo "DB_USER=$db_user"
        echo "DB_PASSWORD=$db_password"
        echo "DATABASE_URL=postgres://$db_user:$db_password@$db_host:$db_port/$db_name"
        echo "CREATED_AT=$(date)"
    } | sudo tee "$DB_CRED_FILE" > /dev/null
    
    sudo chmod 600 "$DB_CRED_FILE"
    log_message "✅ Database credentials saved securely"
    echo "✅ Database credentials saved to $DB_CRED_FILE"
}

setup_api_keys() {
    echo "🔑 API Keys Setup"
    echo "================="
    
    echo "Enter JWT Secret Key (for session management):"
    read jwt_secret
    
    echo "Enter Encryption Key (for sensitive data):"
    read -s encryption_key
    
    echo "Enter Gaming Analytics API Key (optional):"
    read analytics_key
    
    # Save API keys
    {
        echo "JWT_SECRET=$jwt_secret"
        echo "ENCRYPTION_KEY=$encryption_key"
        echo "ANALYTICS_API_KEY=$analytics_key"
        echo "CREATED_AT=$(date)"
    } | sudo tee "$API_KEYS_FILE" > /dev/null
    
    sudo chmod 600 "$API_KEYS_FILE"
    log_message "✅ API keys saved securely"
    echo "✅ API keys saved to $API_KEYS_FILE"
}

generate_env_file() {
    ENV_FILE="$GAMING_PORTAL_DIR/.env"
    
    echo "# Gaming Portal Environment Configuration" | sudo tee "$ENV_FILE" > /dev/null
    echo "# Generated on $(date)" | sudo tee -a "$ENV_FILE" > /dev/null
    echo "" | sudo tee -a "$ENV_FILE" > /dev/null
    
    # Add OAuth credentials
    if [[ -f "$OAUTH_CRED_FILE" ]]; then
        echo "# OAuth Credentials" | sudo tee -a "$ENV_FILE" > /dev/null
        sudo cat "$OAUTH_CRED_FILE" | sudo tee -a "$ENV_FILE" > /dev/null
        echo "" | sudo tee -a "$ENV_FILE" > /dev/null
    fi
    
    # Add database credentials
    if [[ -f "$DB_CRED_FILE" ]]; then
        echo "# Database Configuration" | sudo tee -a "$ENV_FILE" > /dev/null
        sudo cat "$DB_CRED_FILE" | sudo tee -a "$ENV_FILE" > /dev/null
        echo "" | sudo tee -a "$ENV_FILE" > /dev/null
    fi
    
    # Add API keys
    if [[ -f "$API_KEYS_FILE" ]]; then
        echo "# API Keys" | sudo tee -a "$ENV_FILE" > /dev/null
        sudo cat "$API_KEYS_FILE" | sudo tee -a "$ENV_FILE" > /dev/null
        echo "" | sudo tee -a "$ENV_FILE" > /dev/null
    fi
    
    sudo chmod 600 "$ENV_FILE"
    log_message "✅ Environment file generated at $ENV_FILE"
    echo "✅ Environment file generated at $ENV_FILE"
}

show_menu() {
    echo "🎮 Gaming Portal Credential Manager"
    echo "==================================="
    echo "1. Setup OAuth Credentials (Xbox, Steam, Epic, PlayStation)"
    echo "2. Setup Database Credentials"
    echo "3. Setup API Keys"
    echo "4. Generate Environment File"
    echo "5. View Current Credentials"
    echo "6. Exit"
    echo ""
    echo "Enter your choice (1-6):"
}

view_credentials() {
    echo "📋 Current Credential Status"
    echo "============================"
    
    if [[ -f "$OAUTH_CRED_FILE" ]]; then
        echo "✅ OAuth credentials configured"
        echo "   Created: $(grep CREATED_AT "$OAUTH_CRED_FILE" | cut -d'=' -f2)"
    else
        echo "❌ OAuth credentials not configured"
    fi
    
    if [[ -f "$DB_CRED_FILE" ]]; then
        echo "✅ Database credentials configured"
        echo "   Created: $(grep CREATED_AT "$DB_CRED_FILE" | cut -d'=' -f2)"
    else
        echo "❌ Database credentials not configured"
    fi
    
    if [[ -f "$API_KEYS_FILE" ]]; then
        echo "✅ API keys configured"
        echo "   Created: $(grep CREATED_AT "$API_KEYS_FILE" | cut -d'=' -f2)"
    else
        echo "❌ API keys not configured"
    fi
}

# Main menu loop
while true; do
    show_menu
    read choice
    
    case $choice in
        1)
            setup_oauth_credentials
            ;;
        2)
            setup_database_credentials
            ;;
        3)
            setup_api_keys
            ;;
        4)
            generate_env_file
            ;;
        5)
            view_credentials
            ;;
        6)
            echo "👋 Goodbye!"
            exit 0
            ;;
        *)
            echo "❌ Invalid choice. Please enter 1-6."
            ;;
    esac
    
    echo ""
    echo "Press Enter to continue..."
    read
    clear
done