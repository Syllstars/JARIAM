const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Middleware d'authentification
const auth = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) { 
    return res.status(401).jon({ error: 'Accès Refusé. Aucun token fourni.'}); 
  }

  try {
    // Décoder le token
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.user = decoded; // Ajouter les information utilisateur au req
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token invalide ou expiré.' });
  }
};

// Middleware de gestion des rôles
const hasRole = (requireRole) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Utilisateur non authentifié.' });
      }
      
      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé.' });
      }

      // Vérifier le rôle de l'utilisateur
      if (user.role !== requireRole) {
        return res.status(403).json({ error: 'Accès interdit. Rôle insuffisant.' });
      }

      next();
    } catch (err) {
      console.error('Erreur lors de la vérification du rôle:', err);
      res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
  };
};

module.exports = {
  auth,
  hasRole,
};
    
