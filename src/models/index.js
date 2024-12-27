const sequelize = require('../db_setup');  // Assure-toi de bien faire référence à ton fichier de config

const User = require('./user');  // Exemple de modèle

sequelize.sync()  // Synchroniser les modèles avec la base de données
    .then(() => console.log('Database sync completed!'))
    .catch(err => console.error('Error syncing database:', err));

module.exports = {
    User,
    // Exporter d'autres modèles si tu en as
};
