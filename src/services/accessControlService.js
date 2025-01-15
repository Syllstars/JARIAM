// Importations nécessaires
const { ForbiddenError } = require('../utils/errors');
const logger = require('../middleware/logging');
const { User, Role } = require('../models');

// Service Access Control
const AccessControlService = {
  /**
   * Vérifie si un utilisateur possède un rôle spécifique
   * @param {Object} user - L'objet utilisateur
   * @param {string} requiredRole - Le rôle requis (ex: "admin", "manager")
   */
  hasRole: async (user, requiredRole) => {
    if (!user || !user.role) {
      throw new ForbiddenError('Accès refusé : utilisateur non authentifié ou rôle non défini.');
    }

    if (user.role !== requiredRole) {
      throw new ForbiddenError(`Accès refusé : rôle ${requiredRole} requis.`);
    }

    logger.info(`AccessControlService: L'utilisateur ${user.username} possède le rôle requis (${requiredRole}).`);
    return true;
  },

  /**
   * Vérifie si un utilisateur a une permission spécifique
   * @param {Object} user - L'objet utilisateur
   * @param {string} permission - La permission requise (ex: "create_project", "view_stock")
   */
  hasPermission: async (user, permission) => {
    if (!user || !user.permissions) {
      throw new ForbiddenError('Accès refusé : utilisateur non authentifié ou permissions non définies.');
    }

    if (!user.permissions.includes(permission)) {
      throw new ForbiddenError(`Accès refusé : permission ${permission} requise.`);
    }

    logger.info(`AccessControlService: L'utilisateur ${user.username} dispose de la permission (${permission}).`);
    return true;
  },

  /**
   * Ajoute une permission à un rôle
   * @param {string} roleName - Le nom du rôle
   * @param {string} permission - La permission à ajouter
   */
  addPermissionToRole: async (roleName, permission) => {
    const role = await Role.findOne({ where: { name: roleName } });
    if (!role) {
      throw new Error(`Rôle ${roleName} introuvable.`);
    }

    role.permissions = [...new Set([...role.permissions, permission])];
    await role.save();

    logger.info(`AccessControlService: Permission ${permission} ajoutée au rôle ${roleName}.`);
  },

  /**
   * Supprime une permission d'un rôle
   * @param {string} roleName - Le nom du rôle
   * @param {string} permission - La permission à supprimer
   */
  removePermissionFromRole: async (roleName, permission) => {
    const role = await Role.findOne({ where: { name: roleName } });
    if (!role) {
      throw new Error(`Rôle ${roleName} introuvable.`);
    }

    role.permissions = role.permissions.filter((perm) => perm !== permission);
    await role.save();

    logger.info(`AccessControlService: Permission ${permission} supprimée du rôle ${roleName}.`);
  },

  /**
   * Génère un audit des accès pour un utilisateur
   * @param {Object} user - L'objet utilisateur
   * @param {string} action - L'action réalisée par l'utilisateur
   */
  logAccess: async (user, action) => {
    if (!user) {
      throw new Error('Impossible de journaliser un accès pour un utilisateur non authentifié.');
    }

    logger.info(`AccessControlService: ${user.username} a effectué l'action suivante : ${action}.`);
  },
};

module.exports = AccessControlService;
