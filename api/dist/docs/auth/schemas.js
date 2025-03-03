"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _utils_1 = require("@utils");
const authSchemas = {
    // User
    AuthUser: {
        type: 'object',
        properties: _utils_1.authHandler.authRandomData('authSchema'),
    },
    // User Creation
    AuthCreateUserRequest: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: _utils_1.authHandler.authRandomData('registerRequest'),
    },
    // Verify Email Request
    VerifyEmailRequest: {
        type: 'object',
        required: ['token'],
        properties: _utils_1.authHandler.authRandomData('verifyRequest'),
    },
    VerifyEmailResponse: {
        type: 'object',
        properties: {},
    },
    // User Login Request
    LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: _utils_1.authHandler.authRandomData('loginRequest'),
    },
    // User Login Response
    LoginResponse: {
        type: 'object',
        required: ['token', 'role'],
        properties: _utils_1.authHandler.authRandomData('loginResponse'),
    },
    // User Login Request
    ForgetPasswordRequest: {
        type: 'object',
        required: ['email'],
        properties: _utils_1.authHandler.authRandomData('forgetPasswordRequest'),
    },
    ForgetPasswordResponse: {
        type: 'object',
        properties: {},
    },
    // User Login Request
    ResetPasswordRequest: {
        type: 'object',
        required: ['token', 'password'],
        properties: _utils_1.authHandler.authRandomData('resetPasswordRequest'),
    },
    // Change Password Request
    ChangePasswordRequest: {
        type: 'object',
        required: ['currentPassword', 'newPassword'],
        properties: _utils_1.authHandler.authRandomData('changePasswordRequest'),
    },
    // Change Password Response
    ChangePasswordResponse: {
        type: 'object',
        required: ['name', 'email'],
        properties: _utils_1.authHandler.authRandomData('changePasswordResponse'),
    },
    // Update Profile Request
    UpdateProfilerRequest: {
        type: 'object',
        properties: _utils_1.authHandler.authRandomData('updateProfileRequest'),
    },
};
exports.default = authSchemas;
//# sourceMappingURL=schemas.js.map