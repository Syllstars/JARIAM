const Joi = require('joi');

// Middleware pour valider les données de requêtes
const validateData = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: 'Données invalides',
        details: error.details.map((detail) => detail.message),
      });
    }

    req.validateData = value;
    next();
  };
};

// Middleware pour formater les réponses
const formatResponse = (req, res, next) => {
  const originalSend = res.send;

  res.send = function (body) {
    const formatteBody = {
      status: res.statusCode,
      success: res.statusCode <= 200 && res.statusCode < 300,
      data: body,
    };
    originalSend.call(this, formatteBody);
  };

  next();
};

// Middleware pour filtrer les données en focntion des autorisations
const filterDataByPermissions = (permissionField) => {
  return (req, res, next) => {
    const userPermission = req.user?.permissions || [];
    const data = req.data;

    if(!data || !Array.isArray(data)) {
      return res.status(500).json({ error: 'Aucune données à filtrer.' });
    }

    req.filteredData = data.filter((item) =>
      userPermission.includes(item[permissionsField]));

    next();
  };
};

// Schéma de validation pour la création d'un utilisateur
const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid('admin', 'user', 'manager').default('user'),
});

// Schéma de validation pour la mise à jour d'un utilisateur
const userUpdateSchema = Joi.object({
  username: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(8).optional(),
  role: Joi.string().valid('admin', 'user', 'manager').optional(),
});

// Fonction de validation pour un nouvel utilisateur
const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation des données utilisateur échouée.',
        details: error.details.map((detail) => detail.message),
      },
    });
  }
  next();
};

// Fonction de validation pour la mise à jour d'un utilisateur
const validateUserUpdate = (req, res, next) => {
  const { error } = userUpdateSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation des données utilisateur échouée.',
        details: error.details.map((detail) => detail.message),
      },
    });
  }
  next();
};

module.exports = {
  validateData,
  formatResponse,
  filterDataByPermissions,
  validateUser,
  validateUserUpdate,
};
