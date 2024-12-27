// src/middleware/errorHandler.js
const winston = require('winston');

const errorHandler = (err, req, res, next) => {
    // Log the error stack for debugging purposes
    winston.error(err.stack);

    if (err.isJoi) { // If it's a validation error
        return res.status(400).json({ message: err.details[0].message });
    }

    // Handle different error types
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
    }

    if (err.name === 'NotFoundError') {
        return res.status(404).json({ message: 'Resource not found' });
    }

    // For database-related errors (e.g., Sequelize validation errors)
    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({ message: 'Invalid data' });
    }

    if (err.name === 'SequelizeDatabaseError') {
        return res.status(500).json({ message: 'Database error'});
    }

    // Generic error handler (Internal Server Error)
    return res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = errorHandler;
