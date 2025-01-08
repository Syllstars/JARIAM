const loggerMiddleware = require('../../src/middleware/loggerMiddleware');
const htpMocks = require('node-mocks-http');

describe('Middleware loggerMiddleware', () => {
  it('should log the request data correctly', () => {
    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/test-route',
    });

    const res = httpMocks.createResponse();
    const next = jest.spyOn(console, 'log').mockImplementation();

    loggerMiddleware(req, res, next);

    expect(consoleSpy).toHaveBeenCalledWith('GET /test-route');
    consoleSpy.mockRestore();
  });
});
