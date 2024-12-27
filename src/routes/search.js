const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.get("/", async (req, res) => {
  const { query, author, startDate, endDate } = req.query;
  const filters = { author, startDate, endDate };

  try {
    const results = await Article.searchWithFilters(query, filters);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la recherche", error });
  }
});


module.exports = router;
