"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appValidator = exports.verifyCodeValidator = exports.smsValidator = exports.generateSecretValidator = exports.activeValidator = void 0;
const _enums_1 = require("@enums");
const joi_1 = __importDefault(require("joi"));
exports.activeValidator = {
    body: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        isTwoAuthEnabled: joi_1.default.boolean().required(),
        password: joi_1.default.string().required(),
        twoFAMethodType: joi_1.default.string()
            .valid(...Object.values(_enums_1.TwoFactorMethod)) // Ensure the methodType is one of the allowed values
            .required(),
    }),
};
exports.generateSecretValidator = {
    body: joi_1.default.object({
        email: joi_1.default.string().email().optional(),
        password: joi_1.default.string().optional(),
        twoFAMethodType: joi_1.default.string()
            .valid(...Object.values(_enums_1.TwoFactorMethod)) // Ensure the methodType is one of the allowed values
            .required(),
        phoneNumber: joi_1.default.string().optional(),
    }),
};
exports.smsValidator = {
    body: joi_1.default.object({
        phoneNumber: joi_1.default.string().required(),
    }),
};
exports.verifyCodeValidator = {
    body: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        otp: joi_1.default.number().required(),
    }),
};
exports.appValidator = {
    body: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        otp: joi_1.default.number().optional(),
    }),
};
//# sourceMappingURL=twoFA.validation.js.map