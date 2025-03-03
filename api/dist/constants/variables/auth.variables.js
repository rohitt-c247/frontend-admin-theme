"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FORGET_PASSWORD_WINDOW_MS = exports.FORGET_PASSWORD_MAX_ATTEMPTS = exports.JWT_TOKEN_EXPIRE = exports.AUTH_MODULE_SWAGGER_OPERATIONS_PATH = exports.RESET_TOKEN_UNIT = exports.RESET_TOKEN_EXPIRE = exports.VERIFY_EMAIL_TOKEN_EXPIRE_UNIT = exports.VERIFY_EMAIL_TOKEN_EXPIRE = void 0;
exports.VERIFY_EMAIL_TOKEN_EXPIRE = 1; // TOKEN expiration time (e.g., '1d' for one day)
exports.VERIFY_EMAIL_TOKEN_EXPIRE_UNIT = 'hour'; //Supported units: year, month, day, hour, minute, second, millisecond
exports.RESET_TOKEN_EXPIRE = 60; // Expiration time (in ms) for password reset tokens (10 minutes = 10m*60s*1000ms = 600000)
exports.RESET_TOKEN_UNIT = 'minute'; // Supported units: year, month, day, hour, minute, second, millisecond
exports.AUTH_MODULE_SWAGGER_OPERATIONS_PATH = 'src/docs/auth/operations.ts';
exports.JWT_TOKEN_EXPIRE = '1d'; //expire after 1 day(24h)
// Rate Limiting Constants
exports.FORGET_PASSWORD_MAX_ATTEMPTS = 2; // Max attempts for password reset (2 requests)
exports.FORGET_PASSWORD_WINDOW_MS = 15 * 60 * 1000; // 15 minutes in milliseconds
//# sourceMappingURL=auth.variables.js.map