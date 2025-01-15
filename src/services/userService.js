// Importation des dépendances
const { User } = require('../models');
const SecurityService = require('./securityService');
const LogService = require('./logService');
const { NotFoundError, ValidationError } = require('../middleware/errors');

const UserService = {
  /**
   * Crée un nouvel utilisateur.
   * @param {Object} userData - Données de l'utilisateur (email, mot de passe, rôles, etc.).
   * @returns {Promise<Object>} - Utilisateur créé.
   */
  createUser: async (userData) => {
    try {
      const { email, password, roles } = userData;

      // Vérification des données
      if (!email || !password) {
        throw new ValidationError('Email et mot de passe requis');
      }

      // Vérifie si l'email est déjà utilisé
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new ValidationError('Email déjà utilisé');
      }

      // Hachage du mot de passe
      const hashedPassword = await SecurityService.hashPassword(password);

      // Création de l'utilisateur
      const newUser = await User.create({
        email,
        password: hashedPassword,
        roles: roles || ['user'], // Rôle par défaut : 'user'
      });

      LogService.info(`Utilisateur créé : ${newUser.email}`);
      return newUser;
    } catch (error) {
      LogService.error('Erreur lors de la création de l\'utilisateur', error);
      throw error;
    }
  },

  /**
   * Récupère un utilisateur par son ID.
   * @param {number} userId - ID de l'utilisateur.
   * @returns {Promise<Object>} - Utilisateur correspondant.
   */
  getUserById: async (userId) => {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new NotFoundError('Utilisateur introuvable');
      }
      return user;
    } catch (error) {
      LogService.error(`Erreur lors de la récupération de l'utilisateur avec l'ID ${userId}`, error);
      throw error;
    }
  },

  /**
   * Récupère tous les utilisateurs.
   * @returns {Promise<Array>} - Liste des utilisateurs.
   */
  getAllUsers: async () => {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      LogService.error('Erreur lors de la récupération des utilisateurs', error);
      throw error;
    }
  },

  /**
   * Met à jour les informations d'un utilisateur.
   * @param {number} userId - ID de l'utilisateur.
   * @param {Object} updates - Données à mettre à jour.
   * @returns {Promise<Object>} - Utilisateur mis à jour.
   */
  updateUser: async (userId, updates) => {
    try {
      const user = await UserService.getUserById(userId);

      // Mise à jour des données
      if (updates.password) {
        updates.password = await SecurityService.hashPassword(updates.password);
      }
      await user.update(updates);

      LogService.info(`Utilisateur mis à jour : ${user.email}`);
      return user;
    } catch (error) {
      LogService.error(`Erreur lors de la mise à jour de l'utilisateur avec l'ID ${userId}`, error);
      throw error;
    }
  },

  /**
   * Supprime un utilisateur par son ID.
   * @param {number} userId - ID de l'utilisateur.
   * @returns {Promise<void>}
   */
  deleteUser: async (userId) => {
    try {
      const user = await UserService.getUserById(userId);
      await user.destroy();

      LogService.info(`Utilisateur supprimé : ${user.email}`);
    } catch (error) {
      LogService.error(`Erreur lors de la suppression de l'utilisateur avec l'ID ${userId}`, error);
      throw error;
    }
  },

  /**
   * Authentifie un utilisateur avec son email et mot de passe.
   * @param {string} email - Email de l'utilisateur.
   * @param {string} password - Mot de passe de l'utilisateur.
   * @returns {Promise<Object>} - Jeton d'authentification ou erreur.
   */
  authenticateUser: async (email, password) => {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new NotFoundError('Utilisateur introuvable');
      }

      const isPasswordValid = await SecurityService.verifyPassword(password, user.password);
      if (!isPasswordValid) {
        throw new ValidationError('Mot de passe incorrect');
      }

      const token = SecurityService.generateToken(
        { id: user.id, email: user.email, roles: user.roles },
        process.env.JWT_SECRET
      );

      LogService.info(`Authentification réussie pour l'utilisateur : ${user.email}`);
      return { token, user };
    } catch (error) {
      LogService.error('Erreur lors de l\'authentification de l\'utilisateur', error);
      throw error;
    }
  },

  /**
   * Réinitialise le mot de passe d'un utilisateur.
   * @param {string} email - Email de l'utilisateur.
   * @param {string} newPassword - Nouveau mot de passe.
   * @returns {Promise<void>}
   */
  resetPassword: async (email, newPassword) => {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new NotFoundError('Utilisateur introuvable');
      }

      const hashedPassword = await SecurityService.hashPassword(newPassword);
      await user.update({ password: hashedPassword });

      LogService.info(`Mot de passe réinitialisé pour l'utilisateur : ${user.email}`);
    } catch (error) {
      LogService.error(`Erreur lors de la réinitialisation du mot de passe pour l'utilisateur : ${email}`, error);
      throw error;
    }
  },
};

module.exports = UserService;
