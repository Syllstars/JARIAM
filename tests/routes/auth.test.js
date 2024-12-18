const request = require('supertest');
const app = require('../../server'); // Assure-toi que 'server.js' exporte l'application Express

describe('POST /api/auth/login', () => {
  it('should return 200 and a JWT token when credentials are correct', async () => {
    const loginData = {
      username: 'newuser',
      password: 'newpassword'
    };

    const res = await request(app)
      .post('/api/auth/login')
      .send(loginData);

    expect(res.status).toBe(200); // Vérifie que la réponse a un statut 200
    expect(res.body).toHaveProperty('token'); // Vérifie que le token est présent dans la réponse
    expect(typeof res.body.token).toBe('string'); // Vérifie que le token est de type chaîne
  });

  it('should return 401 when credentials are incorrect', async () => {
    const loginData = {
      username: 'wronguser',
      password: 'wrongpassword'
    };

    const res = await request(app)
      .post('/api/auth/login')
      .send(loginData);

    expect(res.status).toBe(401); // Vérifie que la réponse a un statut 401
    expect(res.body).toHaveProperty('message', 'Invalid credentials'); // Vérifie que le message d'erreur est correct
  });
});
