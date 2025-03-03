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
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentWebhooks = exports.oneTimePaymentProcess = exports.createPostPaidSubscriptionSession = exports.updateSubscription = exports.deleteSubcriptionById = exports.getSubcriptionById = exports.createPostPaymentSubcription = exports.createPrePaymentSubcriptionSession = exports.deleteCustomer = exports.updateCustomer = exports.getCustomerById = exports.createCustomer = exports.updatePrice = exports.getPriceById = exports.createPrice = exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getProductList = exports.createProduct = void 0;
//Middlewares
const _middlewares_1 = require("@middlewares");
//Constants
const _constants_1 = require("@constants");
//Utils
const _utils_1 = require("@utils");
//Services
const _services_1 = require("@services");
/**
 * Handles creating a new product
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, success, message, data } = yield _services_1.paymentService.addProduct(req.body);
        if (success) {
            (0, _middlewares_1.responseHandler)(res, message, status, data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, status, data));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.createProduct = createProduct;
/**
 * Handles get products
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getProductList = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, success, message, data } = yield _services_1.paymentService.getList();
        if (success) {
            (0, _middlewares_1.responseHandler)(res, message, status, data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, status, data));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.getProductList = getProductList;
/**
 * Handles get product by id
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, success, message, data } = yield _services_1.paymentService.getByProductId(req.params.productId);
        if (success) {
            (0, _middlewares_1.responseHandler)(res, message, status, data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, status, data));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.getProductById = getProductById;
/**
 * Handles update product
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, success, message, data } = yield _services_1.paymentService.updateProductDetails(req.body);
        if (success) {
            (0, _middlewares_1.responseHandler)(res, message, status, data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, status, data));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.updateProduct = updateProduct;
/**
 * Handles delete product
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, success, message, data } = yield _services_1.paymentService.deleteByProductId(req.params.proDUCTID);
        if (success) {
            (0, _middlewares_1.responseHandler)(res, message, status, data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, status, data));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.deleteProduct = deleteProduct;
/**
 * Handles creating a new price
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const createPrice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, success, message, data } = yield _services_1.paymentService.addPrice(req.body);
        if (success) {
            (0, _middlewares_1.responseHandler)(res, message, status, data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, status, data));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.createPrice = createPrice;
/**
 * Handles Get price
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getPriceById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, success, message, data } = yield _services_1.paymentService.getPlanByPriceId(req.params.priceId);
        if (success) {
            (0, _middlewares_1.responseHandler)(res, message, status, data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, status, data));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.getPriceById = getPriceById;
/**
 * Handles update a price
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const updatePrice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, success, message, data } = yield _services_1.paymentService.updatePriceDetails(req.body);
        if (success) {
            (0, _middlewares_1.responseHandler)(res, message, status, data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, status, data));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.updatePrice = updatePrice;
/**
 * Handles creating a new customer
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const createCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name } = req.body;
        const { status, success, message, data } = yield _services_1.paymentService.addCustomer(email, name);
        if (success) {
            (0, _middlewares_1.responseHandler)(res, message, status, data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, status, data));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.createCustomer = createCustomer;
/**
 * Handles get customer by id
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getCustomerById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, success, message, data } = yield _services_1.paymentService.getByCustomerId(req.params.customerId);
        if (success) {
            (0, _middlewares_1.responseHandler)(res, message, status, data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, status, data));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.getCustomerById = getCustomerById;
/**
 * Handles update customer
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const updateCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, success, message, data } = yield _services_1.paymentService.updateCustomerDetails(req.body.customerId, req.body.email, req.body.description);
        if (success) {
            (0, _middlewares_1.responseHandler)(res, message, status, data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, status, data));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.updateCustomer = updateCustomer;
/**
 * Handles delete customer
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const deleteCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, success, message, data } = yield _services_1.paymentService.deleteCustomer(req.params.customerId);
        if (success) {
            (0, _middlewares_1.responseHandler)(res, message, status, data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, status, data));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.deleteCustomer = deleteCustomer;
/**
 * Handles pre paid subscription session
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const createPrePaymentSubcriptionSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId, priceId, currency, quantity } = req.body;
        const { status, success, message, data } = yield _services_1.paymentService.prePaymentSubcriptionSession(customerId, priceId, currency, quantity);
        if (success) {
            (0, _middlewares_1.responseHandler)(res, message, status, data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, status, data));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.createPrePaymentSubcriptionSession = createPrePaymentSubcriptionSession;
/**
 * Handles post paid subscription
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const createPostPaymentSubcription = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId, priceId, currency, trialDays } = req.body;
        const { status, success, message, data } = yield _services_1.paymentService.createPostSubscription(customerId, priceId, currency, trialDays);
        if (success) {
            (0, _middlewares_1.responseHandler)(res, message, status, data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, status, data));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.createPostPaymentSubcription = createPostPaymentSubcription;
/**
 * Handles get subscription
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getSubcriptionById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, success, message, data } = yield _services_1.paymentService.fetchSubscriptionById(req.params.subscriptionId);
        if (success) {
            (0, _middlewares_1.responseHandler)(res, message, status, data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, status, data));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.getSubcriptionById = getSubcriptionById;
/**
 * Handles get subscription
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const deleteSubcriptionById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, success, message, data } = yield _services_1.paymentService.deleteBysubscriptionId(req.params.subscriptionId);
        if (success) {
            (0, _middlewares_1.responseHandler)(res, message, status, data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, status, data));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.deleteSubcriptionById = deleteSubcriptionById;
/**
 * Handles update subscription
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const updateSubscription = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subscriptionId, discription } = req.body;
        const { status, success, message, data } = yield _services_1.paymentService.updatePrepaidSubscription(subscriptionId, discription);
        if (success) {
            (0, _middlewares_1.responseHandler)(res, message, status, data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, status, data));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.updateSubscription = updateSubscription;
/**
 * Handles create usages subscription
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const createPostPaidSubscriptionSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, success, message, data } = yield _services_1.paymentService.createUsagesSubscriptionSession(req.params.customerId, req.body.priceId, req.body.currency);
        if (success) {
            (0, _middlewares_1.responseHandler)(res, message, status, data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, status, data));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.createPostPaidSubscriptionSession = createPostPaidSubscriptionSession;
/**
 * Handles get subscription
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const oneTimePaymentProcess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customer, price, currency, quantity } = req.body;
        const { status, success, message, data } = yield _services_1.paymentService.onetimeProcess(customer, price, currency, quantity);
        if (success) {
            (0, _middlewares_1.responseHandler)(res, message, status, data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, status, data));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.oneTimePaymentProcess = oneTimePaymentProcess;
/**
 * Handles get webhooks
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const paymentWebhooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield _services_1.stripeService.webhookService(req);
        (0, _middlewares_1.responseHandler)(res, _constants_1.paymentMessages.WEBHOOK_CALL, _constants_1.OK, null);
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.paymentWebhooks = paymentWebhooks;
//# sourceMappingURL=payment.controller.js.map