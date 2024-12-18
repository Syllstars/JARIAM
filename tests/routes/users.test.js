const request = require('supertest');
const app = require('../../server'); // Assure-toi que 'server.js' exporte l'application Express


describe('GET /api/users', () => {
  it('should return a list of users', async () => {
    const res = await request(app)
      .get('/api/users');  // Fait une requête GET sur /users

    expect(res.status).toBe(200); // Vérifie que la réponse a un statut 200
    expect(res.body).toBeInstanceOf(Object); // Vérifie que la réponse est un tableau
    // expect(res.body.length).toBeGreaterThan(0); // Vérifie qu'il y a au moins un utilisateur dans le tableau
  });
});

describe('POST /api/users', () => {
  it('should create a new user and return the created user', async () => {
    const userData = {
      name: 'newuser',
      password: 'newpassword',
      email: 'newuser@example.com'
    };

    const res = await request(app)
      .post('/api/users')  // Fait une requête POST sur /users
      .send(userData);

    expect(res.status).toBe(201); // Vérifie que la réponse a un statut 201 (création réussie)
    expect(res.body.user).toHaveProperty('name', 'newuser'); // Vérifie que le nom d'utilisateur est bien celui envoyé
    expect(res.body.user).toHaveProperty('email', 'newuser@example.com'); // Vérifie que l'email est bien celui envoyé
  });

  it('should return 400 when required fields are missing', async () => {
    const userData = {
      username: 'userwithoutpassword',
      // email est manquant
    };

    const res = await request(app)
      .post('/api/users')  // Fait une requête POST sur /users
      .send(userData);

    expect(res.status).toBe(400); // Vérifie que la réponse a un statut 400 (mauvaise requête)
    expect(res.body).toHaveProperty('error', 'Missing name or email'); // Vérifie le message d'erreur
  });
});
