// src/routes/projects.js

const express = require('express');
const router = express.Router();
const { getProjects, getProjectById, createProject, updateProject, deleteProject } = require('../services/projectService');

const { auth } = require('../middleware/authentification');
const { asyncWrapper } = require('../middleware/errors');


// Route pour récupérer tous les projets
router.get('/', asyncWrapper(async (req, res) => {
  const projects = await getProjects();
  res.status(200).json(projects);
}));

// Route pour récupérer un projet spécifique par son ID
router.get('/:id', asyncWrapper(async (req, res) => {
  const project = await getProjectById(req.params.id);
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }
  res.status(200).json(project);
}));

// Route pour récupérer les projets assignés à l'utilisateur connecté
router.get('/user-projects', asyncWrapper(async (req, res) => {
  console.log("Middleware d'auth exécuté. Utilisateur :", req.user);
  try {
    const userId = req.user.id; // Récupérer l'ID de l'utilisateur connecté (via le token JWT)

    const projects = await getProjectsByUser(userId); // Utilisation d'un service pour récupérer les projets liés à l'utilisateur

    res.status(200).json(projects);
  } catch (error) {
    console.error("Erreur lors de la récupération des projets :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
}));


// Route pour créer un nouveau projet (accessible uniquement par un administrateur)
router.post('/new', asyncWrapper(async (req, res) => {
  const { name, description, startDate, endDate, managerId } = req.body;

  if (!name || !description || !startDate || !endDate || !managerId) {
    return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis" });
  }
  const newProject = await createProject(req.body);
  res.status(201).json(newProject);
}));

// Route pour mettre à jour un projet existant (accessible uniquement par un administrateur)
router.put('/:id', asyncWrapper(async (req, res) => {
  const updatedProject = await updateProject(req.params.id, req.body);
  if (!updatedProject) {
    console.log(`Projet non trouvé pour mise à jour: ID ${req.params.id}`); // 🔥 Debug
    return res.status(404).json({ message: 'Project not found to update' });
  }
  res.status(200).json(updatedProject);
}));

// Route pour supprimer un projet (accessible uniquement par un administrateur)
router.delete('/:id', asyncWrapper(async (req, res) => {
  const deletedProject = await deleteProject(req.params.id);
  if (!deletedProject) {
    console.log(`Projet non trouvé pour suppression: ID ${req.params.id}`); // 🔥 Debug
    return res.status(404).json({ message: 'Project not found to delete' });
  }
  res.status(200).json({ message: 'Project deleted successfully' });
}));

module.exports = router;
