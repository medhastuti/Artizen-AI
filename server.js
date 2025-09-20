require('dotenv').config();
const express = require('express');
const cors = require('cors');

const generateArtistBio = require('./api/generate-artist-bio');
const generateSocialPost = require('./api/generate-social-post');

const app = express();
const port = process.env.PORT || 5001;
const API_KEY = process.env.OPENAI_API_KEY;

// Debug logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    message: 'Server is working',
    apiKeySet: !!process.env.OPENAI_API_KEY
  });
});

// Mount the API routes
app.post('/api/generate-artist-bio', generateArtistBio);
app.post('/api/generate-social-post', generateSocialPost);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
