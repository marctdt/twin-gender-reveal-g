# Twin Gender Reveal - Amplify Setup Guide

## AWS Amplify Configuration

This app supports AWS Amplify Data (DynamoDB) for a global leaderboard that persists across all users.

### Deployment Steps

1. **Push to GitHub** (already done)
   
2. **Connect to AWS Amplify**
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
   - Click "New app" → "Host web app"
   - Connect your GitHub repository `marctdt/twin-gender-reveal-g`
   - Select the `main` branch

3. **CRITICAL: Enable Amplify Gen 2 Backend**
   
   After connecting your repo, **before deploying**, you MUST enable the backend:
   
   a. In your Amplify app, go to the "Backend" tab
   b. Click "Create backend" or "Enable backend"
   c. This will detect your `amplify/` folder and deploy the database
   
   **Without this step, the app will only use local storage!**

4. **Configure Build Settings** (optional - should auto-detect)
   - Amplify will automatically detect the `amplify.yml` file
   - Build command: `npm run build`
   - Output directory: `dist`

5. **Deploy**
   - Click "Save and deploy"
   - Wait for BOTH frontend and backend to deploy (~5-10 minutes)
   - Check the "Backend" tab to ensure the database is created
   - Your app will now have a global leaderboard powered by DynamoDB!

### Verifying It Works

After deployment:
1. Open your deployed app URL
2. Check the browser console (F12)
3. Look for: `"Using: Amplify"` (not `"Using: LocalStorage"`)
4. You should NOT see the yellow warning banner
5. Votes from different browsers/devices should appear for everyone

### How It Works

- **Local Development**: Uses browser localStorage (via Spark's useKV)
- **Production (Amplify)**: Automatically switches to AWS DynamoDB
- **Real-time Updates**: Leaderboard updates live for all users
- **Public Access**: No authentication required (uses API Key)

### Database Schema

The app creates a `GenderGuess` table with:
- `name`: Player name
- `twin1`: Gender guess for twin 1 ('boy' or 'girl')
- `twin2`: Gender guess for twin 2 ('boy' or 'girl')  
- `timestamp`: When the guess was made

### Local Development

To develop locally:
```bash
npm install
npm run dev
```

The app will use local storage. To test with Amplify locally, you'd need to set up AWS credentials and run `npx ampx sandbox`.

### Cost

AWS Amplify offers a generous free tier:
- 1,000 build minutes/month
- 15 GB storage
- 15 GB served/month
- DynamoDB free tier: 25 GB storage, 25 read/write capacity units

For a small gender reveal party, this should be completely free!
