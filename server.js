// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const authRoutes  = require('./src/routes/auth');     // Chargement des routes définies dans src/routes/auth

// Middleware pour gérer les requêtes JSON
app.use(express.json());

// Utilisation des routes définies dans src/routes/
app.use('/api/auth', authRoutes);                    // Toutes les routes API commenceront par '/api'

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;                       // Pour tester facilement l'app avec des tests unitaires
