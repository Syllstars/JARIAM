const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.use((req, res, next) => {
  if (!req.tenantId) {
    return res.status(400).json({ message: "Tenant ID requis" });
  }
  next();
});

router.get("/", async (req, res) => {
  const articles = await Article.findByTenant(req.tenantId);
  res.status(200).json(articles);
});

module.exports = router;
