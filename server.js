const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.get('/api/places', async (req, res) => {
  try {
    const { query } = req.query;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    // Make a request to the Google Maps Places API using the apiKey
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json`, {
      params: {
        query,
        key: apiKey
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
