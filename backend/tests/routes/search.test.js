const request = require('supertest');
const app = require('../../server'); // Assure-toi que 'server.js' exporte l'application Express

describe('GET /search', () => {
  it('should return search results for a valid query', async () => {
    const res = await request(app)
      .get('/search')
      .query({ query: 'test' });
    
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.results)).toBe(true);
    expect(res.body.results.length).toBeGreaterThan(0);
  });

  it('should return status 400 if no query is provided', async () => {
    const res = await request(app).get('/search');
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Query parameter is required');
  });

  it('should return no results for a query with no matches', async () => {
    const res = await request(app)
      .get('/search')
      .query({ query: 'nonexistentterm' });

    expect(res.status).toBe(200);
    expect(res.body.results.length).toBe(0);
  });
});
