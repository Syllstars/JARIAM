const request = require('supertest');
const app = require('../../server'); // Assure-toi que 'server.js' exporte l'application Express

describe('GET /users', () => {
  it('should return a list of users', async () => {
    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /users/:id'; () => {
  it('should return a single user', async () => {
    const res = await request(app).get('/users/1');
    expect(res.status).toBe(200);
    expect(res.body.username).toBeDefined();
  });

  it('should return 404 for non existent user', async () => {
    const res = await request(app).get('/users/999');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('User not found');
  });
});

describe('POST /users', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123',
        role: 'user'
      });
    expect(res.status).toBe(201);
    expect(res.body.username).toBe('newuser');
  });

  it('should return 400 if required fields are missing', async () => {
    const res = await request(app)
      .post('/users')
      .send({ username: 'newuser' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Missing required fields');
  });
});

describe('PUT /users/:id', () => {
  it('should update an existing user', async () => {
    const res = await request(app)
      .put('/users/1')
      .send({ username: 'updateduser' });
    expect(res.status).toBe(200);
    expect(res.body.username).toBe('updateduser');
  });

  it('should return 404 if user does not exist', async () => {
    const res = await request(app)
      .put('/users/999')
      .send({ username: 'updateduser' });
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('User not found');
  });
});

describe('DELETE /users/:id', () => {
  it('should delete an existing user', async () => {
    const res = await request(app).delete('/users/1');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('User deleted');
  });

  it('should return 404 if user does not exist', async () => {
    const res = await request(app).delete('/users/999');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('User not found');
  });
});
