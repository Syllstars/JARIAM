const express = require('express');
const request = require('supertest');
const { isAuthenticated, hasRole, hasPermission } = require('../middleware/security');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');  // Mock de JWT

describe('Middleware Security', () => {
    const app = express();

    app.use(express.json());
    app.use((req, res, next) => {
        req.user = { id: 1, role: 'admin', permissions: ['canCreateArticle'] }; // Simuler un utilisateur authentifié
        next();
    });

    app.post('/test',
        isAuthenticated,
        hasRole(['admin']),
        hasPermission('canCreateArticle'),
        (req, res) => {
            res.status(200).json({ message: 'Accès autorisé' });
        });

    it('devrait permettre l\'accès à un utilisateur authentifié avec le bon rôle et la bonne permission', async () => {
        const response = await request(app).post('/test');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Accès autorisé');
    });

    it('devrait rejeter l\'accès si l\'utilisateur n\'est pas authentifié', async () => {
        app.use((req, res, next) => {
            req.user = null; // Simuler un utilisateur non authentifié
            next();
        });

        const response = await request(app).post('/test');
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Accès non autorisé, token manquant');
    });

    it('devrait rejeter l\'accès si l\'utilisateur n\'a pas le rôle nécessaire', async () => {
        app.use((req, res, next) => {
            req.user = { id: 1, role: 'user' }; // Simuler un utilisateur sans rôle 'admin'
            next();
        });

        const response = await request(app).post('/test');
        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Accès interdit, rôle insuffisant');
    });

    it('devrait rejeter l\'accès si l\'utilisateur n\'a pas la permission', async () => {
        app.use((req, res, next) => {
            req.user = { id: 1, role: 'admin', permissions: [] }; // Simuler un utilisateur sans permission 'canCreateArticle'
            next();
        });

        const response = await request(app).post('/test');
        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Accès refusé');
    });
});
