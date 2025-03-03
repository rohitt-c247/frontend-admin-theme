"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Controllers
const _constants_1 = require("@constants");
const _controllers_1 = require("@controllers");
//Middlewares
const _middlewares_1 = require("@middlewares");
//Validations
const _validations_1 = require("@validations");
//Third-party modules
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Rate Limiter for forget password functionality - max 2 requests in 15 minutes
// Using constants for max attempts and window duration
const forgetPasswordLimiter = (0, _middlewares_1.createRateLimiter)(_constants_1.authVariables.FORGET_PASSWORD_MAX_ATTEMPTS, _constants_1.authVariables.FORGET_PASSWORD_WINDOW_MS);
router.post('/register', (0, _middlewares_1.validate)(_validations_1.authValidations.registerSchema), _controllers_1.authController.register);
router.post('/verify-email', _controllers_1.authController.verifyEmail);
router.post('/login', (0, _middlewares_1.validate)(_validations_1.authValidations.loginSchema), _controllers_1.authController.login);
router.post('/forgot-password', (0, _middlewares_1.validate)(_validations_1.authValidations.forgetPasswordSchema), forgetPasswordLimiter, _controllers_1.authController.forgetPassword);
router.post('/reset-password', (0, _middlewares_1.validate)(_validations_1.authValidations.passwordResetSchema), _controllers_1.authController.resetPassword);
router.get('/me', _middlewares_1.authenticate, _controllers_1.authController.userProfile);
router.put('/update-profile', (0, _middlewares_1.validate)(_validations_1.authValidations.updateProfileSchema), _middlewares_1.authenticate, _controllers_1.authController.updateProfile);
router.post('/change-password', _middlewares_1.authenticate, (0, _middlewares_1.validate)(_validations_1.authValidations.changePasswordSchema), _controllers_1.authController.changePassword);
exports.default = router;
//# sourceMappingURL=auth.route.js.map