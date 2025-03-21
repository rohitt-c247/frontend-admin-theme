"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeStatusSchema = exports.getCategoryByIdSchema = exports.deleteCategorySchema = exports.updateCategorySchema = exports.createCategorySchema = void 0;
//Third-party modules
const joi_1 = __importDefault(require("joi"));
//Constants
const _constants_1 = require("@constants");
exports.createCategorySchema = {
    body: joi_1.default.object({
        categoryName: joi_1.default.string()
            .max(_constants_1.commonVariables.MAX_CHARACTERS_LENGTH)
            .required(),
        categoryType: joi_1.default.string()
            .required(),
        status: joi_1.default.number()
            .integer()
            .valid(0, 1) // Using direct status values instead of UserStatus enum
            .default(1)
            .required(),
    }),
};
exports.updateCategorySchema = {
    params: joi_1.default.object({
        categoryId: joi_1.default.number().integer().required(),
    }),
    body: joi_1.default.object({
        categoryName: joi_1.default.string()
            .max(_constants_1.commonVariables.MAX_CHARACTERS_LENGTH)
            .optional(),
        categoryType: joi_1.default.string()
            .optional(),
        status: joi_1.default.number()
            .integer()
            .valid(0, 1) // Using direct status values
            .optional(),
    }),
};
exports.deleteCategorySchema = {
    params: joi_1.default.object({
        categoryId: joi_1.default.number().integer().required(),
    }),
};
exports.getCategoryByIdSchema = {
    params: joi_1.default.object({
        categoryId: joi_1.default.number().integer().required(),
    }),
};
exports.changeStatusSchema = {
    params: joi_1.default.object({
        categoryId: joi_1.default.number().integer().required(),
    }),
    body: joi_1.default.object({
        status: joi_1.default.number().integer().valid(0, 1).required(), // Using direct status values instead of UserStatus
    }),
};
//# sourceMappingURL=category.validation.js.map