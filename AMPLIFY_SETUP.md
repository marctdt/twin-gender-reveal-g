# Twin Gender Reveal - Amplify Setup Guide

## AWS Amplify Configuration

This app now supports AWS Amplify Data (DynamoDB) for a global leaderboard that persists across all users.

### Deployment Steps

1. **Push to GitHub** (already done)
   
2. **Connect to AWS Amplify**
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
   - Click "New app" → "Host web app"
   - Connect your GitHub repository
   - Select the `main` branch

3. **Configure Build Settings**
   - Amplify will automatically detect the `amplify.yml` file
   - The backend (database) will be deployed automatically
   - Environment variables will be auto-configured

4. **Deploy**
   - Click "Save and deploy"
   - Wait for the build to complete (~5-10 minutes)
   - Your app will have a global leaderboard powered by DynamoDB!

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
