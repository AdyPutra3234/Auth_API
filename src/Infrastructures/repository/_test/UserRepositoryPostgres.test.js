const UsersTableTestHelper = require('../../../../test/UsersTableTestHelper');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const RegisterUser = require('../../../Domains/users/entities/RegisterUser');
const RegisteredUser = require('../../../Domains/users/entities/RegisteredUser');
const pool = require('../../database/postgres/pool');
const UserRepositoryPostgres = require('../UserRepositoryPostgres');

describe('UserRepositoryPostgres', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('verify availableUsername function', () => {
    it('should throw error when username not available', async () => {
      await UsersTableTestHelper.addUser({ username: 'testing' });
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      await expect(userRepositoryPostgres.verifyAvailableUsername('testing')).rejects.toThrowError(InvariantError);
    });

    it('should not throw invariant error when username is available', async () => {
      const userReposirotyPostgres = new UserRepositoryPostgres(pool, {});

      await expect(userReposirotyPostgres.verifyAvailableUsername('testing')).resolves.not.toThrowError(InvariantError);
    });
  });

  describe('addUser function', () => {
    it('should persist register user', async () => {
      const registerUser = new RegisterUser({
        username: 'testing',
        password: 'test123',
        fullname: 'just testing',
      });

      const fakeIdGenerator = () => '123';
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);

      await userRepositoryPostgres.addUser(registerUser);

      const users = await UsersTableTestHelper.findUsersById('user-123');
      expect(users).toHaveLength(1);
    });

    it('should return registered user correctly', async () => {
      const registerUser = new RegisterUser({
        username: 'testing',
        password: 'test123',
        fullname: 'just testing',
      });

      const fakeIdGenerator = () => '123';
      const userReposirotyPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);

      const registeredUser = await userReposirotyPostgres.addUser(registerUser);

      expect(registeredUser).toStrictEqual(new RegisteredUser({
        id: 'user-123',
        username: 'testing',
        fullname: 'just testing',
      }));
    });
  });
});
