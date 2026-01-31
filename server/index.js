import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'leaderboard.json');
const DIST_DIR = path.join(__dirname, '..', 'dist');

app.use(cors());
app.use(express.json());

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.dirname(DATA_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Read leaderboard data
async function readLeaderboard() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    return [];
  }
}

// Write leaderboard data
async function writeLeaderboard(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// GET all guesses
app.get('/api/guesses', async (req, res) => {
  try {
    const guesses = await readLeaderboard();
    res.json(guesses);
  } catch (error) {
    console.error('Error reading leaderboard:', error);
    res.status(500).json({ error: 'Failed to read leaderboard' });
  }
});

// POST new guess
app.post('/api/guesses', async (req, res) => {
  try {
    const { name, twin1, twin2, timestamp } = req.body;
    
    if (!name || !twin1 || !twin2 || !timestamp) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const guesses = await readLeaderboard();
    const newGuess = {
      id: Date.now().toString(),
      name,
      twin1,
      twin2,
      timestamp
    };
    
    guesses.push(newGuess);
    await writeLeaderboard(guesses);
    
    res.status(201).json(newGuess);
  } catch (error) {
    console.error('Error adding guess:', error);
    res.status(500).json({ error: 'Failed to add guess' });
  }
});

// Serve static files from dist folder (after API routes)
app.use(express.static(DIST_DIR));

// Serve index.html for all other routes (SPA support)
app.get('*', (req, res) => {
  const indexPath = path.join(DIST_DIR, 'index.html');
  console.log('Serving SPA route:', req.path);
  console.log('Index path:', indexPath);
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(500).send('Frontend not built. Run: npm run build');
    }
  });
});

// Initialize and start server
async function start() {
  await ensureDataDir();
  
  // Check if dist directory exists
  try {
    await fs.access(DIST_DIR);
    console.log('✅ Dist directory found:', DIST_DIR);
    const files = await fs.readdir(DIST_DIR);
    console.log('📁 Dist contents:', files);
  } catch (error) {
    console.error('❌ Dist directory not found! Run: npm run build');
  }
  
  app.listen(PORT, () => {
    console.log(`🚀 Leaderboard API server running on http://localhost:${PORT}`);
  });
}

start();
