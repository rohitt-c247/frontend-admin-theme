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
exports.s3FileUpload = exports.fetchS3FileList = exports.fetchS3File = void 0;
// Constants
const _constants_1 = require("@constants");
// Middlewares
const _middlewares_1 = require("@middlewares");
// Services
const _services_1 = require("@services");
// Utils
const _utils_1 = require("@utils");
/**
 * Handles get file details from s3-bucket
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const fetchS3File = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileId = req.params.fileId;
        const response = yield _services_1.s3FileHandlerService.fetchS3File(fileId);
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
exports.fetchS3File = fetchS3File;
/**
 * Handles s3 file listing
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const fetchS3FileList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return next(new _utils_1.ErrorHandler(_constants_1.commonMessages.USER_NOT_FOUND, _constants_1.UNAUTHORIZE, null));
        }
        const response = yield _services_1.s3FileHandlerService.fetchS3FileList(user);
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
exports.fetchS3FileList = fetchS3FileList;
/**
 * Handles file uploading on aws s3.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const s3FileUpload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return next(new _utils_1.ErrorHandler(_constants_1.commonMessages.USER_NOT_FOUND, _constants_1.UNAUTHORIZE, null));
        }
        if (!(req === null || req === void 0 ? void 0 : req.files)) {
            next(new _utils_1.ErrorHandler(_constants_1.fileHandlerMessages.SELECTED_FILE_ERROR, _constants_1.NOT_FOUND, null));
        }
        const filesParse = JSON.parse(JSON.stringify(req.files));
        const response = yield _services_1.s3FileHandlerService.s3FileUpload(user, filesParse);
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
exports.s3FileUpload = s3FileUpload;
//# sourceMappingURL=s3FileHandler.controller.js.map