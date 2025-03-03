"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOneTimePaymentValidator = exports.updateUsageSubscriptionValidator = exports.createUsageSubscriptionValidator = exports.updateSubscriptionValidator = exports.createSubscriptionValidator = exports.updateCustomerValidator = exports.createCustomerValidator = exports.updatePriceValidator = exports.createPriceValidator = exports.updateProductionValidator = exports.createProductionValidator = void 0;
//Third-party modules
const joi_1 = __importDefault(require("joi"));
// product
exports.createProductionValidator = {
    body: joi_1.default.object({
        name: joi_1.default.string().required(),
        description: joi_1.default.string().optional().allow(null).allow(''),
    }),
};
exports.updateProductionValidator = {
    body: joi_1.default.object({
        name: joi_1.default.string().optional().allow(null).allow(''),
        description: joi_1.default.string().optional().allow(null).allow(''),
    }),
};
// price/plan
exports.createPriceValidator = {
    body: joi_1.default.object({
        priceId: joi_1.default.string().required(),
        name: joi_1.default.string().required(),
        description: joi_1.default.string().optional().allow(null).allow(''),
        currency: joi_1.default.string().required(),
        amount: joi_1.default.number().required(),
        interval: joi_1.default.string().valid('day', 'week', 'month', 'year').required(), // Interval validation
        usageType: joi_1.default.string().valid('metered', 'licensed').required(),
    }),
};
exports.updatePriceValidator = {
    body: joi_1.default.object({
        priceId: joi_1.default.string().required(),
        name: joi_1.default.string().required(),
        description: joi_1.default.string().optional().allow(null).allow(''),
        currency: joi_1.default.string().required(),
        amount: joi_1.default.number().required(),
    }),
};
// Customer
exports.createCustomerValidator = {
    body: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        name: joi_1.default.string().required(),
        description: joi_1.default.string().optional().allow(null).allow(''),
    }),
};
exports.updateCustomerValidator = {
    body: joi_1.default.object({
        customerId: joi_1.default.string().email().required(),
        email: joi_1.default.string().email().allow(null),
        name: joi_1.default.string().optional().allow(null).allow(''),
        description: joi_1.default.string().optional().allow(null).allow(''),
    }),
};
// Recurring Subscription (prepayment)
exports.createSubscriptionValidator = {
    body: joi_1.default.object({
        customerId: joi_1.default.string().required(),
        priceId: joi_1.default.string().required(),
        currency: joi_1.default.string().required(),
        trialDays: joi_1.default.number().required(),
    }),
};
exports.updateSubscriptionValidator = {
    body: joi_1.default.object({
        subscriptionId: joi_1.default.string().optional().allow(null).allow(''),
        description: joi_1.default.string().optional().allow(null).allow(''),
        quantity: joi_1.default.number().optional().allow(null).allow(''),
    }),
};
// Recurring Subscription (postpayment)
exports.createUsageSubscriptionValidator = {
    body: joi_1.default.object({
        name: joi_1.default.string().required(),
        description: joi_1.default.string().optional().allow(null).allow(''),
    }),
};
exports.updateUsageSubscriptionValidator = {
    body: joi_1.default.object({
        name: joi_1.default.string().optional().allow(null).allow(''),
        description: joi_1.default.string().optional().allow(null).allow(''),
    }),
};
// one time payment
exports.createOneTimePaymentValidator = {
    body: joi_1.default.object({
        customerId: joi_1.default.string().required(),
        priceId: joi_1.default.string().required(),
        currency: joi_1.default.string().required(),
        quantity: joi_1.default.number().optional(),
    }),
};
//# sourceMappingURL=payment.validation.js.map