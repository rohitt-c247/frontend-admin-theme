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
exports.changeStatus = exports.setPassword = exports.updateUser = exports.deleteUser = exports.getUsers = exports.createUser = void 0;
//Middlewares
const _middlewares_1 = require("@middlewares");
//Utils
const _utils_1 = require("@utils");
const _constants_1 = require("@constants");
//Services
const _services_1 = require("@services");
/**
 * Handles creating a new user
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        const { status, success, message, data } = yield _services_1.userService.createUser(name, email);
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
exports.createUser = createUser;
/**
 * Handles retrieving users.
 * If a userId is provided, fetch that specific user; otherwise, fetch all users.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { page, limit, search, sortBy, orderBy } = req.query;
        const { status, success, message, data } = yield _services_1.userService.getUsers(userId, Number(page), Number(limit), search, sortBy, orderBy);
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
exports.getUsers = getUsers;
/**
 * Handles deleting a user based on the provided user ID.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userId } = req.params;
        if (userId === ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id.toString())) {
            next(new _utils_1.ErrorHandler(_constants_1.userMessages.SELF_DELETE_ERROR_MESSAGE, _constants_1.FORBIDDEN, null));
        }
        const { status, success, message, data } = yield _services_1.userService.deleteUser(userId);
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
exports.deleteUser = deleteUser;
/**
 * Controller to handle updating a user's information
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { name, email, role } = req.body;
        const { status, success, message, data } = yield _services_1.userService.updateUser(userId, name, email, role, req.body.status);
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
exports.updateUser = updateUser;
/**
 * Handles user password change requests
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const setPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, password } = req.body;
        const { status, success, message, data } = yield _services_1.userService.setPassword(token, password);
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
exports.setPassword = setPassword;
/**
 * Handles user status change requests
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const changeStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { status, success, message, data } = yield _services_1.userService.changeStatus(userId, req.body.status);
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
//# sourceMappingURL=user.controller.js.map