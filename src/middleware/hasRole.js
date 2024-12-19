const hasRole = (requiredRole) => {
  return (req, res, next) => {
    // Vérifie si req.user existe et contient un rôle
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: `Forbidden: No role assigned to user` });
    }

    // Compare le rôle de l'utilisateur avec le rôle requis
    if (req.user.role != requiredRole) {
      return res.status(403).json({ message: `Forbidden: Insufficient permission` });
    }

    // Autorisation validée, passe à la suite
    next();
  };
};

module.exports = hasRole;
