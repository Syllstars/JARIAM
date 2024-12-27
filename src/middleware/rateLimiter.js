const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limite de tentatives
  message: "Trop de tentatives de connexion. Réessayez plus tard.",
});

module.exports = loginLimiter;
