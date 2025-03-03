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
exports.responseHandler = exports.errorMiddleware = void 0;
//Constants
const _constants_1 = require("@constants");
//Utils
const _utils_1 = require("@utils");
/**
 * This middleware handles all errors and sends a standardized response to the client.
 * It catches the error from the previous middleware and handles it according to the error type.
 * If the error is not of a specific type, it will be handled as a general internal server error.
 * @param {CustomError} err - The error object from the previous middleware
 * @param {Request} _req - The express request object
 * @param {Response} res - The express response object
 * @param {NextFunction} _next - The next function in the middleware chain
 * @returns {void}
 */
const errorMiddleware = (err, _req, res, _next) => {
    var _a, _b, _c;
    err.statusCode = err.statusCode || _constants_1.SERVER_ERROR;
    err.message = err.message || _constants_1.commonMessages.INTERNAL_SERVER_ERROR;
    err.success = err.success || false;
    err.error = err.error || null;
    switch ((_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.name) {
        case _constants_1.commonVariables.CAST_ERROR:
            err = new _utils_1.ErrorHandler(`${_constants_1.commonMessages.RESOURCE_NOT_FOUND}. Invalid ${err.error.path}`, _constants_1.BAD_REQUEST, err.error.message);
            break;
        case _constants_1.commonVariables.DUPLICATE_KEY_ERROR:
            err = new _utils_1.ErrorHandler(`Duplicate ${Object.keys(err.error.keyValue)} Entered`, _constants_1.BAD_REQUEST, err.error.message);
            break;
        case _constants_1.commonVariables.JSON_WEB_TOKEN_ERROR:
            err = new _utils_1.ErrorHandler(_constants_1.commonMessages.INVALID_TOKEN, _constants_1.BAD_REQUEST);
            break;
        case _constants_1.commonVariables.TOKEN_EXPIRED_ERROR:
            err = new _utils_1.ErrorHandler(_constants_1.commonMessages.EXPIRE_TOKEN, _constants_1.BAD_REQUEST);
            break;
        default:
            if (_constants_1.commonVariables.MONGO_ERRORS.includes((_b = err === null || err === void 0 ? void 0 : err.error) === null || _b === void 0 ? void 0 : _b.name)) {
                err = new _utils_1.ErrorHandler(_constants_1.commonMessages.DATABASE_ERROR, _constants_1.SERVER_ERROR, err.error.message);
            }
            break;
    }
    const response = {
        success: false,
        message: err.message,
    };
    // Only add the data field if it's not null
    if (err.error !== null) {
        response.error = ((_c = err === null || err === void 0 ? void 0 : err.error) === null || _c === void 0 ? void 0 : _c.message) || err.error;
    }
    res.status(err.statusCode || _constants_1.SERVER_ERROR).json(response);
};
exports.errorMiddleware = errorMiddleware;
/**
 * Sends a standardized response to the client.
 * @param {Response} res - The express response object
 * @param {string} message - The message to be sent to the client
 * @param {number} [status=OK] - The status code for the response
 * @param {any} [data=null] - The data to be sent to the client
 * @returns {Promise<void>} - A promise that resolves once the response is sent
 */
const responseHandler = (res_1, message_1, ...args_1) => __awaiter(void 0, [res_1, message_1, ...args_1], void 0, function* (res, message, status = _constants_1.OK, data = null) {
    const response = {
        success: true,
        message,
    };
    // Only add the data field if it's not null
    if (data !== null) {
        response.data = data;
    }
    return res.status(status).json(response);
});
exports.responseHandler = responseHandler;
//# sourceMappingURL=error.js.map