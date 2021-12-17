const NotFoundError = require('../NotFoundError');

describe('NotFoundError', () => {
  it('should craete error correctly', () => {
    const notFoundError = new NotFoundError('Not found!!!');

    expect(notFoundError.statusCode).toEqual(404);
    expect(notFoundError.message).toEqual('Not found!!!');
    expect(notFoundError.name).toEqual('NotFoundError');
  });
});
