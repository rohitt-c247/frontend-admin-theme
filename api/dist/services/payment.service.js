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
exports.onetimeProcess = exports.updatePrepaidSubscription = exports.prePaymentSubcriptionSession = exports.createUsagesSubscriptionSession = exports.deleteBysubscriptionId = exports.createPostSubscription = exports.fetchSubscriptionById = exports.getPlanList = exports.deleteCustomer = exports.updateCustomerDetails = exports.getByCustomerId = exports.addCustomer = exports.updatePriceDetails = exports.getPlanByPriceId = exports.addPrice = exports.deleteByProductId = exports.updateProductDetails = exports.getByProductId = exports.getList = exports.addProduct = void 0;
const _constants_1 = require("@constants");
const _services_1 = require("@services");
/**
 * Handles creating a new product
 * @param {IProduct} data - The product data
 * @returns {Promise<{status: number, success: boolean, message: string, data: null | any}>}
 */
const addProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield _services_1.stripeService.registerProduct(data);
        return {
            status: _constants_1.OK,
            success: true,
            message: _constants_1.paymentMessages.CREATE_PRODUCT,
            data: null,
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : _constants_1.commonMessages.INTERNAL_SERVER_ERROR;
        return {
            status: _constants_1.SERVER_ERROR,
            success: false,
            message: errorMessage,
            data: null,
        };
    }
});
exports.addProduct = addProduct;
/**
 * Handles get products
 * @returns {Promise<{status: number, success: boolean, message: string, data: null | any[]}>}
 */
const getList = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productList = yield _services_1.stripeService.searchProduct();
        if (!productList) {
            return {
                status: _constants_1.NOT_FOUND,
                success: false,
                message: _constants_1.paymentMessages.PRODUCT_NOT_FOUND,
                data: null,
            };
        }
        return {
            status: _constants_1.OK,
            success: true,
            message: _constants_1.paymentMessages.GET_PRODUCT_LIST,
            data: productList,
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : _constants_1.commonMessages.INTERNAL_SERVER_ERROR;
        return {
            status: _constants_1.SERVER_ERROR,
            success: false,
            message: errorMessage,
            data: null,
        };
    }
});
exports.getList = getList;
/**
 * Handles fetching a product by id
 * @param {string} productId - The product id
 * @returns {Promise<{status: number, success: boolean, message: string, data: null | any}>}
 */
const getByProductId = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productDoc = yield _services_1.stripeService.fetchProduct(productId);
        if (!productDoc) {
            return {
                status: _constants_1.NOT_FOUND,
                success: false,
                message: _constants_1.paymentMessages.PRODUCT_NOT_FOUND,
                data: null,
            };
        }
        return {
            status: _constants_1.OK,
            success: true,
            message: _constants_1.paymentMessages.GET_PRODUCT,
            data: productDoc,
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : _constants_1.commonMessages.INTERNAL_SERVER_ERROR;
        return {
            status: _constants_1.SERVER_ERROR,
            success: false,
            message: errorMessage,
            data: null,
        };
    }
});
exports.getByProductId = getByProductId;
/**
 * Handles updating a product
 * @param {IProduct} data - The product data
 * @returns {Promise<{status: number, success: boolean, message: string, data: null | any}>}
 */
const updateProductDetails = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield _services_1.stripeService.modifyProduct(data);
        return {
            status: _constants_1.OK,
            success: true,
            message: _constants_1.paymentMessages.UPDATE_PRODUCT,
            data: null,
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : _constants_1.commonMessages.INTERNAL_SERVER_ERROR;
        return {
            status: _constants_1.SERVER_ERROR,
            success: false,
            message: errorMessage,
            data: null,
        };
    }
});
exports.updateProductDetails = updateProductDetails;
/**
 * Handles deleting a product by id
 * @param {string} id - The product id
 * @returns {Promise<{status: number, success: boolean, message: string, data: null}>}
 */
const deleteByProductId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield _services_1.stripeService.removeProduct(id);
        return {
            status: _constants_1.OK,
            success: true,
            message: _constants_1.paymentMessages.DELETE_PRODUCT,
            data: null,
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : _constants_1.commonMessages.INTERNAL_SERVER_ERROR;
        return {
            status: _constants_1.SERVER_ERROR,
            success: false,
            message: errorMessage,
            data: null,
        };
    }
});
exports.deleteByProductId = deleteByProductId;
/**
 * Handles creating a new plan
 * @param {IPlan} data - The plan data
 * @returns {Promise<{status: number, success: boolean, message: string, data: null | any}>}
 */
const addPrice = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (data && data.usageType === 'licensed') {
            yield _services_1.stripeService.createRecurringPlan(data);
        }
        else if (data && data.usageType === 'metered') {
            yield _services_1.stripeService.createUsagePlan(data);
        }
        else {
            throw new Error('Provide usageType');
        }
        return {
            status: _constants_1.OK,
            success: true,
            message: _constants_1.paymentMessages.CREATE_PLAN,
            data: null,
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : _constants_1.commonMessages.INTERNAL_SERVER_ERROR;
        return {
            status: _constants_1.SERVER_ERROR,
            success: false,
            message: errorMessage,
            data: null,
        };
    }
});
exports.addPrice = addPrice;
/**
 * Retrieves a plan by its price ID from the Stripe service.
 * @param {string} priceId - The ID of the price to retrieve the plan for.
 * @returns {Promise<{status: number, success: boolean, message: string, data: null | any}>}
 */
const getPlanByPriceId = (priceId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const planDetails = yield _services_1.stripeService.getPlanById(priceId);
        if (!planDetails) {
            return {
                status: _constants_1.NOT_FOUND,
                success: false,
                message: _constants_1.paymentMessages.PLAN_NOT_FOUND,
                data: null,
            };
        }
        return {
            status: _constants_1.OK,
            success: true,
            message: _constants_1.paymentMessages.GET_PLAN,
            data: null,
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : _constants_1.commonMessages.INTERNAL_SERVER_ERROR;
        return {
            status: _constants_1.SERVER_ERROR,
            success: false,
            message: errorMessage,
            data: null,
        };
    }
});
exports.getPlanByPriceId = getPlanByPriceId;
/**
 * Updates the price details of a plan using the provided data.
 * @param {IPlanUpdate} data - The plan update data containing details such as description, email, customerId, priceId, and orderId.
 * @returns {Promise<{status: number, success: boolean, message: string, data: null}>}
 */
const updatePriceDetails = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield _services_1.stripeService.updatePlan(data);
        return {
            status: _constants_1.OK,
            success: true,
            message: _constants_1.paymentMessages.UPDATE_PLAN,
            data: null,
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : _constants_1.commonMessages.INTERNAL_SERVER_ERROR;
        return {
            status: _constants_1.SERVER_ERROR,
            success: false,
            message: errorMessage,
            data: null,
        };
    }
});
exports.updatePriceDetails = updatePriceDetails;
/**
 * Creates a new customer in Stripe.
 * @param {string} email - The email address of the new customer.
 * @param {string} name - The name of the new customer.
 * @returns {Promise<{status: number, success: boolean, message: string, data: null | any}>}
 */
const addCustomer = (email, name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield _services_1.stripeService.registerCustomer(email, name);
        return {
            status: _constants_1.OK,
            success: true,
            message: _constants_1.paymentMessages.CREATE_CUSTOMER,
            data: null,
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : _constants_1.commonMessages.INTERNAL_SERVER_ERROR;
        return {
            status: _constants_1.SERVER_ERROR,
            success: false,
            message: errorMessage,
            data: null,
        };
    }
});
exports.addCustomer = addCustomer;
/**
 * Fetches a customer by id from Stripe.
 * @param {string} id - The id of the customer to fetch.
 * @returns {Promise<{status: number, success: boolean, message: string, data: null | Stripe.Customer}>}
 */
const getByCustomerId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield _services_1.stripeService.fetchCustomer(id);
        if (!customer) {
            return {
                status: _constants_1.NOT_FOUND,
                success: false,
                message: _constants_1.paymentMessages.CUSTOMER_NOT_FOUND,
                data: null,
            };
        }
        return {
            status: _constants_1.OK,
            success: true,
            message: _constants_1.paymentMessages.GET_CUSTOMER,
            data: customer,
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : _constants_1.commonMessages.INTERNAL_SERVER_ERROR;
        return {
            status: _constants_1.SERVER_ERROR,
            success: false,
            message: errorMessage,
            data: null,
        };
    }
});
exports.getByCustomerId = getByCustomerId;
/**
 * Updates a customer in Stripe.
 * @param {string} customerId - The id of the customer to update.
 * @param {string} email - The new email address of the customer.
 * @param {string} description - The new description of the customer.
 * @returns {Promise<{status: number, success: boolean, message: string, data: null | any}>}
 */
const updateCustomerDetails = (customerId, email, description) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const priceList = yield _services_1.stripeService.modifyCustomer(customerId, email, description);
        return {
            status: _constants_1.OK,
            success: true,
            message: _constants_1.paymentMessages.UPDATE_CUSTOMER,
            data: priceList,
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : _constants_1.commonMessages.INTERNAL_SERVER_ERROR;
        return {
            status: _constants_1.SERVER_ERROR,
            success: false,
            message: errorMessage,
            data: null,
        };
    }
});
exports.updateCustomerDetails = updateCustomerDetails;
/**
 * Deletes a customer from Stripe.
 * @param {string} id - The id of the customer to delete.
 * @returns {Promise<{status: number, success: boolean, message: string, data: null | any}>}
 */
const deleteCustomer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const priceList = yield _services_1.stripeService.removeCustomer(id);
        return {
            status: _constants_1.OK,
            success: true,
            message: _constants_1.paymentMessages.DELETE_CUSTOMER,
            data: priceList,
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : _constants_1.commonMessages.INTERNAL_SERVER_ERROR;
        return {
            status: _constants_1.SERVER_ERROR,
            success: false,
            message: errorMessage,
            data: null,
        };
    }
});
exports.deleteCustomer = deleteCustomer;
/**
 * Retrieves a list of all available plans from the Stripe service.
 * @returns {Promise<{status: number, success: boolean, message: string, data: null | any[]}>}
 *  - An object containing the HTTP status code, success flag, message, and a list of plans.
 */
const getPlanList = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const priceList = yield _services_1.stripeService.getPlans();
        return {
            status: _constants_1.OK,
            success: true,
            message: _constants_1.paymentMessages.GET_PLAN_LIST,
            data: priceList,
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : _constants_1.commonMessages.INTERNAL_SERVER_ERROR;
        return {
            status: _constants_1.SERVER_ERROR,
            success: false,
            message: errorMessage,
            data: null,
        };
    }
});
exports.getPlanList = getPlanList;
/**
 * Retrieves a subscription by id from Stripe.
 * @param {string} id - The id of the subscription to fetch.
 * @returns {Promise<{status: number, success: boolean, message: string, data: null | Stripe.Subscription}>}
 */
const fetchSubscriptionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscriptionDetails = yield _services_1.stripeService.fetchSubscription(id);
        if (!subscriptionDetails) {
            return {
                status: _constants_1.NOT_FOUND,
                success: false,
                message: _constants_1.paymentMessages.CUSTOMER_NOT_FOUND,
                data: null,
            };
        }
        return {
            status: _constants_1.OK,
            success: true,
            message: _constants_1.paymentMessages.GET_SUBSCRIPTION,
            data: subscriptionDetails,
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : _constants_1.commonMessages.INTERNAL_SERVER_ERROR;
        return {
            status: _constants_1.SERVER_ERROR,
            success: false,
            message: errorMessage,
            data: null,
        };
    }
});
exports.fetchSubscriptionById = fetchSubscriptionById;
/**
 * Creates a new subscription with the given customer, price, currency, and trial days.
 * @param {string} customer - The id of the customer to create the subscription for.
 * @param {string} price - The id of the price to use for the subscription.
 * @param {string} currency - The currency of the price.
 * @param {number} trailDays - The number of trial days for the subscription.
 * @returns {Promise<{status: number, success: boolean, message: string, data: null}>}
 */
const createPostSubscription = (customer, price, currency, trailDays) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield _services_1.stripeService.subscriptionService(customer, price, currency, trailDays);
        return {
            status: _constants_1.OK,
            success: true,
            message: _constants_1.paymentMessages.CREATE_SUBSCRIPTION,
            data: null,
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : _constants_1.commonMessages.INTERNAL_SERVER_ERROR;
        return {
            status: _constants_1.SERVER_ERROR,
            success: false,
            message: errorMessage,
            data: null,
        };
    }
});
exports.createPostSubscription = createPostSubscription;
/**
 * Cancels a subscription by id from Stripe.
 * @param {string} id - The id of the subscription to cancel.
 * @returns {Promise<{status: number, success: boolean, message: string, data: null | Stripe.Subscription}>}
 */
const deleteBysubscriptionId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield _services_1.stripeService.cancelSubscription(id);
        return {
            status: _constants_1.OK,
            success: true,
            message: _constants_1.paymentMessages.DELETE_SUBSCRIPTION,
            data: null,
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : _constants_1.commonMessages.INTERNAL_SERVER_ERROR;
        return {
            status: _constants_1.SERVER_ERROR,
            success: false,
            message: errorMessage,
            data: null,
        };
    }
});
exports.deleteBysubscriptionId = deleteBysubscriptionId;
/**
 * Creates a usage based subscription session for a given customer, price and currency.
 * @param {string} customer - The id of the customer to create the subscription for.
 * @param {string} price - The id of the price to use for the subscription.
 * @param {string} currency - The currency to use for the subscription.
 * @returns {Promise<{status: number, success: boolean, message: string, data: {url: string}|null}>}
 */
const createUsagesSubscriptionSession = (customer, price, currency) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sessionUrl = yield _services_1.stripeService.usageBasedSubscriptionSession(customer, price, currency);
        return {
            status: _constants_1.OK,
            success: true,
            message: _constants_1.paymentMessages.CREATE_SUBSCRIPTION,
            data: { url: sessionUrl },
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : _constants_1.commonMessages.INTERNAL_SERVER_ERROR;
        return {
            status: _constants_1.SERVER_ERROR,
            success: false,
            message: errorMessage,
            data: null,
        };
    }
});
exports.createUsagesSubscriptionSession = createUsagesSubscriptionSession;
/**
 * Creates a prepaid subscription session for a given customer, price and currency.
 * @param {string} customer - The id of the customer to create the subscription for.
 * @param {string} price - The id of the price to use for the subscription.
 * @param {string} currency - The currency to use for the subscription.
 * @param {number} quantity - The number of licenses to purchase.
 * @returns {Promise<{status: number, success: boolean, message: string, data: {url: string}|null}>}
 */
const prePaymentSubcriptionSession = (customer, price, currency, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sessionUrl = yield _services_1.stripeService.prePaidSubscriptionSession(customer, price, currency, quantity);
        return {
            status: _constants_1.OK,
            success: true,
            message: _constants_1.paymentMessages.CREATE_SUBSCRIPTION,
            data: { url: sessionUrl },
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : _constants_1.commonMessages.INTERNAL_SERVER_ERROR;
        return {
            status: _constants_1.SERVER_ERROR,
            success: false,
            message: errorMessage,
            data: null,
        };
    }
});
exports.prePaymentSubcriptionSession = prePaymentSubcriptionSession;
/**
 * Updates a prepaid subscription by given subscriptionId and description.
 * @param {string} subscriptionId - The id of the subscription to update.
 * @param {string} description - The description for the subscription.
 * @returns {Promise<{status: number, success: boolean, message: string, data: {url: string}|null}>}
 */
const updatePrepaidSubscription = (subscriptionId, description) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sessionUrl = yield _services_1.stripeService.updatePrepaidTypeSubscription(subscriptionId, description);
        return {
            status: _constants_1.OK,
            success: true,
            message: _constants_1.paymentMessages.UPDATE_SUBSCRIPTION,
            data: { url: sessionUrl },
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : _constants_1.commonMessages.INTERNAL_SERVER_ERROR;
        return {
            status: _constants_1.SERVER_ERROR,
            success: false,
            message: errorMessage,
            data: null,
        };
    }
});
exports.updatePrepaidSubscription = updatePrepaidSubscription;
/**
 * Process one time payment.
 * @param {string} customer - The id of the customer to charge.
 * @param {string} price - The id of the price to use for the one time payment.
 * @param {string} currency - The currency to use for the one time payment.
 * @param {number} quantity - The number of licenses to purchase.
 * @returns {Promise<{status: number, success: boolean, message: string, data: {url: string}|null}>}
 */
const onetimeProcess = (customer, price, currency, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sessionUrl = yield _services_1.stripeService.oneTimePayment(customer, price, currency, quantity);
        return {
            status: _constants_1.OK,
            success: true,
            message: _constants_1.paymentMessages.ONE_TIME_PAYMENT,
            data: { url: sessionUrl },
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : _constants_1.commonMessages.INTERNAL_SERVER_ERROR;
        return {
            status: _constants_1.SERVER_ERROR,
            success: false,
            message: errorMessage,
            data: null,
        };
    }
});
exports.onetimeProcess = onetimeProcess;
//# sourceMappingURL=payment.service.js.map