const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db_setup');  // Ce fichier établit la connexion à la base de données

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
    },
    twoFactorSecret: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize,  // Associe le modèle à la base de données
    modelName: 'User',  // Nom du modèle
    tableName: 'users',  // Nom de la table dans la base de données
});

module.exports = User;
