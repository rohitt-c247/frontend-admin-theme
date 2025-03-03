"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _utils_1 = require("@utils");
const paymentSchemas = {
    // create product
    ProductCreateRequest: {
        type: 'object',
        required: ['name', 'discription'],
        properties: _utils_1.paymentHandler.paymentRandomData('productCreateRequest'),
    },
    // update product Request
    UpdateProductWithIdRequest: {
        properties: _utils_1.paymentHandler.paymentRandomData('updateProductWithIdRequest'),
    },
    // create plan
    PriceCreateRequest: {
        type: 'object',
        properties: _utils_1.paymentHandler.paymentRandomData('priceCreateRequest'),
    },
    // update plan Request
    UpdatePriceWithIdRequest: {
        properties: _utils_1.paymentHandler.paymentRandomData('updatePriceWithIdRequest'),
    },
    // create customer
    CustomerCreateRequest: {
        type: 'object',
        properties: _utils_1.paymentHandler.paymentRandomData('customerCreateRequest'),
    },
    // update customer Request
    UpdateCustomerWithIdRequest: {
        properties: _utils_1.paymentHandler.paymentRandomData('updateCustomerWithIdRequest'),
    },
    CreatePrePaidSubscriptionRequest: {
        type: 'object',
        properties: _utils_1.paymentHandler.paymentRandomData('createPrePaidSubscriptionRequest'),
    },
    // update customer Request
    CreateOnetTimePaymentRequest: {
        properties: _utils_1.paymentHandler.paymentRandomData('createOnetTimePaymentRequest'),
    },
    CreateSubscriptionRequest: {
        type: 'object',
        properties: _utils_1.paymentHandler.paymentRandomData('createSubscriptionRequest'),
    },
    UpdatesubscriptionWithIdRequest: {
        type: 'object',
        properties: _utils_1.paymentHandler.paymentRandomData('updatesubscriptionWithIdRequest'),
    },
};
exports.default = paymentSchemas;
//# sourceMappingURL=schemas.js.map