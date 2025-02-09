const request = require('supertest');
const app = require('../../server'); // Assure-toi que 'server.js' exporte l'application Express

describe('GET /admin', () => {
  it('should return status 200 if admin is authenticated', async () => {
    const res = await request(app)
      .get('/admin')
      .set('Authorization', `Bearer ${process.env.ADMIN_TOKEN}`); // Utiliser un token admin valide

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Admin access granted');
  });

  it('should return status 403 if user is not admin', async () => {
    const res = await request(app)
      .get('/admin')
      .set('Authorization', `Bearer ${process.env.USER_TOKEN}`); // Utiliser un token d'utilisateur non admin

    expect(res.status).toBe(403);
    expect(res.body.message).toBe('Forbidden: Insufficient permission');
  });
});
