"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./auth.route"));
const dataManagement_route_1 = __importDefault(require("./dataManagement.route"));
const localFileHandler_route_1 = __importDefault(require("./localFileHandler.route"));
const notification_route_1 = __importDefault(require("./notification.route"));
const payment_route_1 = __importDefault(require("./payment.route"));
const s3FileHandler_route_1 = __importDefault(require("./s3FileHandler.route"));
const sso_route_1 = __importDefault(require("./sso.route"));
const twoFA_route_1 = __importDefault(require("./twoFA.route"));
const user_route_1 = __importDefault(require("./user.route"));
const indexRoute = express_1.default.Router();
indexRoute.use('/auth', auth_route_1.default);
indexRoute.use('/user', user_route_1.default);
indexRoute.use('/local-files', localFileHandler_route_1.default);
indexRoute.use('/s3-files', s3FileHandler_route_1.default);
indexRoute.use('/sso', sso_route_1.default);
indexRoute.use('/two-factor-auth', twoFA_route_1.default);
indexRoute.use('/data-management', dataManagement_route_1.default);
indexRoute.use('/payment', payment_route_1.default);
indexRoute.use('/notification', notification_route_1.default);
exports.default = indexRoute;
//# sourceMappingURL=apiRoute.js.map