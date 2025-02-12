// Importation des dépendances
const User = require('../models/user');
const Resource = require('../models/resource');
const Project= require('../models/project');
const sequelize = require("../db_setup");
const LogService = require('./logService');

const ResourceService = {
  /**
   * Ajoute une ressource au système.
   * @param {Object} resourceData - Données de la ressource à ajouter.
   * @returns {Promise<Object>} - Ressource ajoutée.
   */
  addResource: async (resourceData) => {
    const transaction = await sequelize.transaction();
    try {
      const resource = await User.create(resourceData, { transaction });
      await transaction.commit();
      LogService.info(`Ressource ajoutée avec succès : ${resource.name}`);
      return resource;
    } catch (error) {
      await transaction.rollback();
      LogService.error('Erreur lors de l\'ajout de la ressource', error);
      throw new Error('Échec de l\'ajout de la ressource');
    }
  },

  /**
   * Met à jour les informations d'une ressource.
   * @param {number} resourceId - ID de la ressource à mettre à jour.
   * @param {Object} updateData - Données à mettre à jour.
   * @returns {Promise<Object>} - Ressource mise à jour.
   */
  updateResource: async (resourceId, updateData) => {
    try {
      const resource = await User.findByPk(resourceId);
      if (!resource) {
        throw new Error('Ressource introuvable');
      }

      await resource.update(updateData);
      LogService.info(`Ressource mise à jour : ${resource.name}`);
      return resource;
    } catch (error) {
      LogService.error('Erreur lors de la mise à jour de la ressource', error);
      throw new Error('Échec de la mise à jour de la ressource');
    }
  },

  /**
   * Supprime une ressource du système.
   * @param {number} resourceId - ID de la ressource à supprimer.
   * @returns {Promise<void>}
   */
  deleteResource: async (resourceId) => {
    const transaction = await sequelize.transaction();
    try {
      const resource = await User.findByPk(resourceId);
      if (!resource) {
        throw new Error('Ressource introuvable');
      }

      await resource.destroy({ transaction });
      await transaction.commit();
      LogService.info(`Ressource supprimée : ${resource.name}`);
    } catch (error) {
      await transaction.rollback();
      LogService.error('Erreur lors de la suppression de la ressource', error);
      throw new Error('Échec de la suppression de la ressource');
    }
  },

  /**
   * Marque une ressource comme disponible ou indisponible.
   * @param {number} resourceId - ID de la ressource à mettre à jour.
   * @param {boolean} availability - Disponibilité de la ressource.
   * @returns {Promise<Object>} - Ressource mise à jour.
   */
  toggleAvailability: async (resourceId, availability) => {
    try {
      const resource = await User.findByPk(resourceId);
      if (!resource) {
        throw new Error('Ressource introuvable');
      }

      await resource.update({ availability });
      LogService.info(
        `Disponibilité de la ressource mise à jour : ${resource.name}, disponible : ${availability}`
      );
      return resource;
    } catch (error) {
      LogService.error('Erreur lors de la mise à jour de la disponibilité', error);
      throw new Error('Échec de la mise à jour de la disponibilité');
    }
  },

  /**
   * Récupère toutes les ressources.
   * @returns {Promise<Array<Object>>} - Liste des ressources.
   */
  getAllResources: async () => {
    try {
      const resources = await User.findAll();
      LogService.info('Liste des ressources récupérée avec succès');
      return resources;
    } catch (error) {
      LogService.error('Erreur lors de la récupération des ressources', error);
      throw new Error('Échec de la récupération des ressources');
    }
  },

  /**
   * Récupère toutes les ressources associées à un projet spécifique.
   * @param {number} projectId - ID du projet.
   * @returns {Promise<Array<Object>>} - Liste des ressources associées.
   */
  getResourcesByProject: async (projectId) => {
    try {
      const project = await Project.findByPk(projectId, {
        include: [{ model: User, as: 'resources' }],
      });

      if (!project) {
        throw new Error('Projet introuvable');
      }

      LogService.info(`Ressources récupérées pour le projet : ${project.name}`);
      return project.resources;
    } catch (error) {
      LogService.error('Erreur lors de la récupération des ressources du projet', error);
      throw new Error('Échec de la récupération des ressources du projet');
    }
  },

  /**
   * Vérifie si une ressource possède une compétence spécifique.
   * @param {number} resourceId - ID de la ressource.
   * @param {string} skill - Compétence à vérifier.
   * @returns {Promise<boolean>} - True si la compétence est présente, sinon False.
   */
  hasSkill: async (resourceId, skill) => {
    try {
      const resource = await User.findByPk(resourceId);
      if (!resource) {
        throw new Error('Ressource introuvable');
      }

      const hasSkill = resource.skills.includes(skill);
      LogService.info(
        `Compétence ${skill} vérifiée pour la ressource : ${resource.name}, résultat : ${hasSkill}`
      );
      return hasSkill;
    } catch (error) {
      LogService.error('Erreur lors de la vérification de la compétence', error);
      throw new Error('Échec de la vérification de la compétence');
    }
  },
};

module.exports = ResourceService;
