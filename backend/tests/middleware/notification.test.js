const express = require('express');
const request = require('supertest');

const notificationService = require('../../src/middleware/notification');

jest.mock('../../src/services/notificationService'); // Mock du service

describe('Middleware Notifications', () => {
    const app = express();

    app.use((req, res, next) => {
        // Mock d'un utilisateur authentifié
        req.user = { id: 1, name: 'John Doe' };
        next();
    });

    app.post('/test', notificationService.sendNotification({
        type: 'info',
        message: 'Test notification',
    }), (req, res) => {
        res.status(200).send('Notification envoyée.');
    });

    it('devrait envoyer une notification avec succès', async () => {
        notificationService.send.mockResolvedValue(); // Simule un succès

        const response = await request(app).post('/test');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Notification envoyée.');
        expect(notificationService.send).toHaveBeenCalledWith({
            userId: 1,
            type: 'info',
            message: 'Test notification',
            data: undefined,
        });
    });

    it('devrait retourner une erreur si l\'utilisateur n\'est pas authentifié', async () => {
        app.use((req, res, next) => {
            req.user = null; // Simule un utilisateur non authentifié
            next();
        });

        const response = await request(app).post('/test');
        expect(response.status).toBe(500); // Erreur interne
        expect(notificationService.send).not.toHaveBeenCalled();
    });
});
