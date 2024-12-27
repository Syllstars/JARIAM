const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.post("/tenants", async (req, res) => {
  const { name } = req.body;

  try {
    const tenant = await Tenant.create({ name });
    res.status(201).json(tenant);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du tenant", error });
  }
});

module.exports = router;
