# 🔧 Fireblocks Configuration Guide

Based on your current `.env` file, here's what you need to configure:

## 📋 **Your Current Configuration**

```bash
VITE_GOOGLE_CLIENT_ID="565965801554-4dafqt7slie13e2mnegh0q65c629d8k9.apps.googleusercontent.com" ✅
VITE_FIREBLOCKS_CLIENT_ID="659fcfa3-b1c6-4872-b2ab-fb28e95acf8b" ✅
```

## 🚨 **Missing Configuration**

### **1. Fix Redirect URI**

Update this in your `.env`:
```bash
# Change from port 3000 to 5173 (Vite default)
VITE_GOOGLE_REDIRECT_URI="http://localhost:5173/auth/callback"
```

**Also update in Google Console:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. **APIs & Services** > **Credentials** 
3. Edit your OAuth Client
4. Update **Authorized redirect URIs** to: `http://localhost:5173/auth/callback`

---

## 🔑 **API Users Setup (For Backend Integration)**

You'll need these for a complete backend setup:

### **EW Signer API User**
1. Fireblocks Console > **Settings** > **Users**
2. **Add User** > **API User**
3. **Name**: `EW-Signer`
4. **Role**: Custom role with EW permissions
5. **Permissions**: 
   - Embedded Wallet operations
   - Transaction signing
   - Key management

### **EW Admin API User**  
1. **Add User** > **API User**
2. **Name**: `EW-Admin`
3. **Role**: Custom role with admin permissions
4. **Permissions**:
   - Wallet management
   - Transaction creation
   - Policy management

**For each API user, you'll get:**
- **API Key** (public)
- **Secret Key** (private)
- **Private Key File** (download and store securely)

---

## 📝 **Complete .env Configuration**

Your `.env` should look like this:

```bash
# Fireblocks EW SDK Configuration
VITE_FIREBLOCKS_CLIENT_ID="659fcfa3-b1c6-4872-b2ab-fb28e95acf8b"

# Google OAuth Configuration
VITE_GOOGLE_CLIENT_ID="565965801554-4dafqt7slie13e2mnegh0q65c629d8k9.apps.googleusercontent.com"
VITE_GOOGLE_REDIRECT_URI="http://localhost:5173/auth/callback"

# Environment
VITE_APP_ENV=development
VITE_APP_VERSION=1.0.0

# Optional Features
VITE_ENABLE_DEMO_MODE=true
VITE_ENABLE_ANALYTICS=false
```

---

## 🧪 **Testing Your Configuration**

1. **Update your .env** with the missing values
2. **Restart the dev server**: `npm run dev`
3. **Test Google OAuth**:
   - Should redirect to Google
   - Should redirect back to `localhost:5173/auth/callback`
   - Should see real tokens in SDK Console
4. **Test Fireblocks SDK**:
   - Should initialize with your workspace
   - Should show real wallet/device IDs
   - Should log successful API connections

---

## 🔍 **Quick Checklist**

- [ ] Update `VITE_GOOGLE_REDIRECT_URI` to port 5173
- [ ] Update Google Console redirect URI to port 5173
- [ ] Restart dev server
- [ ] Test OAuth flow with EW SDK
- [ ] Create API users (for backend integration later)

---

## ❓ **Why You Need Each Value**

| Variable | Purpose | Required |
|----------|---------|----------|
| `VITE_FIREBLOCKS_CLIENT_ID` | OAuth Client ID from Fireblocks Console | ✅ Yes |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID | ✅ Yes |
| `VITE_GOOGLE_REDIRECT_URI` | Where Google sends user after OAuth | ✅ Yes |
| API Users | Backend authentication with Fireblocks | Later |

The **Fireblocks Client ID** is your OAuth client identifier configured in the Fireblocks Console. The EW SDK uses this for authentication without requiring backend API keys or workspace IDs - it's designed for direct frontend integration! 🎯