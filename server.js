// server.js
const express = require('express');
const app = express();

const { errorHandler, notFoundHandler, validationErrorHandler } = require('./src/middleware/errors');

const port = process.env.PORT || 3000;

const cors = require('cors');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./src/routes/auth');     // Chargement des routes définies dans src/routes/auth
const userRoutes = require('./src/routes/users');    // Chargement des routes définies dans src/routes/users
const homeRoutes = require('./src/routes/projects');     // Chargement des routes définies dans scr/routes/home

const notificationRoutes = require("./src/routes/notifications");

// Base de données (Sequelize)
const sequelize = require('./src/db_setup');  // Ajouter l'importation de la configuration Sequelize

// Middleware pour gérer les requêtes JSON
app.use(express.json());

// Middleware CORS
app.use(cors({ origin: 'http://localhost' }));

// Middleware pour les erreurs de validation
app.use(validationErrorHandler);

// Middleware pour les routes non trouvées
app.use(notFoundHandler);

// Middleware global pour gérer les erreurs
app.use(errorHandler);

// Middleware pour les notifications
app.use("/notifications", notificationRoutes);


// Utilisation des routes définies dans src/routes/
app.use('', homeRoutes);                             // Toutes les routes API commenceront par '/api/home'
app.use('/api/auth', authRoutes);                    // Toutes les routes API commenceront par '/api/auth'
app.use('/api/users', userRoutes);                   // Toutes les routes API commenceront par '/api/users'

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,                  // Limiter chaque IP à 100 requètes par fenètres
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

app.use(limiter)

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
