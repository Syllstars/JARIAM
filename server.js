// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const routes  = require('./src/routes');     // Chargement des routes définies dans src/routes

// Middleware pour gérer les requêtes JSON
app.use(bodyParser.json());

// Utilisation des routes définies dans src/routes/
app.use('/api', routes);                    // Toutes les routes API commenceront par '/api'

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;                       // Pour tester facilement l'app avec des tests unitaires
