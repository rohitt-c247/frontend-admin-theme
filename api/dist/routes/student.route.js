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
router.post('/', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.Admin), (0, _middlewares_1.validate)(_validations_1.studentValidations.createStudentSchema), _controllers_1.studentController.createStudent);
router.get('/:userId?', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.Admin), _controllers_1.studentController.getStudent);
router.delete('/:userId', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.Admin), _controllers_1.studentController.deleteStudent);
router.put('/:userId', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.Admin), (0, _middlewares_1.validate)(_validations_1.studentValidations.updateStudentSchema), _controllers_1.studentController.updateStudent);
router.put('/change-status/:userId', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.Admin), (0, _middlewares_1.validate)(_validations_1.studentValidations.changeStatusSchema), _controllers_1.studentController.changeStatus);
router.post('/set-password', (0, _middlewares_1.validate)(_validations_1.studentValidations.setPasswordSchema), _controllers_1.studentController.setPassword);
exports.default = router;
//# sourceMappingURL=student.route.js.map