const express = require("express");
const router = express.Router();
const Task = require("../models/tasks");
const { auth, hasRole } = require("../middleware/authentification");
const { asyncWrapper } = require("../middleware/errors");

// 📌 Récupérer toutes les tâches
router.get("/", auth, asyncWrapper(async (req, res) => {
  const tasks = await Task.findAll();
  res.status(200).json(tasks);
}));

// 📌 Récupérer toutes les tâches assignées à un utilisateur spécifique (Nouvelle route)
router.get("/user/:user_id", auth, asyncWrapper(async (req, res) => {
    const tasks = await Task.findAll({ where: { assigned_to: req.params.user_id } });
    
    if (!tasks.length) {
      return res.status(404).json({ message: "Aucune tâche trouvée pour cet utilisateur." });
    }
  
    res.status(200).json(tasks);
}));

// 📌 Récupérer les tâches d'un projet spécifique
router.get("/project/:project_id", auth, asyncWrapper(async (req, res) => {
  const tasks = await Task.findAll({ where: { project_id: req.params.project_id } });
  res.status(200).json(tasks);
}));

// 📌 Créer une nouvelle tâche (Accès réservé aux admins et managers)
router.post("/", auth, hasRole(["Admin", "Manager"]), asyncWrapper(async (req, res) => {
  const { title, description, status, priority, due_date, project_id, assigned_to } = req.body;
  const newTask = await Task.create({ title, description, status, priority, due_date, project_id, assigned_to });
  res.status(201).json(newTask);
}));

// 📌 Mettre à jour une tâche
router.put("/:id", auth, hasRole(["Admin", "Manager"]), asyncWrapper(async (req, res) => {
  const { title, description, status, priority, due_date, assigned_to } = req.body;
  const task = await Task.findByPk(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.title = title || task.title;
  task.description = description || task.description;
  task.status = status || task.status;
  task.priority = priority || task.priority;
  task.due_date = due_date || task.due_date;
  task.assigned_to = assigned_to || task.assigned_to;
  
  await task.save();
  res.status(200).json(task);
}));

// 📌 Supprimer une tâche
router.delete("/:id", auth, hasRole("Admin"), asyncWrapper(async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  await task.destroy();
  res.status(200).json({ message: "Task deleted successfully" });
}));

// 📌 Récupérer une tâche par ID
router.get("/:id", auth, asyncWrapper(async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
}));
  
  

module.exports = router;
