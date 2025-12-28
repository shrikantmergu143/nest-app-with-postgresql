const SUCCESS = {
  DEFAULT: 'Your request is successfully executed',
  COMPLETE_VERIFICATION: (type: string) =>
    `OTP Sent to your contact, Please complete ${type} OTP verification`,
  DELETE: (type: string) => `${type} deleted successfully`,
};
const ERROR = {
  NOT_FOUND: (type: string) => `${type} not found`,
  INTERNAL_SERVER_ERROR: 'Internal server error occurred',
  METHOD_NOT_ALLOWED: 'The method is not allowed',
  ALREADY_EXISTS: (entity: string) => `${entity} already exists`,
  VALIDATION: 'Validation Error!',
  BAD_SYNTAX: 'Invalid request syntax detected.',
};
export const MESSAGE = {
  USER_ALREADY_EXIST: 'User already exist',
  WRONG_CREDENTIALS: 'Wrong Credentials.',
};
const VALIDATION = {};
const EMAIL = {};
export const CONSTANT = {
  SUCCESS: SUCCESS,
  VALIDATION: VALIDATION,
  ERROR: ERROR,
  EMAIL: EMAIL,
  MESSAGE: MESSAGE,
};

export declare enum RequestMethod {
  GET = 0,
  POST = 1,
  PUT = 2,
  DELETE = 3,
  PATCH = 4,
  ALL = 5,
  OPTIONS = 6,
  HEAD = 7,
  SEARCH = 8,
  PROPFIND = 9,
  PROPPATCH = 10,
  MKCOL = 11,
  COPY = 12,
  MOVE = 13,
  LOCK = 14,
  UNLOCK = 15,
}
