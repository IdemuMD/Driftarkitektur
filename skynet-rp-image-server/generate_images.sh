#!/bin/bash

# Install ImageMagick if not installed
sudo apt install imagemagick -y

# Create directory if not exists
sudo mkdir -p /var/www/rainbow-puppies/img

# Generate 10 rainbow puppy images
for i in {1..10}; do
  convert -size 400x400 xc: +noise Random -blur 0x2 -contrast-stretch 0 /var/www/rainbow-puppies/img/puppy$i.png
  # Add some color
  convert /var/www/rainbow-puppies/img/puppy$i.png -fill "hsl($((RANDOM%360)),100%,50%)" -tint 50% /var/www/rainbow-puppies/img/puppy$i.png
done

echo "10 rainbow puppy images generated."
