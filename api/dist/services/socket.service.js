"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocketIO = exports.socketStore = void 0;
const envVar_1 = __importDefault(require("@config/envVar"));
const logger_1 = require("@config/logger");
const _constants_1 = require("@constants");
const _middlewares_1 = require("@middlewares");
const socket_io_1 = require("socket.io");
exports.socketStore = {
    io: null,
    connectedUsers: new Map(),
};
/**
 * Initializes a Socket.IO server with specified configurations.
 *
 * @param httpServer - The HTTP server instance to bind the Socket.IO server to.
 * @returns The initialized Socket.IO server instance.
 *
 * @throws Will throw an error if the Socket.IO server fails to initialize.
 *
 * The function sets up CORS options, ping intervals, and timeouts based on environment variables.
 * It applies a socket authentication middleware and listens for connection events to handle
 * incoming socket connections.
 */
const initializeSocketIO = (httpServer) => {
    var _a;
    try {
        exports.socketStore.io = new socket_io_1.Server(httpServer, {
            cors: {
                origin: (_a = envVar_1.default.CORS_ORIGIN) === null || _a === void 0 ? void 0 : _a.split(','),
            },
            pingInterval: _constants_1.socketVariables.PING_INTERVAL,
            pingTimeout: _constants_1.socketVariables.PING_TIMEOUT,
        });
        exports.socketStore.io.use(_middlewares_1.socketAuthMiddleware);
        exports.socketStore.io.on('connection', handleConnection);
        logger_1.logger.info('Socket.IO server initialized');
        return exports.socketStore.io;
    }
    catch (error) {
        logger_1.logger.error(`Failed to initialize Socket.IO server: ${error.message}`);
        throw error;
    }
};
exports.initializeSocketIO = initializeSocketIO;
/**
 * Handles a new socket connection by adding the user to the connected users map and setting up
 * socket event listeners.
 *
 * @param socket - The Socket.IO socket instance representing the connected client.
 *
 * The function extracts the user ID and email from the socket's data and stores the connected
 * user's information, including socket ID and last active timestamp, in the socket store.
 * It also joins the socket to a room identified by the user ID and logs the connection event.
 *
 * Listens for:
 * - 'notification': Logs received notifications.
 * - 'disconnect': Invokes the handleDisconnect function when the socket disconnects.
 * - 'error': Invokes the handleError function on socket errors.
 *
 * Catches and logs errors during the connection handling process.
 */
const handleConnection = (socket) => {
    try {
        const { id: userId, email } = socket.data.user;
        exports.socketStore.connectedUsers.set(socket.id, {
            userId,
            socketId: socket.id,
            lastActive: new Date(),
            email,
        });
        socket.join(`user:${userId}`);
        logger_1.logger.info(`Client connected: ${socket.id} (User: ${userId})`);
        socket.on('disconnect', () => handleDisconnect(socket));
        socket.on('error', (error) => handleError(socket, error));
    }
    catch (error) {
        logger_1.logger.error(`Error handling connection for socket ${socket.id}: ${error.message}`);
        socket.disconnect();
    }
};
/**
 * Handles a socket disconnection by removing the user from the connected users map and logging
 * the disconnect event.
 *
 * @param socket - The Socket.IO socket instance representing the disconnected client.
 *
 * The function logs the disconnect event with the socket ID and removes the user information
 * from the socket store.
 *
 * Catches and logs errors during the disconnect handling process.
 */
const handleDisconnect = (socket) => {
    try {
        exports.socketStore.connectedUsers.delete(socket.id);
        logger_1.logger.info(`Client disconnected: ${socket.id}`);
    }
    catch (error) {
        logger_1.logger.error(`Error handling disconnect for socket ${socket.id}: ${error.message}`);
    }
};
/**
 * Handles socket errors by logging the error and removing the user from the connected users map.
 *
 * @param socket - The Socket.IO socket instance representing the client with the error.
 * @param error - The error object containing the error message.
 *
 * The function logs the socket error event with the socket ID and removes the user information
 * from the socket store. If an error occurs during the error handling process, it is logged as well.
 */
const handleError = (socket, error) => {
    try {
        logger_1.logger.error(`Socket error for client ${socket.id}: ${error.message}`);
        exports.socketStore.connectedUsers.delete(socket.id);
    }
    catch (err) {
        logger_1.logger.error(`Error handling socket error for socket ${socket.id}: ${err.message}`);
    }
};
//# sourceMappingURL=socket.service.js.map