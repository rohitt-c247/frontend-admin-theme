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
exports.localFileUpload = exports.fetchLocalFileList = exports.fetchLocalFile = void 0;
// Constants
const _constants_1 = require("@constants");
// Middlewares
const _middlewares_1 = require("@middlewares");
// Services
const _services_1 = require("@services");
// Utils
const _utils_1 = require("@utils");
/**
 * Handles get file details from local storage
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const fetchLocalFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileId = req.params.fileId;
        const response = yield _services_1.localFileHandlerService.fetchLocalFile(fileId);
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
exports.fetchLocalFile = fetchLocalFile;
/**
 * Handles local file listing by user or admin
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const fetchLocalFileList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return next(new _utils_1.ErrorHandler(_constants_1.commonMessages.UNAUTHORIZED, _constants_1.UNAUTHORIZE, null));
        }
        const response = yield _services_1.localFileHandlerService.fetchLocalFileList(user);
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
exports.fetchLocalFileList = fetchLocalFileList;
/**
 * Handles local file uploading
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const localFileUpload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return next(new _utils_1.ErrorHandler(_constants_1.commonMessages.USER_NOT_FOUND, _constants_1.UNAUTHORIZE, null));
        }
        if (!(req === null || req === void 0 ? void 0 : req.files)) {
            next(new _utils_1.ErrorHandler(_constants_1.fileHandlerMessages.SELECTED_FILE_ERROR, _constants_1.NOT_FOUND, null));
        }
        const filesParse = JSON.parse(JSON.stringify(req.files));
        const response = yield _services_1.localFileHandlerService.localFileUpload(user, filesParse);
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
exports.localFileUpload = localFileUpload;
//# sourceMappingURL=localFileHandler.controller.js.map