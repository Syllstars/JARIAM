// Importation des dépendances
const nodemailer = require('nodemailer');
const LogService = require('./logService');

// Configuration du transport pour les emails
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.example.com',
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_SECURE === 'true', // true pour 465, false pour d'autres ports
  auth: {
    user: process.env.EMAIL_USER || 'jariam@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'jariam',
  },
});

// Vérifie la configuration du transport au démarrage
transporter.verify((error, success) => {
  if (error) {
    LogService.error('Erreur lors de la vérification du transporteur email', error);
  } else {
    LogService.info('Transporteur email configuré avec succès');
  }
});

// Service de notifications
const NotificationService = {
  /**
   * Envoie un email à un ou plusieurs destinataires.
   * @param {string} to - Destinataires (séparés par des virgules si plusieurs).
   * @param {string} subject - Sujet de l'email.
   * @param {string} text - Contenu texte brut de l'email.
   * @param {string} [html] - Contenu HTML de l'email (facultatif).
   * @returns {Promise<void>}
   */
  sendEmail: async (to, subject, text, html = null) => {
    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM || '"JARIAM App" <no-reply@example.com>',
        to,
        subject,
        text,
        html,
      };

      await transporter.sendMail(mailOptions);
      LogService.info(`Email envoyé à : ${to}`);
    } catch (error) {
      LogService.error(`Erreur lors de l'envoi de l'email à ${to}`, error);
      throw new Error('Échec de l\'envoi de l\'email');
    }
  },

  /**
   * Envoie une notification (peut être étendu pour d'autres canaux).
   * @param {Object} options - Options de notification.
   * @param {string} options.channel - Canal de notification (e.g., 'email', 'sms').
   * @param {Object} options.payload - Charge utile pour le canal.
   * @returns {Promise<void>}
   */
  sendNotification: async (options) => {
    const { channel, payload } = options;

    try {
      switch (channel) {
        case 'email':
          await NotificationService.sendEmail(
            payload.to,
            payload.subject,
            payload.text,
            payload.html
          );
          break;

        // Ajout de futurs canaux, comme SMS ou push notifications
        case 'sms':
          // Implémenter l'envoi de SMS ici
          LogService.info('Envoi de SMS non encore implémenté');
          break;

        default:
          LogService.warn(`Canal de notification non pris en charge : ${channel}`);
          throw new Error('Canal de notification non supporté');
      }
    } catch (error) {
      LogService.error('Erreur lors de l\'envoi de la notification', error);
      throw error;
    }
  },
};

module.exports = NotificationService;
