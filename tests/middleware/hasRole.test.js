const hasRole = require('../../src/middleware/hasRole');

describe('Middleware hasRole', () => {
  it('should allow access if the user has the required role', () => {
    const req = { user: { role: 'admin' } };
    const res = {};
    const next = jest.fn();

    hasRole('admin')(req, res, next);
    expect(next).toHaveBeenCalled();
  });
  
  it('should deny access if the user does not have the required role', () => {
    const req = { user: { role: 'user' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: test.fn(),
    };
    const next = jest.fn();

    hasRole('admin')(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Forbidden: Insufficient permission' });
  });

  it('should deny access if the user role is missing', () => {
    const req = { user: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn()

    hasRole('admin')(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Forbidden: No role assigned to user' });
  });
});
