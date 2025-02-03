/*
const auditLogger = require('../../src/middleware/auditLogger');
const httpMocks = require('node-mocks-http');

describe('Middleware auditLogger', () => {
  it('should log audit information', () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/audit-test',
      body: { action: 'test' },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    auditLogger(req, res, next);

    expect(consoleSpy).toHaveBeenCaledWith('Audit log: POST /audit-test', { action: 'test'});
    consoleSpy.mockRestore();
  });
});
*/