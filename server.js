// server.js
const express = require('express');
const app = express();

const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const { errorHandler, notFoundHandler, validationErrorHandler } = require('./src/backend/middleware/errors');

const port = process.env.PORT || 3000;

const cors = require('cors');
const rateLimit = require('express-rate-limit');

// Importation des routes
const authRoutes = require('./src/backend/routes/auth');
const userRoutes = require('./src/backend/routes/users');
const homeRoutes = require('./src/backend/routes/projects');
const notificationRoutes = require('./src/backend/routes/notifications');

// Base de données (Sequelize)
const sequelize = require('./src/backend/db_setup');

// --- Middleware de configuration ---

// Parser le JSON
app.use(express.json());

// Middleware CORS
app.use(cors({ origin: 'http://localhost' }));

// Middleware de rate limiting (placé avant les routes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,                  // Limiter chaque IP à 100 requêtes par fenêtre
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use(limiter);

// --- Configuration du logger avec Morgan ---

// Vérifier/créer le dossier de logs
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Logger sur la console en mode 'dev'
app.use(morgan('dev'));

// Logger dans le fichier 'access.log' en mode 'combined'
const logStream = fs.createWriteStream(path.join(logsDir, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: logStream }));

// --- Déclaration des routes ---

app.use('', authRoutes);    // Remarquez le slash initial corrigé
app.use('/api/home', homeRoutes);
app.use('/api/users', userRoutes);
app.use('/notifications', notificationRoutes);

// --- Middleware de gestion des erreurs ---

// Pour les erreurs de validation
app.use(validationErrorHandler);

// Pour les routes non trouvées
app.use(notFoundHandler);

// Middleware global pour gérer les erreurs
app.use(errorHandler);

// --- Connexion à la base de données et démarrage du serveur ---
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
