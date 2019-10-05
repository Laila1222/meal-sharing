const express = require ('express');
const router = express.Router ();
const bodyParser = require ('body-parser');
const path = require ('path');

// Serve an image from assets folder
router.get ('/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const buildPath = path.join (__dirname, `../../../assets/${imageName}.jpg`);
  res.sendFile (buildPath);
});

module.exports = router;
