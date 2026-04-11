#!/bin/bash

# SSL Setup Script for Darul Ulum
# Run this script AFTER DNS is configured

set -e

DOMAIN="darul-ulum.skoolific.com"
VPS_IP="76.13.48.245"

echo "🔍 Checking DNS configuration..."

# Check if DNS is configured
DNS_IP=$(dig +short $DOMAIN | tail -1)

if [ -z "$DNS_IP" ]; then
    echo "❌ DNS not configured yet!"
    echo ""
    echo "Please configure DNS first:"
    echo "  1. Go to your DNS provider (e.g., Cloudflare, GoDaddy, etc.)"
    echo "  2. Add an A record:"
    echo "     - Name: darul-ulum"
    echo "     - Type: A"
    echo "     - Value: $VPS_IP"
    echo "     - TTL: Auto or 3600"
    echo ""
    echo "After DNS is configured, wait 5-10 minutes and run this script again."
    exit 1
fi

if [ "$DNS_IP" != "$VPS_IP" ]; then
    echo "⚠️  DNS is configured but pointing to wrong IP!"
    echo "   Current: $DNS_IP"
    echo "   Expected: $VPS_IP"
    echo ""
    echo "Please update your DNS A record to point to $VPS_IP"
    exit 1
fi

echo "✅ DNS is correctly configured!"
echo "   $DOMAIN → $DNS_IP"
echo ""

# Get SSL certificate
echo "🔒 Getting SSL certificate..."
sudo certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email admin@skoolific.com

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SSL Certificate installed successfully!"
    echo ""
    echo "🎉 Darul Ulum is now accessible at:"
    echo "   https://$DOMAIN"
    echo ""
    echo "📊 System Status:"
    echo "   - Backend: Running on port 5051"
    echo "   - Frontend: Deployed"
    echo "   - Database: darul_ulum_school_management"
    echo "   - SSL: Enabled"
    echo ""
else
    echo ""
    echo "❌ SSL certificate installation failed!"
    echo "Please check the error messages above."
    exit 1
fi
