# Flat File Leaderboard Setup

This app now uses a simple flat file (JSON) leaderboard instead of AWS Amplify Data.

## How It Works

- **Backend**: A simple Express server ([server/index.js](server/index.js)) that reads/writes to a JSON file
- **Storage**: All guesses are stored in [server/data/leaderboard.json](server/data/leaderboard.json)
- **Frontend**: Uses the `useFileLeaderboard` hook to fetch data via REST API

## Running Locally

You need to run **both** the frontend and backend:

### Option 1: Run Both at Once (Recommended)
```bash
npm run dev:all
```

This runs:
- Frontend (Vite) on `http://localhost:5001`
- Backend (Express) on `http://localhost:3001`

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
npm run dev:server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## Deploying

### Deploy to Any Platform

Since this uses a simple Express server, you can deploy to:

1. **Render** (recommended for simple apps)
2. **Railway**
3. **Fly.io**
4. **Heroku**
5. **Any VPS** (DigitalOcean, Linode, etc.)

### Build Command
```bash
npm run build
```

### Start Command
```bash
npm start
```

The server will serve both:
- The API endpoints (`/api/guesses`)
- The static frontend files (from `dist/` folder)

### Environment Variables

Set `PORT` environment variable if needed (default: 3001)

## Files Changed

- `src/App.tsx` - Now uses `useFileLeaderboard` instead of `useKV`
- `src/hooks/useFileLeaderboard.ts` - New hook for API communication
- `server/index.js` - Express API server
- `server/data/leaderboard.json` - Flat file database
- `vite.config.ts` - Added proxy for `/api` requests
- `package.json` - Added server scripts and dependencies

## No AWS Required! 🎉

This solution is much simpler than Amplify - just a JSON file and Express server.
