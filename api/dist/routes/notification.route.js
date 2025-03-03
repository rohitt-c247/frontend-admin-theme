"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Third-party modules
const express_1 = require("express");
//Middlewares
const _middlewares_1 = require("@middlewares");
//Controllers
const _controllers_1 = require("@controllers");
//Validations
const _validations_1 = require("@validations");
const router = (0, express_1.Router)();
router.get('/', _middlewares_1.authenticate, (0, _middlewares_1.validate)(_validations_1.notificationValidations.getNotificationListSchema), _controllers_1.notificationController.getNotificationList);
exports.default = router;
//# sourceMappingURL=notification.route.js.map