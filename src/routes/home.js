const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');

// Ajout d'une route pour tester la racine /
router.get('/', (req, res) => {
  res.status(200).send('API is running'); // Message simple pour vérifier
});

module.exports = router;
