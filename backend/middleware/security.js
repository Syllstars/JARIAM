const jwt = require('jsonwebtoken');
const User = require('../models/user');   // Modèle de l'utilisateur pour a vérification des rôles

/**
  * Middleware pour vérifier si un utilisateur est authentifié.
  */
const isAuthenticated = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];   // Extraire le token depuis l'en-tête Authorization

  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé, token manquant' });
  }

  // Vérification de la validité du token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide ou expiré' });
    }

    req.user = decoded;  // Ajout des informations utilisateur dans la requête
    next();
  });
};

/**
  * Middleware pour vérifier si l'utilisateur a un rôle spécifique.
  * @param {Array} allowedRoles - Liste des rôles autorisés à accéder à la route
  */
const hasRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Accès interdit, rôle insuffisant' });
    }
    next();
  };
};

/**
  * Middleware pour vérifier si un utilisateur possède une permission
  * @param {String} permission -Permission à vérifier
  */
const hasPermission = (permission) =>{
  return async (req, res, next) => {
    const user = await User.findByPk(req.user.id);  // recherche de l'utilisateur dans la base de données

    if (!user || !user.permissions.includes(permission)) {
      return res.status(403).json({ message: 'Accès interdit, permission insuffisante' });
    }

    next();
  };
};

/**
  * Middleware pour protéger les routes contre les attaques par Cross-Site Scripting (XSS)
  */
const preventXSS = (req, res, next) => {
  const sanitize = require('sanitize-html');  // Utilisation d'une bibliothèque pour assainir les entrées
  const sanitizeOptions = {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'],
    allowedAttributes: { 'a': ['href'] }
  };

  // Assainir le corps de la requête
  req.body = sanitize(req.body, sanitizeOptions);

  // Assainir les paramètres de requête et de route
  for (let key in req.query) {
    req.query[key] = sanitize(req.query[key], sanitizeOptions);
  }

  for (let key in req.params) {
    req.params[key] = sanitize(req.params[key], sanitizeOptions);
  }

  next();
};

/**
  * Middleware pour empêcher les attaques par injection SQL en assainissant les entrées utilisateur.
  */
const preventSQLInjection = (req, res, next) => {
  const sqlInjectionPatterns = [/--/, /\sOR\s/, /\sAND\s/, /\sSELECT\s/, /\sINSERT\s/, /\sDROP\s/];

  // Vérification des entrées dans ke corps de la requête, les paramètres de requête et les paramètres de route
  const checkInput = (input) => {
    return sqlInjectionPatterns.some(pattern => pattern.test(input));
  };

  // Vérification du corps de la requête
  for (let key in req.body) {
    if (checkInput(req.body[key])) {
      return res.status(400).json({ message: `Requête invalide, tentative d'injection SQL détecté` });
    }
  }

  // Vérification des paramètres de requête
 for (let key in req.query) {
    if (checkInput(req.query[key])) {
      return res.status(400).json({ message: `Requête invalide, tentative d'injection SQL détecté` });
    }
 }

  // Vérification des paramètres de requête
  for (let key in req.params) {
    if (checkInput(req.params[key])) {
      return res.status(400).json({ message: `Requête invalide, tentative d'injection SQL détecté` });
    }
  }

  next();
};

module.exports = {
  isAuthenticated,
  hasRole,
  hasPermission,
  preventXSS,
  preventSQLInjection,
};
