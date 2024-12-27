Article.searchWithPagination = async function (query, limit, offset) {
  return this.findAndCountAll({
    where: Sequelize.literal(`to_tsvector('english', title || ' ' || content) @@ plainto_tsquery(:query)`),
    replacements: { query },
    limit, // Nombre d'éléments par page
    offset, // Décalage pour la pagination
  });
};
