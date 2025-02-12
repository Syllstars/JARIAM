const AuditLog = require('../models/auditLog');

/**
 * Récupérer tous les logs d'audit
 */
const getAuditLogs = async () => {
    return await AuditLog.findAll();
};

/**
 * Récupérer un log d'audit spécifique par ID
 */
const getAuditLogById = async (id) => {
    return await AuditLog.findByPk(id);
};

/**
 * Créer un nouveau log d'audit
 */
const createAuditLog = async ({ user_id, action }) => {
    return await AuditLog.create({ user_id, action });
};

module.exports = {
    getAuditLogs,
    getAuditLogById,
    createAuditLog
};
