"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// constants
const _constants_1 = require("@constants");
// utils
const _utils_1 = require("@utils");
const authResponses = {
    ProductCreated: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.paymentMessages.CREATE_PRODUCT, {
        $ref: '#/components/schemas/Payment',
    }),
    GetProductResponse: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.paymentMessages.GET_PRODUCT_LIST, {
        $ref: '#/components/schemas/Payment',
    }),
    GetProductWithIdResponse: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.paymentMessages.GET_PRODUCT, {
        $ref: '#/components/schemas/Payment',
    }),
    UpdateProductWithIdResponse: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.paymentMessages.UPDATE_PRODUCT, {
        $ref: '#/components/schemas/Payment',
    }),
    DeleteProductWithIdResponse: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.paymentMessages.UPDATE_PRODUCT, {
        $ref: '#/components/schemas/Payment',
    }),
    PriceCreated: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.paymentMessages.CREATE_PLAN, {
        $ref: '#/components/schemas/Payment',
    }),
    GetPriceWithIdResponse: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.paymentMessages.GET_PLAN, {
        $ref: '#/components/schemas/Payment',
    }),
    UpdatePriceWithIdResponse: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.paymentMessages.UPDATE_PLAN, {
        $ref: '#/components/schemas/Payment',
    }),
    DeletePriceWithIdResponse: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.paymentMessages.UPDATE_PLAN, {
        $ref: '#/components/schemas/Payment',
    }),
    CustomerCreated: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.paymentMessages.CREATE_CUSTOMER, {
        $ref: '#/components/schemas/Payment',
    }),
    GetCustomerWithIdResponse: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.paymentMessages.GET_CUSTOMER, {
        $ref: '#/components/schemas/Payment',
    }),
    UpdateCustomerWithIdResponse: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.paymentMessages.UPDATE_CUSTOMER, {
        $ref: '#/components/schemas/Payment',
    }),
    DeleteCustomerWithIdResponse: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.paymentMessages.DELETE_CUSTOMER, {
        $ref: '#/components/schemas/Payment',
    }),
    CreateUsageSubscriptionResponse: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.paymentMessages.CREATE_SUBSCRIPTION, {
        $ref: '#/components/schemas/Payment',
    }),
    CreatePrePaidSubscriptionResponse: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.paymentMessages.CREATE_SUBSCRIPTION, {
        $ref: '#/components/schemas/Payment',
    }),
    CreateSubscriptionResponse: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.paymentMessages.CREATE_SUBSCRIPTION, {
        $ref: '#/components/schemas/Payment',
    }),
    UpdatesubscriptionWithIdResponse: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.paymentMessages.UPDATE_SUBSCRIPTION, {
        $ref: '#/components/schemas/Payment',
    }),
    CreateOneTimePaymentResponse: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.paymentMessages.ONE_TIME_PAYMENT, {
        $ref: '#/components/schemas/Payment',
    }),
    GetsubscriptionWithIdResponse: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.paymentMessages.GET_SUBSCRIPTION, {
        $ref: '#/components/schemas/Payment',
    }),
    DeletesubscriptionWithIdResponse: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.paymentMessages.DELETE_SUBSCRIPTION, {
        $ref: '#/components/schemas/Payment',
    }),
};
exports.default = authResponses;
//# sourceMappingURL=responses.js.map