"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// constants
const _constants_1 = require("@constants");
// utils
const _utils_1 = require("@utils");
const userResponses = {
    UserCreated: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.userMessages.USER_CREATED_AND_EMAIL_SENT, {
        $ref: '#/components/schemas/User',
    }),
    UserUpdated: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.userMessages.USER_UPDATED_SUCCESS, {
        $ref: '#/components/schemas/User',
    }),
    UserDeleted: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.userMessages.USER_DELETE_SUCCESS, {
        $ref: '#/components/schemas/User',
    }),
    UserListResponse: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.userMessages.USERS_FETCH_SUCCESS, _utils_1.swaggerHandler.createListResponse({
        $ref: '#/components/schemas/User',
    }, _constants_1.userMessages.USERS_FETCH_SUCCESS)),
    UserResponse: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.userMessages.USER_FETCH_SUCCESS, {
        $ref: '#/components/schemas/User',
    }),
    UserStatusUpdated: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.userMessages.USER_STATUS_UPDATED, null),
    UserPasswordUpdated: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.userMessages.USER_PASSWORD_SET_SUCCESS, null),
};
exports.default = userResponses;
//# sourceMappingURL=responses.js.map