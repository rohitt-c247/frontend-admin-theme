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
router.post('/', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.Admin), (0, _middlewares_1.validate)(_validations_1.categoryValidations.createCategorySchema), _controllers_1.categoryController.createCategory);
router.get('/:categoryId?', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.Admin), _controllers_1.categoryController.getCategory);
router.delete('/:categoryId', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.Admin), _controllers_1.categoryController.deleteCategory);
router.put('/:categoryId', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.Admin), (0, _middlewares_1.validate)(_validations_1.categoryValidations.updateCategorySchema), _controllers_1.categoryController.updateCategory);
router.put('/change-status/:categoryId', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.Admin), (0, _middlewares_1.validate)(_validations_1.categoryValidations.changeStatusSchema), _controllers_1.categoryController.changeStatus);
exports.default = router;
//# sourceMappingURL=category.route.js.map