"use strict";
//Constants
// import { commonVariables } from '@constants';
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_UPDATE_NOTIFICATION = exports.USER_STATUS_UPDATED = exports.USER_PASSWORD_SET_SUCCESS = exports.USER_SET_PASSWORD_LINK_INVALID = exports.USER_SET_PASSWORD_LINK_EXPIRED = exports.USER_UPDATED_SUCCESS = exports.USER_DELETE_SUCCESS = exports.USERS_FETCH_SUCCESS = exports.USER_FETCH_SUCCESS = exports.USER_UPDATED = exports.USER_CREATION_FAILED = exports.USER_CREATED_AND_EMAIL_NOT_SENT = exports.USER_CREATED_AND_EMAIL_SENT = exports.SUBJECT_SET_PASSWORD = exports.SELF_DELETE_ERROR_MESSAGE = exports.INVALID_NAME_FORMAT_MESSAGE = void 0;
const common_variables_1 = require("../variables/common.variables");
exports.INVALID_NAME_FORMAT_MESSAGE = {
    [common_variables_1.VALIDATION_MESSAGE_KEYS.namePatternMaxBase]: `Name must be at least ${common_variables_1.MAX_CHARACTERS_LENGTH} characters long.`,
    [common_variables_1.VALIDATION_MESSAGE_KEYS.nameRegexBase]: 'Name must not contain only numbers',
};
exports.SELF_DELETE_ERROR_MESSAGE = 'You cannot delete yourself.';
exports.SUBJECT_SET_PASSWORD = 'Password set request.';
exports.USER_CREATED_AND_EMAIL_SENT = 'User created & invite send successfully.';
exports.USER_CREATED_AND_EMAIL_NOT_SENT = 'User created but invite not sent.';
exports.USER_CREATION_FAILED = 'User creation failed.';
exports.USER_UPDATED = 'User updated successfully.';
exports.USER_FETCH_SUCCESS = 'User fetched successfully.';
exports.USERS_FETCH_SUCCESS = 'Users fetched successfully.';
exports.USER_DELETE_SUCCESS = 'User deleted successfully.';
exports.USER_UPDATED_SUCCESS = 'User updated successfully.';
exports.USER_SET_PASSWORD_LINK_EXPIRED = 'Password setting link has expired.';
exports.USER_SET_PASSWORD_LINK_INVALID = 'Invalid password setting link.';
exports.USER_PASSWORD_SET_SUCCESS = 'Password set successfully.';
exports.USER_STATUS_UPDATED = 'User status updated successfully.';
exports.USER_UPDATE_NOTIFICATION = {
    title: 'User Update',
    message: 'Your details have been updated.',
};
//# sourceMappingURL=user.messages.js.map