const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Middleware d'authentification
const auth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    console.log("❌ Aucun token fourni !");
    return res.status(401).json({ error: "Accès refusé. Aucun token fourni." });
  }

  try {
    // Extraction du token (en enlevant "Bearer ")
    const token = authHeader.replace("Bearer ", "").trim();

    // Vérification du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Vérification que l'utilisateur existe en base de données
    const user = await User.findByPk(decoded.id);
    if (!user) {
      console.log("❌ Utilisateur introuvable en base :", decoded.id);
      return res.status(401).json({ error: "Utilisateur non authentifié." });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error("❌ Erreur de vérification du token :", err);
    return res.status(403).json({ error: "Token invalide ou expiré." });
  }
};


// Middleware de gestion des rôles
const hasRole = (requireRole) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Utilisateur non authentifié." });
      }

      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé." });
      }

      // Vérifier le rôle de l'utilisateur
      if (user.role !== requireRole) {
        return res.status(403).json({ error: "Accès interdit. Rôle insuffisant." });
      }

      next();
    } catch (err) {
      console.error("Erreur lors de la vérification du rôle:", err);
      res.status(500).json({ error: "Erreur interne du serveur." });
    }
  };
};

module.exports = {
  auth,
  hasRole,
};

