"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _utils_1 = require("@utils");
const userSchemas = {
    // User
    User: {
        type: 'object',
        properties: _utils_1.userHandler.userRandomData('userSchema'),
    },
    // User Creation
    CreateUserRequest: {
        type: 'object',
        required: ['name', 'email'],
        properties: _utils_1.userHandler.userRandomData('createUserRequest'),
    },
    UpdateUserRequest: {
        type: 'object',
        properties: _utils_1.userHandler.userRandomData('updateUserRequest'),
    },
    ChangeStatusRequest: {
        type: 'object',
        required: ['status'],
        properties: _utils_1.userHandler.userRandomData('changeStatusRequest'),
    },
    SetPasswordRequest: {
        type: 'object',
        required: ['token', 'password'],
        properties: _utils_1.userHandler.userRandomData('setPasswordRequest'),
    },
};
exports.default = userSchemas;
//# sourceMappingURL=schemas.js.map