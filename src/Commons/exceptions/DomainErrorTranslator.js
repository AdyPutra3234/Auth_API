const InvariantError = require('./InvariantError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('cannot create new user, the payload property does not match'),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('cannot create new user, data type does not match'),
  'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError('cannot create new user, username should be 50 max character'),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('cannot create new user, username does not match'),
};

module.exports = DomainErrorTranslator;
