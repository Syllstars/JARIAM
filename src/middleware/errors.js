// Gestionnaire d'erreurs pour les exceptions non capturées
const errorHandler = (err, req, res, next) => {
  console.error(`[Erreur] ${err.message}`);

  // Structure de réponse standardisée pour les erreurs
  res.status(err.status || 500).json({
    success: false,
    error: {
      message: err.message || 'Erreur interne du serveur.',
      code: err.code || 'INTERNAL_SERVER_ERROR',
      details: err.details || null,
    },
  });
};

// Middleware pour gérer les routes non trouvées
const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: {
      message: 'Ressource non trouvée.',
      code: 'NOT_FOUND',
    },
  });
};

// Fonction utilitaire pour générer des erreurs personnalisées
class CustomError extends Error {
  constructor(message, status = 500, code = 'CUSTOM_ERROR', details = null) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

// Middleware pour capturer les erreurs de validation
const validationErrorHandler = (err, req, res, next) => {
  if (err.name == 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Erreur de validation des données.',
        code: 'VALIDATION_ERROR',
        details: err.errors || null,
      },
    });
  }
  next(err); // Si ce n'est pas une erreur de validation, passer au prochain middleware
};

// Middleware pour simplifier la gestion des erreurs dans les routes asynchrones
const asyncWrapper = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};


module.exports = {
  errorHandler,
  notFoundHandler,
  CustomError,
  validationErrorHandler,
  asyncWrapper,
};
