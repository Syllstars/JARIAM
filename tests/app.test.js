const request = require('supertest');
const app = require('../src/server');

describe('Test API', () => {
  it('should return status 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });
});
