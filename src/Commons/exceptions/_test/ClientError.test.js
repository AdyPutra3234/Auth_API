const ClientError = require('../ClientError');

describe('ClientError', () => {
  it('should throw error when dirrectly use it', () => {
    expect(() => new ClientError('')).toThrowError('cannot instantiate abstract class');
  });
});
