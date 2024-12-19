const request = require('supertest');
const app = require('../../server'); // Assure-toi que 'server.js' exporte l'application Express

describe('POST /auth/register', () => {
  it('should create a new user and return status 201', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        username: 'newuser',
        password: 'newpassword',
        email: 'user@example.com',
      });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('User created');
  });

  it('should return status 400 if missing fields', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ username: 'newuser' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Missing username or password');
  });

  it('should return status 400 if missing fields', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ password: 'newpassword' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Missing username or password');
  });
});

describe('POST /auth/login', () => {
  it('should log in the user and return a token', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        username: 'newuser',
        password: 'newpassword'
      });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
  
  it('should return status 401 for invalid credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        username: 'wronguser',
        password: 'wrongpassword',
      });
    expect(res.status).toBe(401);
  });
});
