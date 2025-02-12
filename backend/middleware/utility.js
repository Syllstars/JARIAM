/**
  * Middleware permettant de vérifier si une valeur est une chaine de caractères non vide
  * @param {String} value - La valeur à vérifier.
  * @return {boolean} - Retourne true si la valeur est une chaine non vide, sinon false
  */
const isNonEmptyString = (value) => {
  return typeof value === 'string' && value.trim().lenght > 0;
};

/**
  * Middleware permettant de valider un email avec une expression régulière simple
  * @param {String} email - l'Email à valider
  * @return {boolean} - Retourne true si l'email est validé, sinon false
  */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailregex.test(email);
};

/**
  * Middleware permettant de générer un identifiant unique
  * Utilise le module 'crypto' pour générer une valeur hexadécimale de 16 octets.
  * @return {string} - Retourne un identifiant unique sous forme de chaîne hexadécimale.
  */
const generateUniqueId = () => {
  const crypto = require('crypto');
  return crypto.randomBytes(16).toString('hex');
};

/**
  * Middleware permettant de formater un message d'erreur personnalisé
  * @param {String} message - Le message d'erreur à formater
  * @param {number} statusCode - le code de status HTTP
  * @return {object} - Retourne un objet contenant le message d'erreur et le code de status.
  */
const formatError = (message, statusCode = 400) => {
  return {
    statusCode,
    message,
    timestamp: new Date().toISOString(),
  };
};

/**
  * Middleware permettant d'ajouter un delai dans une fonction asynchrone
  * Utilise une bibliothèque comme 'sanitize-html' pour nettoyer les chaînes de texte.
  * @param {number} ms - le nombre de millisecondes à attendre
  * @return {Promise} - Retourne une promesse résolue après le délai
  */
const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports = {
  isNonEmptyString,
  isValidEmail,
  generateUniqueId,
  formatError,
  delay,
};
