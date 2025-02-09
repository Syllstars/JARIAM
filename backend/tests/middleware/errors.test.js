const request = require('supertest');
const express = require('express');
const { errorHandler, notFoundHandler } = require('../../src/middleware/errors');

const app = express();

// Exemple de route avec une erreur
app.get('/error', (req, res, next) => {
    const error = new Error('Test error');
    error.status = 500;
    next(error);
});

app.use(notFoundHandler);
app.use(errorHandler);

describe('Middleware Errors', () => {
    it('devrait retourner une erreur 500', async () => {
        const res = await request(app).get('/error');
        expect(res.status).toBe(500);
        expect(res.body.error.message).toBe('Test error');
    });

    it('devrait retourner une erreur 404 pour les routes inexistantes', async () => {
        const res = await request(app).get('/not-found');
        expect(res.status).toBe(404);
        expect(res.body.error.message).toBe('Ressource non trouvée.');
    });
});
