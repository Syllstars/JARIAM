const fs = require("fs");
const path = require("path");

module.exports = (req, res, next) => {
  const logFile = path.join(__dirname, `../../logs/tenant-${req.tenantId}.log`);
  const logData = `${new Date().toISOString()} - ${req.method} ${req.originalUrl}\n`;

  fs.appendFileSync(logFile, logData);
  next();
};
