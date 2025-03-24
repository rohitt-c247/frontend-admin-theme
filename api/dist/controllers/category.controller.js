"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeStatus = exports.deleteCategory = exports.updateCategory = exports.getCategory = exports.createCategory = void 0;
//Middlewares
const _middlewares_1 = require("@middlewares");
//Utils
const _utils_1 = require("@utils");
//Constants
//import { FORBIDDEN, categoryMessages } from '@constants';
//Services
const _services_1 = require("@services");
/**
 * Handles creating a new category
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const createCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryName, categoryType, status } = req.body;
        const { status: resStatus, success, message, data } = yield _services_1.categoryService.createCategory(categoryName, categoryType, status);
        if (success) {
            (0, _middlewares_1.responseHandler)(res, message, resStatus, data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, resStatus, data));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.createCategory = createCategory;
/**
 * Handles retrieving categories.
 * If a categoryId is provided, fetch that specific category; otherwise, fetch all categories.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId } = req.params;
        const { page, limit, search, sortBy, orderBy } = req.query;
        const { status, success, message, data } = yield _services_1.categoryService.getCategory(categoryId, Number(page), Number(limit), search, sortBy, orderBy);
        if (success) {
            (0, _middlewares_1.responseHandler)(res, message, status, data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, status, data));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.getCategory = getCategory;
/**
 * Handles updating a category's information
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const updateCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId } = req.params;
        const { categoryName, categoryType, status } = req.body;
        const { status: resStatus, success, message, data } = yield _services_1.categoryService.updateCategory(categoryId, categoryName, categoryType, status);
        if (success) {
            (0, _middlewares_1.responseHandler)(res, message, resStatus, data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, resStatus, data));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.updateCategory = updateCategory;
/**
 * Handles deleting a category based on the provided category ID.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const deleteCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId } = req.params;
        const { status, success, message, data } = yield _services_1.categoryService.deleteCategory(categoryId);
        if (success) {
            (0, _middlewares_1.responseHandler)(res, message, status, data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, status, data));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.deleteCategory = deleteCategory;
/**
 * Handles category status change requests
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const changeStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId } = req.params;
        const { status, success, message, data } = yield _services_1.categoryService.changeStatus(categoryId, req.body.status);
        if (success) {
            (0, _middlewares_1.responseHandler)(res, message, status, data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, status, data));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.changeStatus = changeStatus;
//# sourceMappingURL=category.controller.js.map