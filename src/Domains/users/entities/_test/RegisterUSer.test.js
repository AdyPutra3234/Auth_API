const RegisterUser = require('../RegisterUser');

describe('a Register user entities', () => {
  it('should throw error when payload did not containt needed property', () => {
    const payload = {
      username: 'test',
      password: 'test123',
    };

    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      username: 'test',
      password: true,
      fullname: 123,
    };

    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when username contain more than 50 character', () => {
    const payload = {
      username: 'testingUsernametestingUsernametestingUsernametestingUsernametestingUsernametestingUsernametestingUsername',
      password: 'test123',
      fullname: 'testing',
    };

    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.USERNAME_LIMIT_CHAR');
  });

  it('should throw error when username contain restricted character', () => {
    const payload = {
      username: 'test ing',
      password: 'test123',
      fullname: 'just testing',
    };

    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
  });

  it('should create registerUser object correctly', () => {
    const payload = {
      username: 'testing',
      password: 'test123',
      fullname: 'just testing',
    };

    const { username, password, fullname } = new RegisterUser(payload);

    expect(username).toEqual(payload.username);
    expect(password).toEqual(payload.password);
    expect(fullname).toEqual(payload.fullname);
  });
});
