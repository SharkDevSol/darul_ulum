#!/bin/bash

# Darul Ulum Deployment Script
# This script deploys the darul_ulum school management system to the VPS

set -e  # Exit on error

echo "🚀 Starting Darul Ulum Deployment..."

# Variables
DOMAIN="darul_ulum.skoolific.com"
APP_DIR="/var/www/$DOMAIN"
DB_NAME="darul_ulum_school_management"
DB_USER="postgres"
DB_PASS="Bilal2026SchoolSecurePass"
PORT="5050"
PM2_NAME="darul-ulum-backend"

# Step 1: Clone repository
echo "📦 Step 1: Cloning repository..."
if [ -d "$APP_DIR" ]; then
    echo "Directory exists, pulling latest changes..."
    cd $APP_DIR
    git pull origin main
else
    echo "Cloning repository..."
    git clone https://github.com/SharkDevSol/darul_ulum.git $APP_DIR
    cd $APP_DIR
fi

# Step 2: Create database
echo "🗄️  Step 2: Creating database..."
sudo -u postgres psql -c "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1 || \
sudo -u postgres psql -c "CREATE DATABASE $DB_NAME;"
echo "✅ Database ready"

# Step 3: Setup backend
echo "⚙️  Step 3: Setting up backend..."
cd $APP_DIR/backend

# Copy VPS environment file
cp .env.vps.darul_ulum .env

# Install dependencies
npm install

# Run Prisma migrations
npx prisma generate
npx prisma migrate deploy

# Step 4: Start backend with PM2
echo "🔧 Step 4: Starting backend..."
pm2 delete $PM2_NAME 2>/dev/null || true
pm2 start server.js --name $PM2_NAME
pm2 save

# Step 5: Build frontend
echo "🎨 Step 5: Building frontend..."
cd $APP_DIR/APP
npm install
npm run build

# Step 6: Setup Nginx
echo "🌐 Step 6: Configuring Nginx..."
sudo cp $APP_DIR/nginx-darul-ulum.conf /etc/nginx/sites-available/$DOMAIN
sudo ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/

# Step 7: Get SSL certificate
echo "🔒 Step 7: Setting up SSL..."
sudo certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email admin@skoolific.com || echo "SSL setup skipped (may already exist)"

# Step 8: Restart Nginx
echo "🔄 Step 8: Restarting Nginx..."
sudo nginx -t
sudo systemctl restart nginx

# Step 9: Setup firewall
echo "🛡️  Step 9: Configuring firewall..."
sudo ufw allow $PORT/tcp

echo ""
echo "✅ Deployment Complete!"
echo ""
echo "📊 Deployment Summary:"
echo "   Domain: https://$DOMAIN"
echo "   Backend Port: $PORT"
echo "   Database: $DB_NAME"
echo "   PM2 Process: $PM2_NAME"
echo ""
echo "🔍 Useful Commands:"
echo "   Check backend logs: pm2 logs $PM2_NAME"
echo "   Restart backend: pm2 restart $PM2_NAME"
echo "   Check Nginx: sudo nginx -t"
echo "   View Nginx logs: sudo tail -f /var/log/nginx/darul_ulum.error.log"
echo ""
