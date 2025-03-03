"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// constants
const _constants_1 = require("@constants");
// utils
const _utils_1 = require("@utils");
const ssoResponses = {
    SSOLoginSuccess: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.ssoMessages.SSO_LOGIN_SUCCESS, {
        $ref: '#/components/schemas/SSOUserResponse',
    }),
    GoogleCallback: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.ssoMessages.SSO_REDIRECT, {
        $ref: _constants_1.ssoVariables.REF_SSO_SWAGGER,
    }),
    FacebookCallback: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.ssoMessages.SSO_REDIRECT, {
        $ref: _constants_1.ssoVariables.REF_SSO_SWAGGER,
    }),
    // User profile fetched successfully
    SSOProfileFetched: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.ssoMessages.SSO_PROFILE_FETCH_SUCCESS, {
        $ref: _constants_1.ssoVariables.REF_SSO_SWAGGER,
    }),
};
exports.default = ssoResponses;
//# sourceMappingURL=responses.js.map