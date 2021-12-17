const RegisteredUser = require('../RegisteredUser');

describe('a Registered user entities', () => {
  it('should throw error when payload did not contain deeded property', () => {
    const payload = {
      username: 'test',
      fullname: 'testing',
    };

    expect(() => new RegisteredUser(payload)).toThrowError('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type spesification', () => {
    const payload = {
      id: 123,
      username: 'test',
      fullname: true,
    };

    expect(() => new RegisteredUser(payload)).toThrowError('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create registerUser object correctly', () => {
    const payload = {
      id: 'test-123',
      username: 'testing',
      fullname: 'just testing',
    };

    const registeredUser = new RegisteredUser(payload);

    expect(registeredUser.id).toEqual(payload.id);
    expect(registeredUser.username).toEqual(payload.username);
    expect(registeredUser.fullname).toEqual(payload.fullname);
  });
});
