"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgetPasswordSchema = exports.changePasswordSchema = exports.passwordResetSchema = exports.updateProfileSchema = exports.loginSchema = exports.registerSchema = void 0;
//Third-party modules
const joi_1 = __importDefault(require("joi"));
//Constants
const _constants_1 = require("@constants");
exports.registerSchema = {
    body: joi_1.default.object({
        name: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string()
            .min(_constants_1.commonVariables.PASSWORD_MIN_LENGTH)
            .max(_constants_1.commonVariables.PASSWORD_MAX_LENGTH)
            .pattern(new RegExp(`${_constants_1.commonVariables.PASSWORD_REGEX}`))
            .required()
            .messages(_constants_1.commonMessages.INVALID_PASSWORD_FORMAT_MESSAGE),
        phoneNumber: joi_1.default.string().optional(),
        countryCode: joi_1.default.string().optional(),
    }).unknown(false),
};
exports.loginSchema = {
    body: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
    }).unknown(false),
};
exports.updateProfileSchema = {
    body: joi_1.default.object({
        name: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
    }).unknown(false),
};
exports.passwordResetSchema = {
    body: joi_1.default.object({
        token: joi_1.default.string().required(),
        password: joi_1.default.string()
            .min(_constants_1.commonVariables.PASSWORD_MIN_LENGTH)
            .max(_constants_1.commonVariables.PASSWORD_MAX_LENGTH)
            .pattern(new RegExp(`${_constants_1.commonVariables.PASSWORD_REGEX}`))
            .required()
            .messages(_constants_1.commonMessages.INVALID_PASSWORD_FORMAT_MESSAGE),
    }),
};
exports.changePasswordSchema = {
    body: joi_1.default.object({
        currentPassword: joi_1.default.string()
            .min(_constants_1.commonVariables.PASSWORD_MIN_LENGTH)
            .max(_constants_1.commonVariables.PASSWORD_MAX_LENGTH)
            .pattern(new RegExp(`${_constants_1.commonVariables.PASSWORD_REGEX}`))
            .required()
            .messages(_constants_1.commonMessages.INVALID_PASSWORD_FORMAT_MESSAGE),
        newPassword: joi_1.default.string()
            .min(_constants_1.commonVariables.PASSWORD_MIN_LENGTH)
            .max(_constants_1.commonVariables.PASSWORD_MAX_LENGTH)
            .pattern(new RegExp(`${_constants_1.commonVariables.PASSWORD_REGEX}`))
            .required()
            .messages(_constants_1.commonMessages.INVALID_PASSWORD_FORMAT_MESSAGE),
    }).unknown(false),
};
exports.forgetPasswordSchema = {
    body: joi_1.default.object({
        email: joi_1.default.string().email().required(),
    }),
};
//# sourceMappingURL=auth.validation.js.map