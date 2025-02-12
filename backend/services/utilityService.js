// Importation des dépendances
const { Op } = require('sequelize');
const moment = require('moment');

// Service utilitaire
const UtilityService = {
  /**
   * Valide si une valeur est présente et non vide.
   * @param {any} value - La valeur à vérifier.
   * @returns {boolean} - Retourne true si la valeur est valide.
   */
  validateRequiredField: (value) => {
    return value !== undefined && value !== null && value !== '';
  },

  /**
   * Vérifie si une chaîne est un email valide.
   * @param {string} email - L'email à valider.
   * @returns {boolean} - Retourne true si l'email est valide.
   */
  validateEmail: (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  },

  /**
   * Génère un identifiant unique basé sur un timestamp.
   * @returns {string} - Un identifiant unique.
   */
  generateUniqueId: () => {
    return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  },

  /**
   * Formate une date au format 'YYYY-MM-DD'.
   * @param {Date|string} date - La date à formater.
   * @returns {string} - La date formatée.
   */
  formatDate: (date) => {
    return moment(date).format('YYYY-MM-DD');
  },

  /**
   * Vérifie si une date donnée est dans le futur.
   * @param {Date|string} date - La date à vérifier.
   * @returns {boolean} - Retourne true si la date est dans le futur.
   */
  isDateInFuture: (date) => {
    return moment(date).isAfter(moment());
  },

  /**
   * Vérifie si une date donnée est dans le passé.
   * @param {Date|string} date - La date à vérifier.
   * @returns {boolean} - Retourne true si la date est dans le passé.
   */
  isDateInPast: (date) => {
    return moment(date).isBefore(moment());
  },

  /**
   * Convertit une date au format ISO vers un format lisible.
   * @param {Date|string} date - La date à convertir.
   * @returns {string} - La date au format lisible.
   */
  convertDateToReadableFormat: (date) => {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  },

  /**
   * Transforme un tableau d'objets en une chaîne de valeurs séparées par des virgules (pour SQL, par exemple).
   * @param {Array<Object>} array - Le tableau d'objets à transformer.
   * @param {string} key - La clé de l'objet à utiliser pour récupérer les valeurs.
   * @returns {string} - La chaîne de valeurs séparées par des virgules.
   */
  arrayToCsvString: (array, key) => {
    return array.map(item => item[key]).join(',');
  },

  /**
   * Filtre les objets d'un tableau selon un critère donné.
   * @param {Array<Object>} array - Le tableau d'objets à filtrer.
   * @param {string} key - La clé de l'objet sur laquelle appliquer le filtre.
   * @param {any} value - La valeur à rechercher pour la clé spécifiée.
   * @returns {Array<Object>} - Le tableau filtré.
   */
  filterArrayByKey: (array, key, value) => {
    return array.filter(item => item[key] === value);
  },

  /**
   * Vérifie si une chaîne de texte contient un mot spécifique, sans tenir compte de la casse.
   * @param {string} text - Le texte à vérifier.
   * @param {string} word - Le mot à rechercher.
   * @returns {boolean} - Retourne true si le mot est trouvé dans le texte.
   */
  containsWord: (text, word) => {
    return text.toLowerCase().includes(word.toLowerCase());
  },

  /**
   * Gère les recherches avec des opérateurs Sequelize.
   * @param {string} query - La chaîne de recherche.
   * @param {Array<string>} fields - Les champs à rechercher.
   * @returns {Object} - L'objet avec les conditions de recherche pour Sequelize.
   */
  buildSearchConditions: (query, fields) => {
    const conditions = {};

    if (query && fields.length > 0) {
      const queryConditions = fields.map(field => ({
        [field]: { [Op.like]: `%${query}%` },
      }));
      conditions[Op.or] = queryConditions;
    }

    return conditions;
  },

  /**
   * Vérifie si une ressource est en stock (par exemple, pour les articles en gestion des stocks).
   * @param {number} stockQuantity - Quantité en stock.
   * @returns {boolean} - Retourne true si la ressource est disponible en stock.
   */
  isResourceInStock: (stockQuantity) => {
    return stockQuantity > 0;
  },
};

module.exports = UtilityService;
