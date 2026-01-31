# ✨ Twin Gender Reveal App

A fun, interactive twin gender reveal game with a **global leaderboard**!

## 🚀 Quick Start

This app uses a simple flat file backend (no AWS required!)

### Run the App Locally

```bash
npm install
npm run dev:all
```

Then open [http://localhost:5001](http://localhost:5001)

This runs:
- **Frontend** (Vite) on port 5001
- **Backend** (Express API) on port 3001

## 📁 How It Works

- **Storage**: Simple JSON file at `server/data/leaderboard.json`
- **Backend**: Express server at `server/index.js`
- **Frontend**: React app that calls `/api/guesses`
- **Real-time**: Polls for updates every 5 seconds

## 📦 What's Inside?
- A clean, minimal Spark environment
- Pre-configured for local development
- Ready to scale with your ideas
  
🧠 What Can You Do?

Right now, this is just a starting point — the perfect place to begin building and testing your Spark applications.

🧹 Just Exploring?
No problem! If you were just checking things out and don’t need to keep this code:

- Simply delete your Spark.
- Everything will be cleaned up — no traces left behind.

📄 License For Spark Template Resources 

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.
