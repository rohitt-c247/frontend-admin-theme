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
exports.createApp = void 0;
const node_path_1 = __importDefault(require("node:path"));
const envVar_1 = __importDefault(require("@config/envVar"));
const _constants_1 = require("@constants");
const _middlewares_1 = require("@middlewares");
const _routes_1 = require("@routes");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// Third-party libraries
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const helmet_1 = __importDefault(require("helmet"));
dotenv_1.default.config();
/**
 * Creates and configures an Express application.
 *
 * - Sets up static file serving for the public directory.
 * - Uses Helmet for security hardening.
 * - Configures JSON parsing with a custom raw body verification.
 * - Enables CORS with allowed origins and methods.
 * - Configures session management using express-session.
 * - Initializes and configures Passport for authentication.
 * - Defines the root route and main API routes.
 * - Sets up Swagger for API documentation.
 * - Includes error handling middleware.
 *
 * @returns {express.Express} The configured Express application.
 */
const createApp = () => {
    const app = (0, express_1.default)();
    const publicDirectory = node_path_1.default.resolve(__dirname, '..', 'public');
    app.use(express_1.default.static(publicDirectory));
    app.use((0, helmet_1.default)());
    app.use(express_1.default.json({
        limit: envVar_1.default.EXPRESS_JSON_LIMIT,
        verify: (req, _res, buf) => {
            req.rawBody = buf.toString();
        },
    }));
    app.use((0, cors_1.default)({
        origin: envVar_1.default.CORS_ORIGIN.split(','),
        methods: 'GET,POST,PUT,PATCH,DELETE',
    }));
    // Configure express-session
    app.use((0, express_session_1.default)({
        secret: envVar_1.default.JWT_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // Set true if using HTTPS
    }));
    // Root route
    app.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.status(_constants_1.OK).send('*** Hello 👋 from Api server ***');
    }));
    // Define main routes
    app.use('/api/v1', _routes_1.indexRoute);
    // Swagger documentation routes
    app.use('/api/v1/docs', _routes_1.swaggerRoute);
    app.get('/api/v1', (_req, res) => {
        res.send('Hello ✋ Boiler Plate 🚀🥳🎉');
    });
    // Error handling middleware
    app.use(_middlewares_1.errorMiddleware);
    app.use((err, _req, res, _next) => {
        const response = res.status(err.statusCode);
        if (err.sendErrMsgToCaller === true && err.message != null && err.message !== '') {
            response.json(err.message);
            return;
        }
        response.send();
    });
    return app;
};
exports.createApp = createApp;
//# sourceMappingURL=app.js.map