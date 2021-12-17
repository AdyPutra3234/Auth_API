const AuthenticationError = require('../AuthenticationError');

describe('AuthenticationError', () => {
  it('should create error correctly', () => {
    const authenticationError = new AuthenticationError('Authentication error!');

    expect(authenticationError.statusCode).toEqual(401);
    expect(authenticationError.message).toEqual('Authentication error!');
    expect(authenticationError.name).toEqual('AuthenticationError');
  });
});
