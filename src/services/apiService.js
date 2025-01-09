// Importation des dépendances
const axios = require('axios');
const logger = require('../middleware/logging');
const { API_BASE_URL } = process.env;

// Service API
const apiService = axios.create({
  baseURL: API_BASE_URL || 'http://localhost:3000/api', // Définit la base URL pour les appels API
  timeout: 10000, // Timeout de 10 secondes
  headers: {
    'Content-Type': 'application/json',
  },
});

// Middleware : Gestion des requêtes sortantes
apiService.interceptors.request.use(
  (config) => {
    logger.info(`API Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    logger.error(`Erreur de requête sortante : ${error.message}`);
    return Promise.reject(error);
  }
);

// Middleware : Gestion des réponses entrantes
apiService.interceptors.response.use(
  (response) => {
    logger.info(`API Response: ${response.status} ${response.config.url}`);
    return response.data;
  },
  (error) => {
    const status = error.response ? error.response.status : 'Network Error';
    logger.error(`Erreur de réponse API : ${status} - ${error.message}`);
    return Promise.reject(error);
  }
);

// Fonctionnalités exposées par le service API
const ApiService = {
  /**
   * Effectue une requête GET
   * @param {string} endpoint - L'URL de l'endpoint
   * @param {Object} [params={}] - Les paramètres de requête
   * @returns {Promise<Object>} - Les données de la réponse
   */
  get: async (endpoint, params = {}) => {
    return apiService.get(endpoint, { params });
  },

  /**
   * Effectue une requête POST
   * @param {string} endpoint - L'URL de l'endpoint
   * @param {Object} data - Les données à envoyer dans le corps de la requête
   * @returns {Promise<Object>} - Les données de la réponse
   */
  post: async (endpoint, data) => {
    return apiService.post(endpoint, data);
  },

  /**
   * Effectue une requête PUT
   * @param {string} endpoint - L'URL de l'endpoint
   * @param {Object} data - Les données à envoyer dans le corps de la requête
   * @returns {Promise<Object>} - Les données de la réponse
   */
  put: async (endpoint, data) => {
    return apiService.put(endpoint, data);
  },

  /**
   * Effectue une requête DELETE
   * @param {string} endpoint - L'URL de l'endpoint
   * @param {Object} [params={}] - Les paramètres de requête
   * @returns {Promise<Object>} - Les données de la réponse
   */
  delete: async (endpoint, params = {}) => {
    return apiService.delete(endpoint, { params });
  },
};

module.exports = ApiService;
