# DNS Configuration Guide for Darul Ulum

## 📋 DNS Configuration Required

To make `darul-ulum.skoolific.com` accessible, you need to configure DNS records.

### 🌐 DNS Settings

**Domain**: skoolific.com  
**Subdomain**: darul-ulum  
**VPS IP**: 76.13.48.245

### 📝 Steps to Configure DNS

#### Option 1: If using Cloudflare

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select your domain: `skoolific.com`
3. Go to **DNS** → **Records**
4. Click **Add record**
5. Configure:
   - **Type**: A
   - **Name**: darul-ulum
   - **IPv4 address**: 76.13.48.245
   - **Proxy status**: DNS only (gray cloud) - IMPORTANT for SSL
   - **TTL**: Auto
6. Click **Save**

#### Option 2: If using GoDaddy

1. Log in to [GoDaddy](https://www.godaddy.com)
2. Go to **My Products** → **DNS**
3. Find `skoolific.com` and click **Manage DNS**
4. Click **Add** under Records
5. Configure:
   - **Type**: A
   - **Host**: darul-ulum
   - **Points to**: 76.13.48.245
   - **TTL**: 1 Hour
6. Click **Save**

#### Option 3: If using Namecheap

1. Log in to [Namecheap](https://www.namecheap.com)
2. Go to **Domain List** → Select `skoolific.com`
3. Click **Manage** → **Advanced DNS**
4. Click **Add New Record**
5. Configure:
   - **Type**: A Record
   - **Host**: darul-ulum
   - **Value**: 76.13.48.245
   - **TTL**: Automatic
6. Click **Save**

#### Option 4: Other DNS Providers

The general steps are:
1. Log in to your DNS provider
2. Find DNS management for `skoolific.com`
3. Add an A record:
   - **Name/Host**: darul-ulum
   - **Type**: A
   - **Value/Points to**: 76.13.48.245
   - **TTL**: Auto or 3600

### ⏱️ DNS Propagation

After adding the DNS record:
- **Minimum wait**: 5-10 minutes
- **Maximum wait**: 24-48 hours (rare)
- **Typical**: 15-30 minutes

### ✅ Verify DNS Configuration

#### Method 1: Using nslookup (Windows)
```cmd
nslookup darul-ulum.skoolific.com
```

Expected output:
```
Name:    darul-ulum.skoolific.com
Address: 76.13.48.245
```

#### Method 2: Using dig (Linux/Mac)
```bash
dig darul-ulum.skoolific.com +short
```

Expected output:
```
76.13.48.245
```

#### Method 3: Online Tools
- https://dnschecker.org
- Enter: `darul-ulum.skoolific.com`
- Check if it resolves to `76.13.48.245`

### 🔒 After DNS is Configured

Once DNS is working, run the SSL setup script on the VPS:

```bash
# Upload the script
scp setup-ssl-darul-ulum.sh root@76.13.48.245:/tmp/

# SSH to VPS
ssh root@76.13.48.245

# Run the script
chmod +x /tmp/setup-ssl-darul-ulum.sh
bash /tmp/setup-ssl-darul-ulum.sh
```

Or manually run:
```bash
sudo certbot --nginx -d darul-ulum.skoolific.com --non-interactive --agree-tos --email admin@skoolific.com
```

### 🎉 Access the System

After SSL is configured:
- **URL**: https://darul-ulum.skoolific.com
- **API**: https://darul-ulum.skoolific.com/api
- **Backend Port**: 5051 (internal only)

### 🔧 Current Status

✅ Backend running on port 5051  
✅ Frontend built and deployed  
✅ Database created and migrated  
✅ Nginx configured (HTTP only)  
✅ PM2 process running  
⏳ DNS configuration (pending)  
⏳ SSL certificate (pending DNS)

### 📞 Troubleshooting

**DNS not resolving?**
- Wait 15-30 minutes after adding the record
- Clear your DNS cache: `ipconfig /flushdns` (Windows) or `sudo systemd-resolve --flush-caches` (Linux)
- Try from a different network or use online DNS checkers

**SSL certificate fails?**
- Ensure DNS is resolving correctly first
- If using Cloudflare, disable proxy (gray cloud, not orange)
- Check Nginx logs: `sudo tail -f /var/log/nginx/darul_ulum.error.log`

**Site not loading?**
- Check backend: `pm2 logs darul-ulum-backend`
- Check Nginx: `sudo nginx -t`
- Restart services: `pm2 restart darul-ulum-backend && sudo systemctl restart nginx`

### 📧 Contact

For DNS configuration assistance, contact your domain administrator or DNS provider support.
