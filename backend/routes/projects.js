// src/routes/projects.js

const express = require('express');
const router = express.Router();
const projectService = require('../services/projectService');

const { auth } = require('../middleware/authentification');
const { asyncWrapper } = require('../middleware/errors');


// Route pour récupérer tous les projets
router.get('/', asyncWrapper(async (req, res) => {
  const projects = await projectService.getProjects();
  res.status(200).json(projects);
}));


// Route pour récupérer les projets assignés à l'utilisateur connecté
router.get('/user-projects', auth, asyncWrapper(async (req, res) => {
  try {
    const userId = req.user.id; // Récupérer l'ID de l'utilisateur connecté (via le token JWT)
    const projects = await projectService.getProjectsByUser(userId); // Récupération des projet lié à l'ID de l'utilisateur

    res.status(200).json(projects);
  } catch (error) {
    console.error("Erreur lors de la récupération des projets :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
}));

// Route pour récupérer tous les utilisateurs assignés aux projets d'un utilisateur donné
router.get('/user-projects/:userId/users', auth, asyncWrapper(async (req, res) => {
  try {
    const userId = req.params.userId;

    // Récupérer les projets liés à cet utilisateur
    const projects = await projectService.getProjectsByUser(userId);

    if (!projects.length) {
      return res.status(404).json({ message: "Aucun projet trouvé pour cet utilisateur." });
    }

    // Récupérer les utilisateurs pour chaque projet
    const projectsWithUsers = await Promise.all(projects.map(async (project) => {
      const users = await projectService.getUsersByProject(project.id); // Obtenir les users d'un projet
      return {
        projectId: project.id,
        projectName: project.name,
        users
      };
    }));

    res.status(200).json(projectsWithUsers);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs des projets :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
}));



// Route pour créer un nouveau projet (accessible uniquement par un administrateur)
router.post('/new', asyncWrapper(async (req, res) => {
  const { name, description, startDate, endDate, managerId } = req.body;

  if (!name || !description || !startDate || !endDate || !managerId) {
    return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis" });
  }
  const newProject = await projectService.createProject(req.body);
  res.status(201).json(newProject);
}));

// Route pour mettre à jour un projet existant (accessible uniquement par un administrateur)
router.put('/:id', asyncWrapper(async (req, res) => {
  const updatedProject = await projectService.updateProject(req.params.id, req.body);
  if (!updatedProject) {
    console.log(`Projet non trouvé pour mise à jour: ID ${req.params.id}`); // 🔥 Debug
    return res.status(404).json({ message: 'Project not found to update' });
  }
  res.status(200).json(updatedProject);
}));

// Route pour supprimer un projet (accessible uniquement par un administrateur)
router.delete('/:id', asyncWrapper(async (req, res) => {
  const deletedProject = await projectService.deleteProject(req.params.id);
  if (!deletedProject) {
    console.log(`Projet non trouvé pour suppression: ID ${req.params.id}`); // 🔥 Debug
    return res.status(404).json({ message: 'Project not found to delete' });
  }
  res.status(200).json({ message: 'Project deleted successfully' });
}));

// Route pour récupérer un projet spécifique par son ID
router.get('/:id', asyncWrapper(async (req, res) => {
  const project = await projectService.getProjectById(req.params.id);
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }
  res.status(200).json(project);
}));


module.exports = router;
