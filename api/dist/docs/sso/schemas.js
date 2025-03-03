"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _utils_1 = require("@utils");
const ssoSchemas = {
    // SSO User Profile Schema
    SSOUserProfile: {
        type: 'object',
        properties: _utils_1.ssoHandler.ssoRandomData('ssoSchema'),
    },
    // SSO Login Request
    SSOLoginRequest: {
        type: 'object',
        required: ['provider'],
        properties: _utils_1.ssoHandler.ssoRandomData('ssoLoginRequest'),
    },
    SSOUserResponse: {
        type: 'object',
        properties: _utils_1.ssoHandler.ssoRandomData('ssoUserResponse'),
    },
};
exports.default = ssoSchemas;
//# sourceMappingURL=schemas.js.map