const { DataTypes } = require("sequelize");
const sequelize = require("../db_setup");
const bcrypt = require("bcryptjs");

const User = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
      validate: { isEmail: true },
    },
    hashed_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("Admin", "Manager", "Employee"),
      defaultValue: "Employee",
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false, // On gère `created_at` et `updated_at` manuellement
    tableName: "users",
  }
);

// 🔒 Hachage du mot de passe avant d'enregistrer un utilisateur
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.hashed_password = await bcrypt.hash(user.hashed_password, salt);
});

module.exports = User;
