const { DataTypes } = require("sequelize");
const sequelize = require("../db_setup");

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM("not started", "in progress", "completed", "on hold"),
    allowNull: false,
    defaultValue: "not started"
  },
  priority: {
    type: DataTypes.ENUM("low", "medium", "high"),
    allowNull: false,
    defaultValue: "medium"
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "projects",
      key: "id"
    }
  },
  assigned_to: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "users",
      key: "id"
    }
  }
}, {
  timestamps: true,
  tableName: "tasks"
});

module.exports = Task;
