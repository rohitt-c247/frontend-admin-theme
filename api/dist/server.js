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
// Third-party libraries
require("module-alias/register"); // Import at the top
const db_1 = __importDefault(require("@config/db"));
const envVar_1 = __importDefault(require("@config/envVar"));
const logger_1 = require("@config/logger");
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("./app");
require("./types/common.type");
const node_http_1 = require("node:http");
const _utils_1 = require("@utils");
dotenv_1.default.config();
const App = (0, app_1.createApp)();
const httpServer = (0, node_http_1.createServer)(App);
const port = Number(envVar_1.default.PORT);
/**
 * Initializes the application by connecting to the database and starting the server.
 *
 * This function will exit the process if connecting to the database fails.
 */
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.default)();
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : error;
        logger_1.logger.error(`Could not connect to: ${envVar_1.default.MONGODB_URI} : ${errorMessage}`);
        process.exit(1);
    }
    yield startApplication();
});
/**
 * Starts the Express server by making it listen on the specified port.
 *
 * This function will trigger the {@link onServerListen} callback when the server
 * is successfully listening.
 */
const startApplication = () => __awaiter(void 0, void 0, void 0, function* () {
    const socketService = yield _utils_1.commonHandler.conditionalImport('src/services/socket.service.ts', '../services/socket.service');
    if (socketService === null || socketService === void 0 ? void 0 : socketService.initializeSocketIO) {
        socketService.initializeSocketIO(httpServer);
    }
    httpServer.listen(port, () => onServerListen());
});
/**
 * Logs a message when the Express server is successfully listening on the specified port.
 *
 * @remarks This function is called by {@link startApplication} when the server is ready.
 */
const onServerListen = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.info(`Express server listening on port ${port}`);
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield run();
}))();
//# sourceMappingURL=server.js.map