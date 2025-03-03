"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSwaggerConfig = exports.STANDARD_ERROR_RESPONSES = exports.createErrorResponse = exports.createListResponse = exports.createSuccessResponse = void 0;
// config
const envVar_1 = __importDefault(require("@config/envVar"));
// Utils
const _utils_1 = require("@utils");
// Constants
const _constants_1 = require("@constants");
/**
 * A swagger response object for successful responses
 * @param {string} message the message to be included in the response
 * @param {object | null} dataSchema the schema for the data returned in the response
 * @returns {object} a swagger response object with the description set to the message and the schema set to {success: boolean, message: string, data: dataSchema}
 */
const createSuccessResponse = (message, dataSchema) => ({
    description: message,
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: message },
                    data: dataSchema,
                },
            },
        },
    },
});
exports.createSuccessResponse = createSuccessResponse;
/**
 * A swagger response object for list responses
 * @param {object} itemSchema the schema of the items in the list
 * @param {string} message the message to be included in the response
 * @param {boolean} [includePagination] whether to include pagination metadata in the response
 * @returns {object} a swagger response object with the description set to the message and the schema set to {success: boolean, message: string, data: {items: itemSchema[], pagination: PaginationMeta}}
 */
const createListResponse = (itemSchema, message, includePagination) => ({
    type: 'object',
    properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: message },
        data: {
            type: 'object',
            properties: {
                items: {
                    type: 'array',
                    items: itemSchema,
                },
                pagination: includePagination ? { $ref: '#/components/schemas/PaginationMeta' } : null,
            },
        },
    },
});
exports.createListResponse = createListResponse;
/**
 * A swagger response object for error responses
 * @param {string} message the message to be included in the response
 * @returns {object} a swagger response object with the description set to the message and the schema set to {success: boolean, message: string}
 */
const createErrorResponse = (message) => ({
    description: message,
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    success: { type: 'boolean', example: false },
                    message: { type: 'string', example: message },
                },
            },
        },
    },
});
exports.createErrorResponse = createErrorResponse;
exports.STANDARD_ERROR_RESPONSES = {
    BadRequest: (0, exports.createErrorResponse)(_constants_1.commonMessages.BAD_REQUEST_ERROR_MESSAGE),
    UnprocessableEntity: (0, exports.createErrorResponse)(_constants_1.commonMessages.UNPROCESSABLE_ENTITY_ERROR_MESSAGE),
    Unauthorized: (0, exports.createErrorResponse)(_constants_1.commonMessages.UNAUTHORIZED),
    Forbidden: (0, exports.createErrorResponse)(_constants_1.commonMessages.FORBIDDEN_ERROR),
    NotFound: (0, exports.createErrorResponse)(_constants_1.commonMessages.RESOURCE_NOT_FOUND),
    Conflict: (0, exports.createErrorResponse)(_constants_1.commonMessages.CONFLICT_ERROR),
    InternalServerError: (0, exports.createErrorResponse)(_constants_1.commonMessages.INTERNAL_SERVER_ERROR),
};
/**
 * Generates a Swagger configuration object.
 *
 * @param {Object} options - Configuration options for Swagger.
 * @param {string} [options.title] - The title of the API documentation.
 * @param {string} [options.version] - The version of the API.
 * @param {string} [options.description] - A description of the API.
 * @param {string[]} [options.routes] - An array of route paths to include in the documentation.
 * @param {Object[]} [options.tags] - An array of tag objects, each with a name and description.
 * @param {Record<string, object>} [options.additionalSchemas] - Additional schemas to include in the API components.
 * @param {Record<string, object>} [options.additionalResponses] - Additional responses to include in the API components.
 * @returns {Object} The Swagger configuration object, including definition and API paths.
 */
const createSwaggerConfig = (options) => {
    const swaggerDefinition = {
        openapi: '3.0.0',
        info: {
            title: options.title || 'API Documentation Of Node Boilerplate',
            version: options.version || '1.0.0',
            description: options.description || 'These are the RESTful APIs built with Node.js, Express.js.',
        },
        servers: [
            {
                url: `${envVar_1.default.API_URL}`,
            },
        ],
        tags: options.tags || [
            {
                name: 'Auth',
                description: 'Operations related to authentication',
            },
            { name: 'Users', description: 'Operations related to user management' },
            {
                name: 'Data Management',
                description: 'Operations related to data management',
            },
            {
                name: 'Payment',
                description: 'Operations related to payment',
            },
            {
                name: 'Notifications',
                description: 'Operations related to notification',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: Object.assign({ ErrorResponse: _constants_1.commonVariables.SWAGGER_ERROR_RESPONSE_SCHEMA, PaginationMeta: _constants_1.commonVariables.PAGINATION_META_SCHEMA }, options.additionalSchemas),
            responses: Object.assign(Object.assign({}, exports.STANDARD_ERROR_RESPONSES), options.additionalResponses),
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    };
    return {
        swaggerDefinition,
        apis: options.routes ||
            (_utils_1.commonHandler.isLogger ? ['src/modules/users/routes/index.ts'] : ['dist/modules/users/routes/index.js']),
    };
};
exports.createSwaggerConfig = createSwaggerConfig;
//# sourceMappingURL=swagger.handler.js.map