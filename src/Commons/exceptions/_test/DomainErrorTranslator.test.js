const DomainErrorTranslator = require('../DomainErrorTranslator');
const InvariantError = require('../InvariantError');

describe('DomainErrorTranslator', () => {
  it('should translate error correctly', () => {
    expect(DomainErrorTranslator.translate(new Error('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY'))).toStrictEqual(new InvariantError('cannot create new user, the payload property does not match'));
    expect(DomainErrorTranslator.translate(new Error('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION'))).toStrictEqual(new InvariantError('cannot create new user, data type does not match'));
    expect(DomainErrorTranslator.translate(new Error('REGISTER_USER.USERNAME_LIMIT_CHAR'))).toStrictEqual(new InvariantError('cannot create new user, username should be 50 max character'));
    expect(DomainErrorTranslator.translate(new Error('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER'))).toStrictEqual(new InvariantError('cannot create new user, username does not match'));
  });

  it('should return original error when error message is not needed to translate', () => {
    const error = new Error('Test Error');

    const translatedError = DomainErrorTranslator.translate(error);

    expect(translatedError).toStrictEqual(error);
  });
});
