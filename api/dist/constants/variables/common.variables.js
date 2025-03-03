"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginations = exports.VALIDATION_MESSAGE_KEYS = exports.SWAGGER_UI_OPTIONS = exports.SWAGGER_ERROR_RESPONSE_SCHEMA = exports.PAGINATION_META_SCHEMA = exports.COOKIE_SAME_SITE = exports.MILLISECOND = exports.DEVELOPMENT = exports.USER_SENSITIVE_INFO_DB_COLUMNS = exports.RESET_ATTEMPT_LIMIT_TIME = exports.JWT_TOKEN_EXPIRE = exports.TOKEN_EXPIRED_ERROR = exports.SCHEMA_KEYS = exports.PASSWORD_MAX_LENGTH = exports.PASSWORD_MIN_LENGTH = exports.NAME_REGEX = exports.MAX_CHARACTERS_LENGTH = exports.PASSWORD_REGEX = exports.MONGO_ERRORS = exports.JSON_WEB_TOKEN_ERROR = exports.HASH_METHOD = exports.SERVER_URL = exports.FRONTEND_APP_URL = exports.ERROR_MESSAGE_REGEX = exports.DUPLICATE_KEY_ERROR = exports.CAST_ERROR = exports.TOKEN_EXPIRE_UNIT = exports.TOKEN_EXPIRE = void 0;
exports.TOKEN_EXPIRE = 1; // TOKEN expiration time (e.g., '1d' for one day)
exports.TOKEN_EXPIRE_UNIT = 'day'; //Supported units: year, month, day, hour, minute, second, millisecond
exports.CAST_ERROR = 'CastError'; // Error name for cast errors
exports.DUPLICATE_KEY_ERROR = 11000; // Error code for duplicate key errors
exports.ERROR_MESSAGE_REGEX = /[^a-zA-Z0-9-' ']/g; // Regular expression to clean error messages of any special characters
exports.FRONTEND_APP_URL = 'http://localhost/client'; // Frontend base URL which the email link will point to
exports.SERVER_URL = 'http://localhost'; // Frontend base URL which the email link will point to
exports.HASH_METHOD = 'sha256'; // Hashing algorithm used for storing passwords
exports.JSON_WEB_TOKEN_ERROR = 'JsonWebTokenError'; // Error name for JSON Web Token errors
exports.MONGO_ERRORS = ['MongooseError', 'MongoError']; // Error names for MongoDB errors
exports.PASSWORD_REGEX = '^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$@%&? ])[a-zA-Z0-9!#$@%&?]{8,20}$'; // Regular expression to validate password format
exports.MAX_CHARACTERS_LENGTH = 50;
exports.NAME_REGEX = /^(?!\d+$).*\w+/; // Regular expression to validate name format
exports.PASSWORD_MIN_LENGTH = 8; // Minimum length of the password
exports.PASSWORD_MAX_LENGTH = 20; // Minimum length of the password
exports.SCHEMA_KEYS = ['params', 'query', 'body']; // Validation schema keys (params, query, body) for the JOI validation
exports.TOKEN_EXPIRED_ERROR = 'TokenExpiredError'; // Error name for token expired errors
exports.JWT_TOKEN_EXPIRE = '1d'; //expire after 1 day(24h)
exports.RESET_ATTEMPT_LIMIT_TIME = 15; // 15 minutes
exports.USER_SENSITIVE_INFO_DB_COLUMNS = [
    '_id',
    '__v',
    'role',
    'password',
    'resetPasswordToken',
    'resetPasswordExpire',
]; // Sensitive information in the User model which should be excluded from the response
exports.DEVELOPMENT = 'development';
exports.MILLISECOND = 'millisecond';
exports.COOKIE_SAME_SITE = 'strict'; // Set a cross-site cookie for third-party contexts
// Pagination response schema
exports.PAGINATION_META_SCHEMA = {
    type: 'object',
    properties: {
        total: { type: 'integer', example: 100 },
        totalPages: { type: 'integer', example: 10 },
        page: { type: 'integer', example: 1 },
        limit: { type: 'integer', example: 10 },
        hasNextPage: { type: 'boolean', example: true },
        hasPrevPage: { type: 'boolean', example: false },
    },
};
//Swagger Error response schema
exports.SWAGGER_ERROR_RESPONSE_SCHEMA = {
    type: 'object',
    properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Error occurred' },
    },
};
// Swagger UI options
exports.SWAGGER_UI_OPTIONS = {
    customSiteTitle: 'Node Boilerplate API Documentation',
    customCss: '.swagger-ui .topbar { display: none }',
};
exports.VALIDATION_MESSAGE_KEYS = {
    passwordPatternBase: 'string.pattern.base',
    namePatternMaxBase: 'string.max',
    nameRegexBase: 'string.regex.base',
};
exports.paginations = {
    ITEM_LIMIT: 50,
    DEFAULT_PAGE: 0,
};
//# sourceMappingURL=common.variables.js.map