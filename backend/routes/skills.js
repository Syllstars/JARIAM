const express = require('express');
const router = express.Router();
const Skill = require('../models/skill'); // Assurez-vous que Skill est bien défini dans vos modèles Sequelize
const { auth, hasRole } = require('../middleware/authentification');
const { asyncWrapper } = require('../middleware/errors');
const Travaille_sur = require('../models/Travaille_sur');
const a_besoin = require('../models/A_besoin');
const project = require('../models/project');
const users = require('../models/user');

// 📌 Route pour récupérer toutes les compétences
router.get('/', auth, asyncWrapper(async (req, res) => {
    const skills = await Skill.findAll();
    res.status(200).json(skills);
}));

// 📌 Route pour créer une nouvelle compétence (Accès réservé aux admins)
router.post('/', auth, hasRole('Admin'), asyncWrapper(async (req, res) => {
    const { name } = req.body;

    // Vérifier si la compétence existe déjà
    const existingSkill = await Skill.findOne({ where: { name } });
    if (existingSkill) {
        return res.status(400).json({ message: 'Skill already exists' });
    }

    // Création de la nouvelle compétence
    const newSkill = await Skill.create({ name });
    res.status(201).json(newSkill);
}));

// 📌 Route pour récupérer les compétences d'un utilisateur triées par projet
router.get('/user/:id', auth, asyncWrapper(async (req, res) => {
    const userId = req.params.id;

    try {
        // Vérifier si l'utilisateur existe
        const userExists = await users.findByPk(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        // Récupérer les projets auxquels l'utilisateur participe
        const userProjects = await Travaille_sur.findAll({
            where: { ID_Users: userId }, // Correspondance avec la structure réelle
            attributes: [['Id_projects', 'Id_projects']],
        });

        if (!userProjects.length) {
            return res.status(404).json({ message: 'Aucun projet trouvé pour cet utilisateur.' });
        }

        // Extraire la liste des identifiants de projets
        const projectIds = userProjects.map(up => up.Id_projects);

        // Récupérer les compétences liées aux projets
        const skillsByProject = await a_besoin.findAll({
            where: { id_projects: projectIds },
            include: [
                {
                    model: Skill, // Respect du nom réel de la table
                    as: 'skill', // Vérifier cet alias dans Sequelize
                    attributes: ['id', 'name', 'description', 'level', 'type'],
                },
                {
                    model: project,
                    as: 'project', // Vérifier cet alias dans Sequelize
                    attributes: ['id', 'name'],
                }
            ]
        });

        if (!skillsByProject.length) {
            return res.status(404).json({ message: 'Aucune compétence trouvée pour les projets de cet utilisateur.' });
        }

        // Avec les ID des compétences retourner les datas des skills
        let result = skillsByProject.map(item => [item.dataValues.id_projects, item.dataValues.id_skill]);

        // Extraction des ID des compétences
        const skillIds = skillsByProject.map(item => item.dataValues.id_skill);

        // Recherche des compétences associées aux ID extraits
        const skillsData = await Skill.findAll({
            where: { id: skillIds }
        });

        // Transformation des résultats pour remplacer les ID par les objets de compétences
        result = result.map(([id_projects, id_skill]) => {
            const skill = skillsData.find(skill => skill.id === id_skill);
            return [id_projects, skill]; // Remplace l'ID skill par l'objet skill complet
        });

        // Structurer les données sous forme d'objet { project_name: [skills] }
        const groupedSkills = {};

        // Modifier la boucle pour utiliser les nouvelles données
        result.forEach(([id_projects, skill]) => {
            const projectName = id_projects; // Nom temporaire (remplace-le par le vrai nom du projet si disponible)

            if (!groupedSkills[projectName]) {
                groupedSkills[projectName] = [];
            }

            groupedSkills[projectName].push({
                id: skill.dataValues.id,
                name: skill.dataValues.name,
                description: skill.dataValues.description,
                level: skill.dataValues.level,
                type: skill.dataValues.type,
                is_active: skill.dataValues.is_active
            });
        });

        // Envoyer la réponse JSON
        res.status(200).json(groupedSkills);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
}));



// 📌 Route pour mettre à jour une compétence (Accès réservé aux admins)
router.put('/:id', auth, hasRole('Admin'), asyncWrapper(async (req, res) => {
    const { name } = req.body;
    const skill = await Skill.findByPk(req.params.id);

    if (!skill) {
        return res.status(404).json({ message: 'Skill not found' });
    }

    // Mise à jour de la compétence
    skill.name = name || skill.name;
    await skill.save();
    res.status(200).json(skill);
}));

// 📌 Route pour supprimer une compétence (Accès réservé aux admins)
router.delete('/:id', auth, hasRole('Admin'), asyncWrapper(async (req, res) => {
    const skill = await Skill.findByPk(req.params.id);

    if (!skill) {
        return res.status(404).json({ message: 'Skill not found' });
    }

    await skill.destroy();
    res.status(200).json({ message: 'Skill deleted successfully' });
}));

// 📌 Route pour récupérer une compétence spécifique par ID
router.get('/:id', auth, asyncWrapper(async (req, res) => {
    const skill = await Skill.findByPk(req.params.id);
    if (!skill) {
        return res.status(404).json({ message: 'Skill not found' });
    }
    res.status(200).json(skill);
}));

module.exports = router;
