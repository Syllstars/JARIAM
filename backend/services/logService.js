// Importation des dépendances
const winston = require('winston');
const path = require('path');

// Configuration de Winston pour les logs
const logDirectory = path.join(__dirname, '../../logs');
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`)
);

// Création des transports
const transports = [
  new winston.transports.Console({
    level: 'info',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`)
    ),
  }),
  new winston.transports.File({
    filename: path.join(logDirectory, 'combined.log'),
    level: 'info',
    format: logFormat,
  }),
  new winston.transports.File({
    filename: path.join(logDirectory, 'errors.log'),
    level: 'error',
    format: logFormat,
  }),
];

// Création de l'instance de logger
const logger = winston.createLogger({
  level: 'info',
  format: logFormat,
  transports,
});

// Vérifie si le dossier des logs existe, sinon le crée
const fs = require('fs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

// Exposition des fonctions de journalisation
const LogService = {
  /**
   * Enregistre un message d'information
   * @param {string} message - Le message à enregistrer
   */
  info: (message) => {
    logger.info(message);
  },

  /**
   * Enregistre un message d'avertissement
   * @param {string} message - Le message à enregistrer
   */
  warn: (message) => {
    logger.warn(message);
  },

  /**
   * Enregistre un message d'erreur
   * @param {string} message - Le message à enregistrer
   * @param {Error} [error] - Facultatif : l'erreur associée
   */
  error: (message, error) => {
    if (error) {
      logger.error(`${message} - ${error.stack}`);
    } else {
      logger.error(message);
    }
  },

  /**
   * Enregistre un message de débogage
   * @param {string} message - Le message à enregistrer
   */
  debug: (message) => {
    logger.debug(message);
  },
};

module.exports = LogService;
