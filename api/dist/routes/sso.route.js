"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const _controllers_1 = require("@controllers");
const _enums_1 = require("@enums");
const _middlewares_1 = require("@middlewares");
require("../utils/sso.handler");
const app = (0, express_1.default)();
// Initialize passport and restore authentication state, if any, from the session
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
const router = express_1.default.Router();
router.post('/login', _middlewares_1.passportAuthenticate);
router.get('/google/callback', passport_1.default.authenticate(_enums_1.Strategy.Google, {
    failureRedirect: '/login',
}), _controllers_1.ssoController.ssoLogin);
router.get('/facebook/callback', passport_1.default.authenticate(_enums_1.Strategy.Facebook, {
    failureRedirect: '/login',
}), _controllers_1.ssoController.ssoLogin);
exports.default = router;
//# sourceMappingURL=sso.route.js.map