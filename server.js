const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const Tesseract = require('tesseract.js');

const app = express();

app.use(cors());
app.use(fileUpload());

app.post('/api/extract-text', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const file = req.files.file;

  Tesseract.recognize(
    file.data,
    'eng',
    {
      logger: (m) => console.log(m),
    }
  )
    .then(({ data: { text } }) => {
      res.json({ text });
    })
    .catch((err) => {
      console.error('Error:', err);
      res.status(500).send('Error processing image.');
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


