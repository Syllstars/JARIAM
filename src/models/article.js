const sequelize = require('../db_setup');  // Assure-toi de bien faire référence à ton fichier de config

const User = require('./user');  // Exemple de modèle

Article.searchWithFilters = async function (query, filters) {
  const conditions = [
    Sequelize.literal(`to_tsvector('english', title || ' ' || content) @@ plainto_tsquery(:query)`),
  ];

  if (filters.author) {
    conditions.push({ author: filters.author });
  }
  if (filters.startDate && filters.endDate) {
    conditions.push({
      createdAt: {
        [Sequelize.Op.between]: [new Date(filters.startDate), new Date(filters.endDate)],
      },
    });
  }

  return this.findAll({
    where: { [Sequelize.Op.and]: conditions },
    replacements: { query },
  });
};
