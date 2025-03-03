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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRateLimiter = exports.validate = exports.authorize = exports.authenticate = void 0;
//Internal modules
const envVar_1 = __importDefault(require("@config/envVar"));
//Constants
const _constants_1 = require("@constants");
//Enums
const _enums_1 = require("@enums");
const _services_1 = require("@services");
//Utils
const _utils_1 = require("@utils");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
/**
 * Middleware to authenticate a user from a JWT token.
 * @param {Request} req - Express request object.
 * @param {Response} _res - Express response object.
 * @param {NextFunction} next - Express next function.
 * @throws {ErrorHandler} An error handler with a 401 status code if the token is invalid or missing.
 */
const authenticate = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Extract token
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token)
            return next(new _utils_1.ErrorHandler(_constants_1.commonMessages.UNAUTHORIZED, _constants_1.UNAUTHORIZE));
        // Verify JWT token
        const jwtSecret = envVar_1.default.JWT_SECRET;
        let decoded;
        try {
            decoded = yield _utils_1.commonHandler.verifyJwt(token, jwtSecret);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (error) {
            const err = error;
            const errorMessage = err.name === _constants_1.commonVariables.TOKEN_EXPIRED_ERROR
                ? _constants_1.commonMessages.SESSION_TIMEOUT
                : _constants_1.commonMessages.INVALID_TOKEN;
            return next(new _utils_1.ErrorHandler(errorMessage, _constants_1.UNAUTHORIZE));
        }
        const userDetails = yield _services_1.userCommonService.getUserById(decoded.id);
        if (!userDetails)
            return next(new _utils_1.ErrorHandler(_constants_1.commonMessages.USER_NOT_FOUND, _constants_1.NOT_FOUND));
        if (userDetails.status === _enums_1.UserStatus.Inactive)
            return next(new _utils_1.ErrorHandler(_constants_1.commonMessages.USER_DEACTIVATE, _constants_1.UNAUTHORIZE));
        req.user = userDetails;
        next();
    }
    catch (err) {
        next(new _utils_1.ErrorHandler(_constants_1.commonMessages.INVALID_TOKEN, _constants_1.UNAUTHORIZE, err));
    }
});
exports.authenticate = authenticate;
/**
 * Middleware to authorize user access based on their role.
 *
 * This function checks if the user's role is included in the allowed roles.
 * If the user is not authorized, it returns a forbidden error.
 * If the user is authorized, it calls the next middleware in the chain.
 *
 * @param {...number[]} roles - Array of allowed roles.
 * @returns {Function} Middleware function to handle authorization.
 */
const authorize = (...roles) => {
    return (req, _res, next) => {
        const user = req.user;
        if (!user || !roles.includes(user.role)) {
            return next(new _utils_1.ErrorHandler(_constants_1.commonMessages.FORBIDDEN_ERROR, _constants_1.FORBIDDEN, null));
        }
        next();
    };
};
exports.authorize = authorize;
/**
 * Middleware to validate request data against provided schemas.
 *
 * This function iterates over a set of schemas and validates the corresponding
 * parts of the request (e.g., body, params, query). If any validation errors
 * occur, it aggregates the error messages and passes them to the next middleware
 * as a `BAD_REQUEST`. If no errors occur, it calls the next middleware in the chain.
 *
 * @param {object} schemas - An object containing Joi schemas for validation.
 * @returns {Function} Middleware function to validate request data.
 */
const validate = (schemas) => {
    return (req, _res, next) => {
        const errors = [];
        _constants_1.commonVariables.SCHEMA_KEYS.forEach((key) => {
            // Ensure that `schemas[key]` exists and is properly typed
            const schema = schemas[key];
            if (schema) {
                const { error } = schema.validate(req[key], { abortEarly: false });
                if (error) {
                    // Safe mapping and error handling
                    const errorMessages = error.details
                        .map((detail) => { var _a; return (_a = detail.message) === null || _a === void 0 ? void 0 : _a.replace(_constants_1.commonVariables.ERROR_MESSAGE_REGEX, ''); })
                        .filter(Boolean); // Filter out any null/undefined messages
                    errors.push(...errorMessages);
                }
            }
        });
        if (errors.length > 0) {
            return next(new _utils_1.ErrorHandler(errors.join(', '), _constants_1.UNPROCESSABLE_ENTITY, null));
        }
        next();
    };
};
exports.validate = validate;
/**
 * Creates a rate limiter middleware
 * @param {number} maxRequests - Maximum number of requests allowed in the time window
 * @param {number} windowMs - Time window in milliseconds
 * @param {string} errorMessage - Message to send when rate limit is exceeded
 * @returns {rateLimit} - Express middleware for rate limiting
 */
const createRateLimiter = (maxRequests, windowMs) => {
    return (0, express_rate_limit_1.default)({
        windowMs,
        max: maxRequests,
        message: {
            status: _constants_1.TOO_MANY_REQUESTS,
            success: false,
            message: _constants_1.commonMessages.TOO_MANY_RESET_ATTEMPTS,
            data: null,
        },
        standardHeaders: true, // Send rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        keyGenerator: (req) => req.body.email || req.query.email,
    });
};
exports.createRateLimiter = createRateLimiter;
//# sourceMappingURL=common.js.map