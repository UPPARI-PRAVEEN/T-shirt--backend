// testRoutes.js

const express = require('express');
const router = express.Router();

// Correct usage of route definition with callback function
router.get('/', (req, res) => {
  res.send('This is the response for the GET request.');
});

module.exports = router;
