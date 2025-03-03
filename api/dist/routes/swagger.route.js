"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Third-party modules
const express_1 = __importDefault(require("express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = require("swagger-ui-express");
//Config
const _docs_1 = __importDefault(require("@docs"));
//Constants
const _constants_1 = require("@constants");
const swaggerRoute = express_1.default.Router();
_docs_1.default.then((swaggerOptions) => {
    const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
    swaggerRoute.use('/', swagger_ui_express_1.serve, (0, swagger_ui_express_1.setup)(swaggerDocs, _constants_1.commonVariables.SWAGGER_UI_OPTIONS));
});
exports.default = swaggerRoute;
//# sourceMappingURL=swagger.route.js.map