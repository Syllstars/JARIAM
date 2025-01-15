// Importation des dépendances
const sequelize = require('sequelize');
const Project = require('../models/project');
const User = require('../models/user');
const Resource = require('../models/Resource');
const LogService = require('./logService');

const ProjectService = {
  /**
   * Crée un nouveau projet.
   * @param {Object} projectData - Données du projet.
   * @returns {Promise<Object>} - Projet créé.
   */
  createProject: async (projectData) => {
    const transaction = await sequelize.transaction();
    try {
      const project = await Project.create(projectData, { transaction });
      await transaction.commit();
      LogService.info(`Projet créé avec succès : ${project.name}`);
      return project;
    } catch (error) {
      await transaction.rollback();
      LogService.error('Erreur lors de la création du projet', error);
      throw new Error('Échec de la création du projet');
    }
  },

  /**
   * Met à jour un projet existant.
   * @param {number} projectId - ID du projet à mettre à jour.
   * @param {Object} updateData - Données à mettre à jour.
   * @returns {Promise<Object>} - Projet mis à jour.
   */
  updateProject: async (projectId, updateData) => {
    try {
      const project = await Project.findByPk(projectId);
      if (!project) {
        throw new Error('Projet introuvable');
      }

      await project.update(updateData);
      LogService.info(`Projet mis à jour : ${project.name}`);
      return project;
    } catch (error) {
      LogService.error('Erreur lors de la mise à jour du projet', error);
      throw new Error('Échec de la mise à jour du projet');
    }
  },

  /**
   * Supprime un projet.
   * @param {number} projectId - ID du projet à supprimer.
   * @returns {Promise<void>}
   */
  deleteProject: async (projectId) => {
    const transaction = await sequelize.transaction();
    try {
      const project = await Project.findByPk(projectId);
      if (!project) {
        throw new Error('Projet introuvable');
      }

      await project.destroy({ transaction });
      await transaction.commit();
      LogService.info(`Projet supprimé : ${project.name}`);
    } catch (error) {
      await transaction.rollback();
      LogService.error('Erreur lors de la suppression du projet', error);
      throw new Error('Échec de la suppression du projet');
    }
  },

  /**
   * Associe automatiquement des ressources humaines à un projet.
   * @param {number} projectId - ID du projet.
   * @param {Array<Object>} requiredSkills - Liste des compétences requises.
   * @returns {Promise<Array<Object>>} - Liste des ressources assignées.
   */
  assignResources: async (projectId, requiredSkills) => {
    const transaction = await sequelize.transaction();
    try {
      const project = await Project.findByPk(projectId);
      if (!project) {
        throw new Error('Projet introuvable');
      }

      const assignedResources = [];
      for (const skill of requiredSkills) {
        const resource = await User.findOne({
          where: { skill: skill.name, availability: true },
          transaction,
        });

        if (resource) {
          await Resource.create(
            { projectId: project.id, userId: resource.id },
            { transaction }
          );
          assignedResources.push(resource);
          await resource.update({ availability: false }, { transaction });
        }
      }

      await transaction.commit();
      LogService.info(`Ressources assignées au projet : ${project.name}`);
      return assignedResources;
    } catch (error) {
      await transaction.rollback();
      LogService.error('Erreur lors de l\'attribution des ressources', error);
      throw new Error('Échec de l\'attribution des ressources');
    }
  },

  /**
   * Récupère tous les projets avec leurs ressources associées.
   * @returns {Promise<Array<Object>>} - Liste des projets avec leurs ressources.
   */
  getAllProjects: async () => {
    try {
      const projects = await Project.findAll({
        include: [{ model: User, as: 'resources' }],
      });
      LogService.info('Liste des projets récupérée avec succès');
      return projects;
    } catch (error) {
      LogService.error('Erreur lors de la récupération des projets', error);
      throw new Error('Échec de la récupération des projets');
    }
  },
};

module.exports = ProjectService;
