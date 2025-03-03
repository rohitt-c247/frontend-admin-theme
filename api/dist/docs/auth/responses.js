"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// constants
const _constants_1 = require("@constants");
// utils
const _utils_1 = require("@utils");
const authResponses = {
    AuthUserCreated: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.authMessages.USER_REGISTERED, {
        $ref: '#/components/schemas/AuthUser',
    }),
    UserVerified: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.authMessages.VERIFY_EMAIL_SUCCESS, {
        $ref: '#/components/schemas/VerifyEmailResponse',
    }),
    UserLoggedIn: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.authMessages.LOGIN_SUCCESS, {
        $ref: '#/components/schemas/LoginResponse',
    }),
    UserProfileUpdated: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.authMessages.UPDATE_PROFILE, {
        $ref: '#/components/schemas/AuthUser',
    }),
    UserForgetPassword: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.commonMessages.SHARE_RESET_LINK, {
        $ref: '#/components/schemas/ForgetPasswordResponse',
    }),
    UserResetPassword: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.authMessages.PASSWORD_CHANGED, {
        $ref: '#/components/schemas/AuthUser',
    }),
    UserChangePassword: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.authMessages.PASSWORD_CHANGED, {
        $ref: '#/components/schemas/ChangePasswordResponse',
    }),
    AuthUserResponse: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.authMessages.USER_PROFILE, {
        $ref: '#/components/schemas/AuthUser',
    }),
};
exports.default = authResponses;
//# sourceMappingURL=responses.js.map