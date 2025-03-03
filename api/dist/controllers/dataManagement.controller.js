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
exports.deleteDataItemsByBatch = exports.getBatches = exports.downloadPdf = exports.downloadFile = exports.uploadFile = void 0;
// Middlewares
const _middlewares_1 = require("@middlewares");
// Utils
const _utils_1 = require("@utils");
// Services
const _services_1 = require("@services");
// Constants
const _constants_1 = require("@constants");
/**
 * Handles uploading a CSV file
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const uploadFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.files ? JSON.parse(JSON.stringify(req.files)) : null;
        const user = req.user;
        if (!user) {
            return next(new _utils_1.ErrorHandler(_constants_1.commonMessages.USER_NOT_FOUND, _constants_1.UNAUTHORIZE, null));
        }
        const response = yield _services_1.dataManagementService.uploadFile(file, user);
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
exports.uploadFile = uploadFile;
/**
 * Handles downloading a CSV file
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const downloadFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const filters = yield _utils_1.dataManagementHandler.buildFilters(query);
        const user = req.user;
        if (!user) {
            return next(new _utils_1.ErrorHandler(_constants_1.commonMessages.USER_NOT_FOUND, _constants_1.UNAUTHORIZE, null));
        }
        const { status, success, message, data } = yield _services_1.dataManagementService.downloadFile(filters, user);
        if (success) {
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', `attachment; filename="${_constants_1.dataManagementVariables.ATTATCHMENT_NAME}"`);
            res.status(status).send(data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, status));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.downloadFile = downloadFile;
/**
 * Handles downloading a PDF file
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const downloadPdf = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const filters = yield _utils_1.dataManagementHandler.buildFilters(query);
        const user = req.user;
        if (!user) {
            return next(new _utils_1.ErrorHandler(_constants_1.commonMessages.USER_NOT_FOUND, _constants_1.UNAUTHORIZE, null));
        }
        const { status, success, message, data } = yield _services_1.dataManagementService.downloadPdf(filters, user);
        if (success) {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="${_constants_1.dataManagementVariables.PDF_ATTATCHMENT_NAME}"`);
            res.status(status).send(data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, status));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.downloadPdf = downloadPdf;
/**
 * Handles retrieving a list of data batches created by the user
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getBatches = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return next(new _utils_1.ErrorHandler(_constants_1.commonMessages.USER_NOT_FOUND, _constants_1.UNAUTHORIZE, null));
        }
        const { success, message, status, data } = yield _services_1.dataManagementService.getBatches(user);
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
exports.getBatches = getBatches;
/**
 * Handles deleting a batch and its associated data items
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const deleteDataItemsByBatch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.params;
        const { success, message, status, data } = yield _services_1.dataManagementService.deleteDataItemsByBatch(params);
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
exports.deleteDataItemsByBatch = deleteDataItemsByBatch;
//# sourceMappingURL=dataManagement.controller.js.map