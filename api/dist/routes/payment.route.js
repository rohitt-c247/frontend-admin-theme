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
// Stripe product related routes
router.post('/product', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.Admin), (0, _middlewares_1.validate)(_validations_1.paymentValidations.createProductionValidator), _controllers_1.paymentController.createProduct);
router.get('/product/list', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.Admin), _controllers_1.paymentController.getProductList);
router.delete('/product/:productId', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.Admin), _controllers_1.paymentController.deleteProduct);
router.get('/product/:productId', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.Admin), _controllers_1.paymentController.getProductById);
router.put('/product/:productId', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.Admin), (0, _middlewares_1.validate)(_validations_1.paymentValidations.updateProductionValidator), _controllers_1.paymentController.updateProduct);
// Stripe plan related routes
router.post('/plan', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.Admin), (0, _middlewares_1.validate)(_validations_1.paymentValidations.createPriceValidator), _controllers_1.paymentController.createPrice);
router.get('/plan/:priceId', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.Admin), _controllers_1.paymentController.getPriceById);
router.put('/plan', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.Admin), (0, _middlewares_1.validate)(_validations_1.paymentValidations.updatePriceValidator), _controllers_1.paymentController.updatePrice);
// create customer Related routes
router.post('/customer/create', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.User), (0, _middlewares_1.validate)(_validations_1.paymentValidations.createCustomerValidator), _controllers_1.paymentController.createCustomer);
router.get('/customer/:customerId', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.User), _controllers_1.paymentController.getCustomerById);
router.delete('/customer/:customerId', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.User), _controllers_1.paymentController.deleteCustomer);
router.put('/customer', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.User), (0, _middlewares_1.validate)(_validations_1.paymentValidations.updateCustomerValidator), _controllers_1.paymentController.updateCustomer);
// Stripe subscription related routes
// post (usage) paid
router.post('/subscription/usage/session', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.User), (0, _middlewares_1.validate)(_validations_1.paymentValidations.createSubscriptionValidator), _controllers_1.paymentController.createPostPaidSubscriptionSession);
// pre paid
router.post('/subscription/pre-paid/session', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.User), (0, _middlewares_1.validate)(_validations_1.paymentValidations.createSubscriptionValidator), _controllers_1.paymentController.createPrePaymentSubcriptionSession);
router.post('/subscription/create/free-trial', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.User), (0, _middlewares_1.validate)(_validations_1.paymentValidations.createSubscriptionValidator), _controllers_1.paymentController.createPostPaymentSubcription);
router.get('/subscription/:subscriptionId', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.User), _controllers_1.paymentController.getSubcriptionById);
router.delete('/subscription/:subscriptionId', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.User), _controllers_1.paymentController.deleteSubcriptionById);
router.put('/subscription', _middlewares_1.authenticate, 
// authorize(Role.User),
(0, _middlewares_1.validate)(_validations_1.paymentValidations.updateSubscriptionValidator), _controllers_1.paymentController.updateSubscription);
// Stripe one time payment related routes
router.post('/one-time-payment', _middlewares_1.authenticate, (0, _middlewares_1.authorize)(_enums_1.Role.User), (0, _middlewares_1.validate)(_validations_1.paymentValidations.createOneTimePaymentValidator), _controllers_1.paymentController.oneTimePaymentProcess);
// Stripe webhook related route
router.post('/webhook', _controllers_1.paymentController.paymentWebhooks);
exports.default = router;
//# sourceMappingURL=payment.route.js.map