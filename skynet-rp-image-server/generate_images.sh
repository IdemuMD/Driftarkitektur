#!/bin/bash

sudo apt install imagemagick -y

sudo mkdir -p /var/www/rainbow-puppies/img

for i in {1..10}; do
  convert -size 400x400 xc: +noise Random -blur 0x2 -contrast-stretch 0 /var/www/rainbow-puppies/img/puppy$i.png
  convert /var/www/rainbow-puppies/img/puppy$i.png -fill "hsl($((RANDOM%360)),100%,50%)" -tint 50% /var/www/rainbow-puppies/img/puppy$i.png
done

echo "10 rainbow puppy images generated."
