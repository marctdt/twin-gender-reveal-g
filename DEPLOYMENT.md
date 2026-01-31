# Deploy to Render + AWS Amplify

Your app is split into two parts:
- **Backend (Express API)** → Deploy to **Render**
- **Frontend (React)** → Deploy to **AWS Amplify**

## Step 1: Deploy Backend to Render

1. Go to [render.com](https://render.com) and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo: `marctdt/twin-gender-reveal-g`
4. Configure:
   - **Name**: `twin-gender-reveal-api`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. Click **"Create Web Service"**
6. Wait for deployment (~2-3 minutes)
7. **Copy your Render URL**: `https://twin-gender-reveal-api.onrender.com`

## Step 2: Deploy Frontend to AWS Amplify

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click **"New app"** → **"Host web app"**
3. Connect your GitHub repo: `marctdt/twin-gender-reveal-g`
4. Select **main** branch
5. **IMPORTANT**: Add Environment Variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://twin-gender-reveal-api.onrender.com/api/guesses`
   
   (Replace with your actual Render URL from Step 1)

6. Click **"Save and deploy"**
7. Wait for deployment (~3-5 minutes)

## Done! 🎉

Your app is now live:
- Frontend: `https://main.xxxxx.amplifyapp.com` (AWS Amplify)
- Backend: `https://twin-gender-reveal-api.onrender.com` (Render)

All user submissions are saved to the JSON file on Render and synced across all users!

## Local Development

```bash
npm run dev:all
```

This runs:
- Frontend on `http://localhost:5001`
- Backend on `http://localhost:3000`

No environment variables needed locally - the Vite proxy handles it.

## Notes

- **Render Free Tier**: Server spins down after 15 min of inactivity (first request takes ~30s to wake)
- **Persistent Storage**: The `leaderboard.json` file persists on Render's disk
- **CORS**: Already configured in the Express server
