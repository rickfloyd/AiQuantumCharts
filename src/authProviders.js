export const emailProviders = [
  {
    name: "Google",
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenUrl: "https://oauth2.googleapis.com/token",
    clientId: "YOUR_GOOGLE_CLIENT_ID",
    clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
    redirectUri: "http://localhost:8080/callback",
    scopes: ["https://mail.google.com/"]
  },
  {
    name: "Outlook",
    authUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    tokenUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    clientId: "YOUR_MS_CLIENT_ID",
    clientSecret: "YOUR_MS_CLIENT_SECRET",
    redirectUri: "http://localhost:8080/callback",
    scopes: ["https://graph.microsoft.com/Mail.ReadWrite"]
  },
  {
    name: "MSN",
    authUrl: "https://login.live.com/oauth20_authorize.srf",
    tokenUrl: "https://login.live.com/oauth20_token.srf",
    clientId: "YOUR_MSN_CLIENT_ID",
    clientSecret: "YOUR_MSN_CLIENT_SECRET",
    redirectUri: "http://localhost:8080/callback",
    scopes: ["wl.imap", "wl.offline_access"]
  },
  {
    name: "Apple",
    authUrl: "https://appleid.apple.com/auth/authorize",
    tokenUrl: "https://appleid.apple.com/auth/token",
    clientId: "YOUR_APPLE_CLIENT_ID",
    clientSecret: "YOUR_APPLE_CLIENT_SECRET",
    redirectUri: "http://localhost:8080/callback",
    scopes: ["email", "name"]
  },
  {
    name: "Yahoo",
    authUrl: "https://api.login.yahoo.com/oauth2/request_auth",
    tokenUrl: "https://api.login.yahoo.com/oauth2/get_token",
    clientId: "YOUR_YAHOO_CLIENT_ID",
    clientSecret: "YOUR_YAHOO_CLIENT_SECRET",
    redirectUri: "http://localhost:8080/callback",
    scopes: ["mail-r", "mail-w"]
  },
  {
    name: "AOL",
    authUrl: "https://login.aol.com/oauth2/request_auth",
    tokenUrl: "https://login.aol.com/oauth2/get_token",
    clientId: "YOUR_AOL_CLIENT_ID",
    clientSecret: "YOUR_AOL_CLIENT_SECRET",
    redirectUri: "http://localhost:8080/callback",
    scopes: ["mail-r", "mail-w"]
  },
  {
    name: "Proton",
    authUrl: "https://account.proton.me/oauth/authorize",
    tokenUrl: "https://account.proton.me/oauth/token",
    clientId: "YOUR_PROTON_CLIENT_ID",
    clientSecret: "YOUR_PROTON_CLIENT_SECRET",
    redirectUri: "http://localhost:8080/callback",
    scopes: ["mail"]
  },
  {
    name: "Zoho",
    authUrl: "https://accounts.zoho.com/oauth/v2/auth",
    tokenUrl: "https://accounts.zoho.com/oauth/v2/token",
    clientId: "YOUR_ZOHO_CLIENT_ID",
    clientSecret: "YOUR_ZOHO_CLIENT_SECRET",
    redirectUri: "http://localhost:8080/callback",
    scopes: ["ZohoMail.messages.READ", "ZohoMail.messages.CREATE"]
  }
];
