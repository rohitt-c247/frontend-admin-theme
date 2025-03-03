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
exports.socketAuthMiddleware = void 0;
//Constants
const _constants_1 = require("@constants");
//Internal modules
const envVar_1 = __importDefault(require("@config/envVar"));
const logger_1 = require("@config/logger");
//Utils
const _utils_1 = require("@utils");
/**
 * Socket authentication middleware.
 *
 * This middleware verifies the JWT token in the socket handshake and authorizes the connection.
 * If the token is invalid or missing, it returns an error to the client.
 * If the token is valid, it adds the user's ID and email to the socket data.
 *
 * @param {Socket} socket - Socket.IO socket object.
 * @param {(err?: Error) => void} next - Next function to call in the middleware chain.
 */
const socketAuthMiddleware = (socket, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = socket.handshake.auth.token || ((_a = socket.handshake.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', ''));
        if (!token) {
            return next(new _utils_1.ErrorHandler(_constants_1.commonMessages.UNAUTHORIZED, _constants_1.UNAUTHORIZE));
        }
        // Verify JWT token
        const jwtSecret = envVar_1.default.JWT_SECRET || 'secret';
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
        socket.data.user = {
            id: decoded.id,
            email: decoded.email,
        };
        next();
    }
    catch (error) {
        logger_1.logger.error(`Socket authentication failed: ${error}`);
        next(new Error('Authentication failed'));
    }
});
exports.socketAuthMiddleware = socketAuthMiddleware;
//# sourceMappingURL=notification.js.map