// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/auth');     // Chargement des routes définies dans src/routes/auth
const userRoutes = require('./src/routes/users');     // Chargement des routes définies dans src/routes/users
const homeRoutes = require('./src/routes/home');      // Chargement des routes définies dans scr/routes/home

// Middleware pour gérer les requêtes JSON
app.use(express.json());

// Utilisation des routes définies dans src/routes/
app.use('', homeRoutes);                    // Toutes les routes API commenceront par '/api/home'
app.use('/api/auth', authRoutes);                    // Toutes les routes API commenceront par '/api/auth'
app.use('/api/users', userRoutes);                    // Toutes les routes API commenceront par '/api/users'

// Démarrage du serveur seulement si ce n'est pas en mode test
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;                       // Pour tester facilement l'app avec des tests unitaires
