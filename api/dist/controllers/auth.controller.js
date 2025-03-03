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
exports.changePassword = exports.resetPassword = exports.forgetPassword = exports.updateProfile = exports.userProfile = exports.login = exports.verifyEmail = exports.register = void 0;
const logger_1 = require("@config/logger");
//Constants
const _constants_1 = require("@constants");
//Middlewares
const _middlewares_1 = require("@middlewares");
//Services
const _services_1 = require("@services");
//Utils
const _utils_1 = require("@utils");
/**
 * Handles registering a user
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const response = yield _services_1.authService.register(body);
        const { success, message, status, data } = response;
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
exports.register = register;
/**
 * Handles verify user by clicking on email verification link.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const verifyEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.logger.log(`verify email: ${req.body}`);
        const { token } = req.body;
        if (!token) {
            next(new _utils_1.ErrorHandler(_constants_1.authMessages.VERIFY_EMAIL_TOKEN_MISSING, _constants_1.NOT_FOUND, null));
        }
        const response = yield _services_1.authService.verifyEmail(token);
        const { success, message, status, data } = response;
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
exports.verifyEmail = verifyEmail;
/**
 * Handles login a user
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const response = yield _services_1.authService.login(payload, res);
        const { success, message, status, data } = response;
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
exports.login = login;
/**
 * Handles user profile
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const userProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return next(new _utils_1.ErrorHandler(_constants_1.commonMessages.USER_NOT_FOUND, _constants_1.UNAUTHORIZE, null));
        }
        const response = yield _services_1.authService.userProfile(user);
        const { success, message, status, data } = response;
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
exports.userProfile = userProfile;
/**
 * Handles updating user profile.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const updateProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return next(new _utils_1.ErrorHandler(_constants_1.commonMessages.USER_NOT_FOUND, _constants_1.UNAUTHORIZE, null));
        }
        const body = req.body;
        const response = yield _services_1.authService.updateProfile(user, body);
        const { success, message, status, data } = response;
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
exports.updateProfile = updateProfile;
/**
 * Handles user forget password
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const forgetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const response = yield _services_1.authService.forgetPassword(body);
        const { success, message, status, data } = response;
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
exports.forgetPassword = forgetPassword;
/**
 * Handles user reset password by clicking on email reset link.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const response = yield _services_1.authService.resetPassword(body);
        const { success, message, status, data } = response;
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
exports.resetPassword = resetPassword;
/**
 * Handles change password by logged-in user
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const user = req.user;
        if (!user) {
            return next(new _utils_1.ErrorHandler(_constants_1.commonMessages.USER_NOT_FOUND, _constants_1.UNAUTHORIZE, null));
        }
        const response = yield _services_1.authService.changePassword(user, body);
        const { success, message, status, data } = response;
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
exports.changePassword = changePassword;
//# sourceMappingURL=auth.controller.js.map