# Running with PM2 on Lightsail

PM2 will keep your Express server running 24/7, restart it if it crashes, and auto-start on server reboot.

## Quick Setup

### 1. Install PM2 (one-time setup)

```bash
# SSH into your Lightsail instance
ssh -i ~/.ssh/YOUR_KEY.pem ubuntu@YOUR_IP

# Install PM2 globally
sudo npm install -g pm2
```

### 2. Upload Your App

```bash
# From your local machine (or this codespace)
# Option A: Using Git
ssh -i ~/.ssh/YOUR_KEY.pem ubuntu@YOUR_IP
cd ~
git clone https://github.com/marctdt/twin-gender-reveal-g.git
cd twin-gender-reveal-g

# Option B: Using SCP (if you built locally)
scp -i ~/.ssh/YOUR_KEY.pem -r dist/ server/ package.json ubuntu@YOUR_IP:~/twin-gender-reveal-g/
```

### 3. Install Dependencies

```bash
# On your Lightsail instance
cd ~/twin-gender-reveal-g
npm ci --omit=dev
```

### 4. Start with PM2

```bash
# Start using the ecosystem config
pm2 start ecosystem.config.cjs

# OR start directly (simple way)
pm2 start server/index.js --name twin-reveal
```

### 5. Setup Auto-Restart on Reboot

```bash
# Generate startup script
pm2 startup

# This will output a command like:
# sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u ubuntu --hp /home/ubuntu
# Copy and run that command

# Save current PM2 processes
pm2 save
```

## PM2 Commands Reference

```bash
# Check status
pm2 status

# View logs (real-time)
pm2 logs twin-reveal

# View last 100 lines
pm2 logs twin-reveal --lines 100

# Monitor resources
pm2 monit

# Restart app
pm2 restart twin-reveal

# Stop app
pm2 stop twin-reveal

# Delete app from PM2
pm2 delete twin-reveal

# Restart all apps
pm2 restart all

# Show detailed info
pm2 show twin-reveal

# List all processes
pm2 list
```

## Updating Your App

```bash
# SSH into Lightsail
cd ~/twin-gender-reveal-g

# Pull latest code
git pull

# Install dependencies (if package.json changed)
npm ci --omit=dev

# Restart PM2
pm2 restart twin-reveal

# Or if you need to reload the ecosystem config
pm2 delete twin-reveal
pm2 start ecosystem.config.cjs
```

## Environment Variables

Set environment variables in the PM2 ecosystem config or directly:

```bash
# Using ecosystem.config.cjs (recommended)
# Edit the env section in ecosystem.config.cjs

# Or set directly when starting
pm2 start server/index.js --name twin-reveal --env production -- PORT=3000

# Or set in PM2 after starting
pm2 restart twin-reveal --update-env
```

## Logs Location

PM2 logs are stored in:
- **Error logs**: `~/twin-gender-reveal-g/logs/pm2-error.log`
- **Output logs**: `~/twin-gender-reveal-g/logs/pm2-out.log`

Or default PM2 location:
- `~/.pm2/logs/`

## Common Issues

### App Won't Start
```bash
# Check logs for errors
pm2 logs twin-reveal --err

# Try starting manually to see errors
node server/index.js
```

### Port Already in Use
```bash
# Find process using port 3000
sudo lsof -i :3000

# Kill it
sudo kill -9 PID
```

### Memory Issues
```bash
# Monitor memory usage
pm2 monit

# The ecosystem.config.cjs limits memory to 200MB
# App will auto-restart if it exceeds this
```

## Complete Setup Script

Run this on your Lightsail instance:

```bash
#!/bin/bash
# Complete PM2 setup

# Install dependencies
cd ~/twin-gender-reveal-g
npm ci --omit=dev

# Create logs directory
mkdir -p logs

# Start with PM2
pm2 start ecosystem.config.cjs

# Setup auto-start
pm2 startup | tail -1 | sudo bash
pm2 save

# Check status
pm2 status
pm2 logs twin-reveal --lines 20

echo ""
echo "✅ App is running!"
echo "Check status: pm2 status"
echo "View logs: pm2 logs twin-reveal"
```

## Verifying It's Running

```bash
# Check PM2 status
pm2 status

# Test the API
curl http://localhost:3000/api/guesses

# Check from outside (use your Lightsail IP)
curl http://YOUR_IP:3000/api/guesses
```

## Production Checklist

- ✅ PM2 installed globally
- ✅ App started with `pm2 start`
- ✅ PM2 startup script configured (`pm2 startup`)
- ✅ Current processes saved (`pm2 save`)
- ✅ Nginx configured to proxy to port 3000
- ✅ Firewall allows port 80 (HTTP)
- ✅ Logs directory exists and is writable

Your app will now:
- ✅ Run continuously
- ✅ Auto-restart on crashes
- ✅ Auto-start on server reboot
- ✅ Keep logs of all activity
