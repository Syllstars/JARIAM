// Importation des dépendances
const { Op } = require("sequelize");
const Project = require("../models/project");
const User = require("../models/user");
const Travaille_sur = require('../models/Travaille_sur');
const LogService = require("./logService");

class ProjectService {
    /**
     * Crée un nouveau projet.
     * @param {Object} projectData - Données du projet.
     * @returns {Promise<Object>} - Projet créé.
     */
    static async createProject(projectData) {
        try {
            const project = await Project.create(projectData);
            LogService.info(`Projet créé avec succès : ${project.name}`);
            return project.toJSON();
        } catch (error) {
            LogService.error("Erreur lors de la création du projet", error);
            throw error;
        }
    }

    /**
     * Récupère tous les projets liés à un utilisateur donné.
     * @param {number} userId - ID de l'utilisateur.
     * @returns {Promise<Array<Object>>} - Liste des projets associés à l'utilisateur.
     */
    static async getProjectsByUser(userId) {
        try {
            // requète SQL pour PostgreSQL
            const projects_relation = await Travaille_sur.findAll({
                where: {
                    ID_Users: userId
                },
            });
         
            const projectIds = projects_relation.map(relation => relation.Id_projects);
            const projects = await Project.findAll({
                where: {
                    id: {
                        [Op.in]: projectIds
                    }
                },
            });

            return projects.map(p => p.toJSON());
        } catch (error) {
            LogService.error("Erreur lors de la récupération des projets de l'utilisateur", error);
            throw error;
        }
    }

    /**
     * Récupère tous les utilisateurs assignés à un projet donné.
     * @param {number} projectId - ID du projet.
     * @returns {Promise<Array<Object>>} - Liste des utilisateurs associés à ce projet.
     */
    static async getUsersByProject(projectId) {
        try {
            const users_relation = await Travaille_sur.findAll({
                where: { Id_projects: projectId },
            });

            const userIds = users_relation.map(relation => relation.ID_Users);
            const users = await User.findAll({
                where: { id: { [Op.in]: userIds } },
                attributes: ["id", "username", "email", "role"],
            });

            return users.map(user => user.toJSON());
        } catch (error) {
            LogService.error("Erreur lors de la récupération des utilisateurs du projet", error);
            throw error;
        }
    }


    /**
     * Met à jour un projet existant.
     * @param {number} projectId - ID du projet à mettre à jour.
     * @param {Object} updateData - Données à mettre à jour.
     * @returns {Promise<Object>} - Projet mis à jour.
     */
    static async updateProject(projectId, updateData) {
        try {
            const project = await Project.findOne({ where: { id: projectId } });
            if (!project) throw new Error("Projet introuvable");
            
            await project.update(updateData);
            LogService.info(`Projet mis à jour : ${project.name}`);
            return project.toJSON();
        } catch (error) {
            LogService.error("Erreur lors de la mise à jour du projet", error);
            throw error;
        }
    }

    /**
     * Supprime un projet.
     * @param {number} projectId - ID du projet à supprimer.
     */
    static async deleteProject(projectId) {
        try {
            const project = await Project.findOne({ where: { id: projectId } });
            if (!project) throw new Error("Projet introuvable");
            
            await project.destroy();
            LogService.info(`Projet supprimé : ${project.name}`);
        } catch (error) {
            LogService.error("Erreur lors de la suppression du projet", error);
            throw error;
        }
    }

    /**
     * Récupère un projet spécifique par son ID.
     * @param {number} projectId - ID du projet.
     * @returns {Promise<Object|null>} - Projet trouvé ou `null` si inexistant.
     */
    static async getProjectById(projectId) {
        try {
            const project = await Project.findOne({ where: { id: projectId } });
            if (!project) LogService.warn(`Projet non trouvé (ID: ${projectId})`);
            else LogService.info(`Projet récupéré avec succès (ID: ${projectId})`);
            return project ? project.toJSON() : null;
        } catch (error) {
            LogService.error(`Erreur lors de la récupération du projet ID: ${projectId}`, error);
            throw error;
        }
    }

    /**
     * Récupère tous les projets.
     * @returns {Promise<Array<Object>>} - Liste des projets.
     */
    static async getProjects() {
        try {
            const projects = await Project.findAll();
            LogService.info("Liste des projets récupérée avec succès");
            return projects.map(p => p.toJSON());
        } catch (error) {
            LogService.error("Erreur lors de la récupération de tous les projets", error);
            throw error;
        }
    }
}

module.exports = ProjectService;
