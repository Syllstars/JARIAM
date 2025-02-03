/*
const rateLimiter = require('express-rate-limit');
const httpMocks = require('node-mocks-http');
const { RateLimiterMemory } = require('rate-limiter-flexible');

describe('Middleware rateLimiter', () => {
  it('should allow requests under the rate limit', async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();

    const limiter = new RateLimiterMemory({
      points: 5,
      duration: 1,
    });

    await rateLimiter(req, res, next, limiter);
    expect(next).toHaveBeenCalled();
  });

  it('should block requests exceeding the rate limit', async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();

    const limiter = new RateLimiterMemory({
      points: 1,
      duration: 1,
    });

    await rateLimiter(req, res, next, limiter);
    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(429);
  });
});
*/
