"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Controllers
const _controllers_1 = require("@controllers");
//Enums
const _enums_1 = require("@enums");
//Middlewares
const _middlewares_1 = require("@middlewares");
//Validations
const _validations_1 = require("@validations");
//Third-party modules
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.Admin), (0, _middlewares_1.validate)(_validations_1.userValidations.createUserSchema), _controllers_1.userController.createUser);
router.get('/:userId?', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.Admin), _controllers_1.userController.getUsers);
router.delete('/:userId', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.Admin), _controllers_1.userController.deleteUser);
router.put('/:userId', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.Admin), (0, _middlewares_1.validate)(_validations_1.userValidations.updateUserSchema), _controllers_1.userController.updateUser);
router.put('/change-status/:userId', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.Admin), (0, _middlewares_1.validate)(_validations_1.userValidations.changeStatusSchema), _controllers_1.userController.changeStatus);
router.post('/set-password', (0, _middlewares_1.validate)(_validations_1.userValidations.setPasswordSchema), _controllers_1.userController.setPassword);
exports.default = router;
//# sourceMappingURL=user.route.js.map