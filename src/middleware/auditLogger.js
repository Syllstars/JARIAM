const fs = require("fs");
const path = require("path");

module.exports = (req, res, next) => {
  const logFile = path.join(__dirname, "../../logs/audit.log");
  const logData = `${new Date().toISOString()} - User: ${
    req.user ? req.user.id : "Anonymous"
  } - Action: ${req.method} ${req.originalUrl}\n`;

  fs.appendFileSync(logFile, logData);
  next();
};
