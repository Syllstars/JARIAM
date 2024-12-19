// server.js
const express = require('express');
const app = express();

const errorHandler = require('./src/middleware/errorHandler');
const hasRole = require('./src/middleware/hasRole');

const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

const authRoutes = require('./src/routes/auth');     // Chargement des routes définies dans src/routes/auth
const userRoutes = require('./src/routes/users');     // Chargement des routes définies dans src/routes/users
const homeRoutes = require('./src/routes/home');      // Chargement des routes définies dans scr/routes/home

// Base de données (Sequelize)
const sequelize = require('./src/db_setup');  // Ajouter l'importation de la configuration Sequelize

// Middleware pour gérer les requêtes JSON
app.use(express.json());

// Middleware de gestion des erreurs
app.use(errorHandler);

// Utilisation des routes définies dans src/routes/
app.use('', homeRoutes);                    // Toutes les routes API commenceront par '/api/home'
app.use('/api/auth', authRoutes);                    // Toutes les routes API commenceront par '/api/auth'
app.use('/api/users', userRoutes);                    // Toutes les routes API commenceront par '/api/users'

// Test de la connexion à la base de données avant de démarrer le serveur
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    // Démarrer le serveur seulement après une connexion réussie à la base de données
    if (process.env.NODE_ENV !== 'test') {
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    }
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = app;                       // Pour tester facilement l'app avec des tests unitaires
