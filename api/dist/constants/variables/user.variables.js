"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_MODULE_SWAGGER_OPERATIONS_PATH = exports.SET_PASSWORD_TOKEN_UNIT = exports.SET_PASSWORD_EXPIRE = void 0;
exports.SET_PASSWORD_EXPIRE = 60; // Expiration time (depends upon SET_PASSWORD_TOKEN_UNIT ) for password reset tokens. The convertTime function will convert this value into milliseconds.
exports.SET_PASSWORD_TOKEN_UNIT = 'minute'; // Supported units: year, month, day, hour, minute, second, millisecond
exports.USER_MODULE_SWAGGER_OPERATIONS_PATH = 'src/docs/user/operations.ts'; // user module swagger operations path
//# sourceMappingURL=user.variables.js.map