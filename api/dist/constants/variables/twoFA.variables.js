"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_LENGTH = exports.TWILO_CHANNEL = exports.OTP_VALID_TIME = exports.TWOFA_MODULE_SWAGGER_OPERATIONS_PATH = exports.charSet = exports.otpLength = void 0;
exports.otpLength = 6; //Length of the OTP to generate update it according to yourself
exports.charSet = '0123456789'; // Generate a numeric digit
exports.TWOFA_MODULE_SWAGGER_OPERATIONS_PATH = 'src/docs/twoFA/operations.ts';
exports.OTP_VALID_TIME = '10 minutes';
exports.TWILO_CHANNEL = 'sms'; //'sms' | 'email'
exports.TOKEN_LENGTH = 20; //length of the secret token length
//# sourceMappingURL=twoFA.variables.js.map