"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentSchema = exports.setPasswordSchema = exports.changeStatusSchema = exports.createStudentSchema = void 0;
//Third-party modules
const joi_1 = __importDefault(require("joi"));
//Config
const index_1 = require("@config/index");
//Enums
const _enums_1 = require("@enums");
//Constants
const _constants_1 = require("@constants");
exports.createStudentSchema = {
    body: joi_1.default.object({
        name: joi_1.default.string()
            .max(_constants_1.commonVariables.MAX_CHARACTERS_LENGTH)
            .regex(_constants_1.commonVariables.NAME_REGEX)
            .required()
            .messages(_constants_1.userMessages.INVALID_NAME_FORMAT_MESSAGE),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string()
            .min(_constants_1.commonVariables.PASSWORD_MIN_LENGTH)
            .pattern(new RegExp(`${_constants_1.commonVariables.PASSWORD_REGEX}`))
            .required()
            .messages(_constants_1.commonMessages.INVALID_PASSWORD_FORMAT_MESSAGE),
        phoneNumber: joi_1.default.string().optional(),
        gender: joi_1.default.string().valid('Male', 'Female', 'Other').required(),
        dob: joi_1.default.date().required(),
        role: joi_1.default.number()
            .integer()
            .valid(index_1.roles[0], index_1.roles[1])
            .default(index_1.defaultRole),
        status: joi_1.default.number().integer().valid(_enums_1.UserStatus.Inactive, _enums_1.UserStatus.Active).default(_enums_1.UserStatus.Inactive),
    }),
    countryCode: joi_1.default.string().optional(),
    phoneNumber: joi_1.default.string().optional(),
};
exports.changeStatusSchema = {
    params: joi_1.default.object({
        userId: joi_1.default.string().required(),
    }),
    body: joi_1.default.object({
        status: joi_1.default.number().integer().valid(_enums_1.UserStatus.Inactive, _enums_1.UserStatus.Active).required(), // assuming status is either 0 or 1
    }),
};
exports.setPasswordSchema = {
    body: joi_1.default.object({
        token: joi_1.default.string().required(),
        password: joi_1.default.string()
            .min(_constants_1.commonVariables.PASSWORD_MIN_LENGTH)
            .pattern(new RegExp(`${_constants_1.commonVariables.PASSWORD_REGEX}`))
            .required()
            .messages(_constants_1.commonMessages.INVALID_PASSWORD_FORMAT_MESSAGE),
    }),
};
exports.updateStudentSchema = {
    params: joi_1.default.object({
        userId: joi_1.default.string().required(), // Ensure 'id' is provided in params
    }),
    body: joi_1.default.object({
        name: joi_1.default.string()
            .max(_constants_1.commonVariables.MAX_CHARACTERS_LENGTH)
            .regex(_constants_1.commonVariables.NAME_REGEX)
            .messages(_constants_1.userMessages.INVALID_NAME_FORMAT_MESSAGE)
            .optional(),
        email: joi_1.default.string().email().optional(),
        password: joi_1.default.string()
            .min(_constants_1.commonVariables.PASSWORD_MIN_LENGTH)
            .pattern(new RegExp(`${_constants_1.commonVariables.PASSWORD_REGEX}`))
            .optional()
            .messages(_constants_1.commonMessages.INVALID_PASSWORD_FORMAT_MESSAGE),
        phoneNumber: joi_1.default.string().optional(),
        gender: joi_1.default.string().valid('Male', 'Female', 'Other').optional(),
        dob: joi_1.default.date().optional(),
        role: joi_1.default.number()
            .integer()
            .valid(index_1.roles[0], index_1.roles[1])
            .default(index_1.defaultRole)
            .optional(),
        status: joi_1.default.number().integer().valid(_enums_1.UserStatus.Inactive, _enums_1.UserStatus.Active).default(_enums_1.UserStatus.Active).optional(), // assuming status is either 0 or 1
    }),
    countryCode: joi_1.default.string().optional(),
    phoneNumber: joi_1.default.string().optional(),
};
//# sourceMappingURL=student.validation.js.map