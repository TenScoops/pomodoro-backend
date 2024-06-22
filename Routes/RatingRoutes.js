const express = require('express');
const router = express.Router();
const Rating = require('../Models/Rating');

router.post('/ratings', (req, res) => {
  Rating.create(req.body, (err, results) => {
    if (err) {
      res.status(500).send("Failed to add rating.");
    } else {
      res.status(200).json({ message: "Rating added successfully!", data: results });
    }
  });
});

module.exports = router;
