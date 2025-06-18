const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Save URLs endpoint
app.post('/api/save-urls', (req, res) => {
  const urls = req.body.urls;
  if (!Array.isArray(urls)) {
    return res.status(400).json({ error: 'URLs must be an array.' });
  }
  fs.writeFile(
    path.join(__dirname, 'urls.json'),
    JSON.stringify(urls, null, 2),
    (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to write URLs.' });
      }
      res.json({ message: 'URLs saved successfully.' });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
