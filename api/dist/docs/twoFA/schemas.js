"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _utils_1 = require("@utils");
const twoFactorAuthSchemas = {
    ActiveTwoFactorAuthRequest: {
        type: 'object',
        required: ['email', 'isTwoAuthEnabled'],
        properties: _utils_1.twoFAHandler.twoFactorAuthRandomData('activeTwoFactorAuthRequest'),
    },
    SendEmailRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: _utils_1.twoFAHandler.twoFactorAuthRandomData('sendEmailRequest'),
    },
    SendPhoneRequest: {
        type: 'object',
        required: ['phone', 'otp'],
        properties: _utils_1.twoFAHandler.twoFactorAuthRandomData('sendPhoneRequest'),
    },
    SendAppRequest: {
        type: 'object',
        required: ['email'],
        properties: _utils_1.twoFAHandler.twoFactorAuthRandomData('sendAppRequest'),
    },
    VerifyOtpRequest: {
        type: 'object',
        required: ['email', 'otp'],
        properties: _utils_1.twoFAHandler.twoFactorAuthRandomData('verifyOtpRequest'),
    },
};
exports.default = twoFactorAuthSchemas;
//# sourceMappingURL=schemas.js.map