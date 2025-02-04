const notificationsService = require('../services/notificationService');

/**
  * Middleware pour envoyer une notification.
  * @param {Object} options - Options pour la notification.
  * @param {String} options.type - Type de la notification (e.g., "Info, "warning", "error").
  * @param {String} options.message - Message de la notification
  * @param {Object} [options.data] - Données supplémentaires à inclure dans la notification
*/
const sendNotification = (options) => {
  return async (req, res, next) => {
    try {
      const { type, message, data } = options;

      // Validation des paramètres
      if (!type || !message) {
        throw new Error('Type et message sont requis pour une notification.');
      }

      // Récupération de l'utilisateur cible
      const userId = req.user?.id; // Supposons que req.user est défini par un middleware d'authentification
      if (!userId) {
        throw new Error('utilisateur non authentifié.');
      }

      // Envoie de la notification via le service
      await notificationService.send({
        userId,
        type,
        message,
        data,
      });
      
      next();
    } catch (err) {
      next(err); // Passe l'erreur au gestionnaire suivant
    }
  };
};

module.exports = {
  sendNotification,
};
