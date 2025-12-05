#!/bin/bash

sudo apt update && sudo apt upgrade -y

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install node
nvm use node

npm install -g pm2

npm install

pm2 startup
sudo env PATH=$PATH:/home/$USER/.nvm/versions/node/$(node -v)/bin /home/$USER/.nvm/versions/node/$(node -v)/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp /home/$USER
pm2 save

sudo ufw --force enable
sudo ufw allow ssh
sudo ufw allow 3000/tcp

echo "Node server setup complete. Reboot to test PM2 startup."
