#!/bin/bash

# Update system
sudo apt update && sudo apt upgrade -y

# Install NGINX
sudo apt install nginx -y

# Create directory for images
sudo mkdir -p /var/www/rainbow-puppies/img

# UFW setup
sudo ufw --force enable
sudo ufw allow ssh
sudo ufw allow 80/tcp  # For HTTP

echo "Image server setup complete."
