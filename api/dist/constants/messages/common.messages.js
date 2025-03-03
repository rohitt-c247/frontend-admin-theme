"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_WITH_THIS_EMAIL_ALREADY_EXISTS = exports.SUPPORTED_SIZE_UNITS = exports.SUPPORTED_TIME_UNITS = exports.INVALID_TO_UNIT = exports.INVALID_FROM_UNIT = exports.USER_ALREADY_EXISTS = exports.INVALID_CREDENTIALS = exports.USER_NOT_FOUND = exports.USER_DEACTIVATE = exports.SESSION_TIMEOUT = exports.INVALID_TOKEN = exports.INVALID_PASSWORD_FORMAT_MESSAGE = exports.TOO_MANY_RESET_ATTEMPTS = exports.EXPIRE_JWT = exports.CONFLICT_ERROR = exports.UNPROCESSABLE_ENTITY_ERROR_MESSAGE = exports.BAD_REQUEST_ERROR_MESSAGE = exports.INVALID_PASSWORD_FORMAT = exports.EXPIRE_TOKEN = exports.SUBJECT_SET_PASSWORD = exports.SHARE_RESET_LINK = exports.EMAIL_NOT_SENT = exports.FORGET_PASSWORD_ERROR = exports.UNKNOWN_ERROR = exports.RESOURCE_NOT_FOUND = exports.INTERNAL_SERVER_ERROR = exports.UNAUTHORIZED = exports.FORBIDDEN_ERROR = exports.MISSING_ENV_VARIABLES = exports.DATABASE_ERROR = void 0;
const common_variables_1 = require("../variables/common.variables");
exports.DATABASE_ERROR = 'Mongoose database error.';
exports.MISSING_ENV_VARIABLES = 'Missing required environment variable';
exports.FORBIDDEN_ERROR = 'Forbidden.';
exports.UNAUTHORIZED = 'Unauthorized.';
exports.INTERNAL_SERVER_ERROR = 'Internal server error.';
exports.RESOURCE_NOT_FOUND = 'Resource not found.';
exports.UNKNOWN_ERROR = 'Unknown error occurred.';
exports.FORGET_PASSWORD_ERROR = 'Unable to forget password';
exports.EMAIL_NOT_SENT = 'Email not sent, please try again';
exports.SHARE_RESET_LINK = 'You will receive a password reset link shortly.';
exports.SUBJECT_SET_PASSWORD = 'Password set request.';
exports.EXPIRE_TOKEN = 'Token is expired.';
exports.INVALID_PASSWORD_FORMAT = `Password must be between ${common_variables_1.PASSWORD_MIN_LENGTH} to ${common_variables_1.PASSWORD_MAX_LENGTH} characters, with an uppercase, lowercase, number, and special character.`;
exports.BAD_REQUEST_ERROR_MESSAGE = 'Bad request.';
exports.UNPROCESSABLE_ENTITY_ERROR_MESSAGE = 'Invalid input data.';
exports.CONFLICT_ERROR = 'Conflict error.';
exports.EXPIRE_JWT = 'Token is expired.';
exports.TOO_MANY_RESET_ATTEMPTS = `Too many password reset attempts. Please try again after ${common_variables_1.RESET_ATTEMPT_LIMIT_TIME} minutes.`;
exports.INVALID_PASSWORD_FORMAT_MESSAGE = {
    [common_variables_1.VALIDATION_MESSAGE_KEYS.passwordPatternBase]: exports.INVALID_PASSWORD_FORMAT,
};
exports.INVALID_TOKEN = 'Invalid token.';
exports.SESSION_TIMEOUT = 'Session timeout.';
exports.USER_DEACTIVATE = 'User is deactivated.';
exports.USER_NOT_FOUND = 'User not found.';
exports.INVALID_CREDENTIALS = 'Incorrect email or password';
exports.USER_ALREADY_EXISTS = 'User already exists.';
exports.INVALID_FROM_UNIT = 'Invalid from unit';
exports.INVALID_TO_UNIT = 'Invalid to unit';
exports.SUPPORTED_TIME_UNITS = 'Supported units: year, month, day, hour, minute, second, millisecond.';
exports.SUPPORTED_SIZE_UNITS = 'Supported units: year, month, day, hour, minute, second, millisecond.';
exports.USER_WITH_THIS_EMAIL_ALREADY_EXISTS = 'User with this email already exists.';
//# sourceMappingURL=common.messages.js.map