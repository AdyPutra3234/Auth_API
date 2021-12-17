const pool = require('../../database/postgres/pool');
const UsersTableTestHelper = require('../../../../test/UsersTableTestHelper');
const container = require('../../Container');
const createServer = require('../createServer');

describe('HTTP server', () => {
  afterAll(async () => {
    await pool.end;
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  it('should response 404 when request unregistered route', async () => {
    const server = await createServer(container);

    const response = await server.inject({
      method: 'GET',
      url: '/unregistered',
    });

    expect(response.statusCode).toEqual(404);
  });

  describe('When POST /users', () => {
    it('should response 201 and persisted user', async () => {
      const requestPayload = {
        username: 'test',
        password: 'testing123',
        fullname: 'just testing',
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedUser).toBeDefined();
    });

    it('should response 400 when request payload not contain needed property', async () => {
      const requestPayload = {
        fullname: 'testing 123',
        password: '123test',
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('cannot create new user, the payload property does not match');
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      const requestPayload = {
        username: 'testing',
        password: 'test123',
        fullname: ['just testing'],
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('cannot create new user, data type does not match');
    });

    it('should response 400 when username more than 50 character', async () => {
      const requestPayload = {
        username: 'tesssssssssssssssssssssssssssssssssssssssssstttttttttttttt',
        password: 'test123',
        fullname: 'just testing',
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('cannot create new user, username should be 50 max character');
    });

    it('should response 400 when username contain restricted character', async () => {
      const requestPayload = {
        username: 'just testing',
        password: 'testing123',
        fullname: 'just testing',
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('cannot create new user, username does not match');
    });

    it('should response 400 when username unavailable', async () => {
      await UsersTableTestHelper.addUser({ username: 'testing' });

      const requestPayload = {
        username: 'testing',
        password: 'testing123',
        fullname: 'just testing',
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('username already taken');
    });

    it('should handle server error correctly', async () => {
      const requestPayload = {
        username: 'dicoding',
        fullname: 'Dicoding Indonesia',
        password: 'super_secret',
      };

      const server = await createServer({}); // fake container

      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(500);
      expect(responseJson.status).toEqual('error');
      expect(responseJson.message).toEqual('terjadi kegagalan pada server kami');
    });
  });
});
