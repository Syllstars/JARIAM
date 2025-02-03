const request = require('supertest');
const express = require('express');
const { requestLogger, errorLogger } = require('../../src/middleware/logging');

const app = express();

app.use(requestLogger);

app.get('/error', (req, res, next) => {
    const error = new Error('Test error');
    next(error);
});

app.use(errorLogger);

describe('Middleware Logging', () => {
    it('devrait logguer une requête entrante', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(404); // Route inexistante
    });

    it('devrait logguer une erreur', async () => {
        const res = await request(app).get('/error');
        expect(res.status).toBe(500);
    });
});
