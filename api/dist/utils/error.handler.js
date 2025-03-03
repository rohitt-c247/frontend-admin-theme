"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchHandler = exports.ErrorHandler = void 0;
const envVar_1 = __importDefault(require("@config/envVar"));
const _constants_1 = require("@constants");
class ErrorHandler extends Error {
    constructor(message, statusCode, err = null, success = false) {
        super(message);
        this.statusCode = statusCode;
        this.error = err;
        this.success = success;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ErrorHandler = ErrorHandler;
/**
 * A centralized error-handling utility to catch and propagate errors.
 * Logs the error (optional) and passes it to the next middleware with a standard structure.
 *
 * @param error - The error object, which can be of any type.
 * @param next - The Express `NextFunction` to pass control to the error-handling middleware.
 */
const catchHandler = (error, next) => {
    const errorMessage = error instanceof Error ? error.message : _constants_1.commonMessages.INTERNAL_SERVER_ERROR;
    // Optional: Log the error for debugging in development.
    if (envVar_1.default.NODE_ENV !== 'production') {
        console.error('Error caught in catchHandler:', error);
    }
    // Passes the structured error to the next middleware.
    next(new ErrorHandler(errorMessage, _constants_1.SERVER_ERROR, error));
};
exports.catchHandler = catchHandler;
//# sourceMappingURL=error.handler.js.map