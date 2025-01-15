// Importation des dépendances
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const LogService = require('./logService');
const { UnauthorizedError, ForbiddenError } = require('../middleware/errors');

const SecurityService = {
  /**
   * Génère un hachage sécurisé pour un mot de passe.
   * @param {string} password - Mot de passe brut.
   * @returns {Promise<string>} - Mot de passe haché.
   */
  hashPassword: async (password) => {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      LogService.error('Erreur lors du hachage du mot de passe', error);
      throw new Error('Échec du hachage du mot de passe');
    }
  },

  /**
   * Vérifie si un mot de passe correspond à son hachage.
   * @param {string} password - Mot de passe brut.
   * @param {string} hash - Hachage du mot de passe.
   * @returns {Promise<boolean>} - True si le mot de passe correspond, sinon False.
   */
  verifyPassword: async (password, hash) => {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      LogService.error('Erreur lors de la vérification du mot de passe', error);
      throw new Error('Échec de la vérification du mot de passe');
    }
  },

  /**
   * Génère un jeton JWT pour un utilisateur.
   * @param {Object} payload - Données de l'utilisateur.
   * @param {string} secret - Clé secrète pour signer le jeton.
   * @param {Object} [options] - Options JWT.
   * @returns {string} - Jeton signé.
   */
  generateToken: (payload, secret, options = { expiresIn: '1h' }) => {
    try {
      return jwt.sign(payload, secret, options);
    } catch (error) {
      LogService.error('Erreur lors de la génération du jeton JWT', error);
      throw new Error('Échec de la génération du jeton');
    }
  },

  /**
   * Vérifie un jeton JWT et extrait les données utilisateur.
   * @param {string} token - Jeton JWT.
   * @param {string} secret - Clé secrète utilisée pour signer le jeton.
   * @returns {Object} - Données extraites du jeton.
   */
  verifyToken: (token, secret) => {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      LogService.error('Jeton JWT invalide ou expiré', error);
      throw new UnauthorizedError('Jeton invalide ou expiré');
    }
  },

  /**
   * Vérifie si un utilisateur dispose d'une autorisation spécifique.
   * @param {Object} user - Données de l'utilisateur.
   * @param {string} requiredRole - Rôle requis pour accéder à une ressource.
   * @returns {boolean} - True si l'utilisateur a l'autorisation, sinon False.
   */
  hasPermission: (user, requiredRole) => {
    try {
      if (!user || !user.roles || !user.roles.includes(requiredRole)) {
        throw new ForbiddenError('Accès refusé : autorisation insuffisante');
      }
      return true;
    } catch (error) {
      LogService.error('Erreur de vérification des permissions', error);
      throw error;
    }
  },

  /**
   * Met à jour le mot de passe d'un utilisateur.
   * @param {number} userId - ID de l'utilisateur.
   * @param {string} newPassword - Nouveau mot de passe brut.
   * @returns {Promise<void>}
   */
  updatePassword: async (userId, newPassword) => {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('Utilisateur introuvable');
      }

      const hashedPassword = await SecurityService.hashPassword(newPassword);
      await user.update({ password: hashedPassword });
      LogService.info(`Mot de passe mis à jour pour l'utilisateur : ${user.email}`);
    } catch (error) {
      LogService.error('Erreur lors de la mise à jour du mot de passe', error);
      throw new Error('Échec de la mise à jour du mot de passe');
    }
  },

  /**
   * Révoque un jeton JWT (implémentation à étendre si nécessaire).
   * @param {string} token - Jeton JWT à révoquer.
   * @returns {void}
   */
  revokeToken: (token) => {
    // Implémentation à étendre selon la méthode de révocation choisie (ex. blacklist).
    LogService.info('Révocation du jeton JWT non implémentée');
    throw new Error('Révocation de jeton non implémentée');
  },

  /**
   * Récupère l'utilisateur associé à un jeton JWT.
   * @param {string} token - Jeton JWT.
   * @param {string} secret - Clé secrète utilisée pour signer le jeton.
   * @returns {Promise<Object>} - Utilisateur correspondant au jeton.
   */
  getUserFromToken: async (token, secret) => {
    try {
      const decoded = SecurityService.verifyToken(token, secret);
      const user = await User.findByPk(decoded.id);
      if (!user) {
        throw new UnauthorizedError('Utilisateur introuvable');
      }
      return user;
    } catch (error) {
      LogService.error('Erreur lors de la récupération de l\'utilisateur à partir du jeton', error);
      throw error;
    }
  },
};

module.exports = SecurityService;
