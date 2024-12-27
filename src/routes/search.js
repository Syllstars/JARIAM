const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.get("/", async (req, res) => {
  const { query, page = 1, size = 10 } = req.query;
  const limit = parseInt(size, 10);
  const offset = (parseInt(page, 10) - 1) * limit;

  try {
    const { count, rows } = await Article.searchWithPagination(query, limit, offset);
    res.status(200).json({
      totalResults: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page, 10),
      results: rows,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la recherche", error });
  }
});

module.exports = router;
