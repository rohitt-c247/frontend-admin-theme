"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _controllers_1 = require("@controllers");
const _middlewares_1 = require("@middlewares");
const _validations_1 = require("@validations");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/active', (0, _middlewares_1.validate)(_validations_1.twoFAValidations.activeValidator), _controllers_1.twoFAController.enableTwoFA);
// email /sms/app
router.post('/send-otp', (0, _middlewares_1.validate)(_validations_1.twoFAValidations.generateSecretValidator), _controllers_1.twoFAController.sendTwoFACode);
router.patch('/verify-otp', (0, _middlewares_1.validate)(_validations_1.twoFAValidations.verifyCodeValidator), _controllers_1.twoFAController.verifyTwoFACode);
router.post('/recover', (0, _middlewares_1.validate)(_validations_1.twoFAValidations.appValidator), _controllers_1.twoFAController.recoveryCode);
exports.default = router;
//# sourceMappingURL=twoFA.route.js.map