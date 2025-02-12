const { DataTypes } = require('sequelize');
const sequelize = require('../db_setup');
const Project = require('./project');
const Skill = require('./skill');

const A_besoin = sequelize.define('A_besoin', {
    id_projects: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Project,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    id_skill: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Skill,
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
}, {
    tableName: 'A_besoin',
    timestamps: false
});

// Associations many-to-many déjà définies
Project.belongsToMany(Skill, { through: A_besoin, foreignKey: 'id_projects' });
Skill.belongsToMany(Project, { through: A_besoin, foreignKey: 'id_skill' });

// Définition explicite pour pouvoir inclure via un alias
A_besoin.belongsTo(Skill, { foreignKey: 'id_skill', as: 'skill' });
A_besoin.belongsTo(Project, { foreignKey: 'id_projects', as: 'project' });

module.exports = A_besoin;
