const winston = require('winston');

// Configuration de Winston pour les logs
const logger = winston.createLogger({
  level: 'info',                       // Niveau par défaut
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${messsage}`;
    })
  ),
  transports: [
    new winston.transports.Console({ level: 'info' }),                               // Logs sur la console
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),     // Logs des erreurs
    new winston.transports.File({ filename: 'logs/combined.log' }),                  // Tous les Logs
  ],
});

// Middleware pour logguer les requêtes entrantes
const requestLogger = (req, res, next) => {
  logger.info(`Requête ${req.method} sur ${req.originalUrl}`);
  next();
};

// Middleware pour logguer les erreurs
const errorLogger = (err, req, res, next) => {
  logger.error(`Erreur sur ${req.method} ${req.originalUrl}: ${err.message}`);
  next(err); // Passe l'erreur au gestionnaire suivant
};

// Utilitaire pour logger des messages personnalisés
const log = (level, message) => {
  logger.log({ level, message });
};

module.exports = {
  requestLogger,
  errorLogger,
  log,
  logger,
};
