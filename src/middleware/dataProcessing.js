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

module.exports = {
  validateData,
  formatResponse,
  filterDataByPermissions,
};
