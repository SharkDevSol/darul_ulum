#!/bin/bash

# Auto SSL Setup - Waits for DNS and installs SSL automatically

DOMAIN="darul-ulum.skoolific.com"
VPS_IP="76.13.48.245"
MAX_ATTEMPTS=60  # 60 attempts = 30 minutes (checking every 30 seconds)

echo "🔍 Monitoring DNS propagation for $DOMAIN..."
echo "Expected IP: $VPS_IP"
echo ""

attempt=1
while [ $attempt -le $MAX_ATTEMPTS ]; do
    echo "[$attempt/$MAX_ATTEMPTS] Checking DNS..."
    
    # Check DNS resolution
    DNS_IP=$(dig +short $DOMAIN @8.8.8.8 | tail -1)
    
    if [ -n "$DNS_IP" ] && [ "$DNS_IP" = "$VPS_IP" ]; then
        echo ""
        echo "✅ DNS is now resolving correctly!"
        echo "   $DOMAIN → $DNS_IP"
        echo ""
        echo "🔒 Installing SSL certificate..."
        
        # Install SSL certificate
        certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email admin@skoolific.com
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "🎉 SUCCESS! SSL Certificate installed!"
            echo ""
            echo "✅ Darul Ulum is now accessible at:"
            echo "   https://$DOMAIN"
            echo ""
            echo "📊 System Status:"
            echo "   - Backend: Running on port 5051"
            echo "   - Frontend: Deployed"
            echo "   - Database: darul_ulum_school_management"
            echo "   - SSL: Enabled ✅"
            echo "   - HTTPS: Active ✅"
            echo ""
            exit 0
        else
            echo ""
            echo "❌ SSL installation failed. Please check the logs."
            exit 1
        fi
    else
        if [ -n "$DNS_IP" ]; then
            echo "   Current IP: $DNS_IP (incorrect)"
        else
            echo "   DNS not resolving yet..."
        fi
    fi
    
    # Wait 30 seconds before next check
    sleep 30
    attempt=$((attempt + 1))
done

echo ""
echo "⏱️  Timeout: DNS did not propagate within 30 minutes"
echo "   This is unusual but can happen. Please wait a bit longer and run:"
echo "   bash /tmp/setup-ssl-darul-ulum.sh"
echo ""
