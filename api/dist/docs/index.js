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
exports.commonHandler = void 0;
//Constants
const _constants_1 = require("@constants");
//Utils
const _utils_1 = require("@utils");
Object.defineProperty(exports, "commonHandler", { enumerable: true, get: function () { return _utils_1.commonHandler; } });
const initializeImports = () => __awaiter(void 0, void 0, void 0, function* () {
    const imports = yield Promise.all([
        _utils_1.commonHandler.conditionalImport('src/docs/user', '../docs/user/schemas'),
        _utils_1.commonHandler.conditionalImport('src/docs/user', '../docs/user/responses'),
        _utils_1.commonHandler.conditionalImport('src/docs/auth', '../docs/auth/schemas'),
        _utils_1.commonHandler.conditionalImport('src/docs/auth', '../docs/auth/responses'),
        _utils_1.commonHandler.conditionalImport('src/docs/localFileHandler', '../docs/localFileHandler/schemas'),
        _utils_1.commonHandler.conditionalImport('src/docs/localFileHandler', '../docs/localFileHandler/responses'),
        _utils_1.commonHandler.conditionalImport('src/docs/s3FileHandler', '../docs/s3FileHandler/schemas'),
        _utils_1.commonHandler.conditionalImport('src/docs/s3FileHandler', '../docs/s3FileHandler/responses'),
        _utils_1.commonHandler.conditionalImport('src/docs/sso', '../docs/sso/schemas'),
        _utils_1.commonHandler.conditionalImport('src/docs/sso', '../docs/sso/responses'),
        _utils_1.commonHandler.conditionalImport('src/docs/dataManagement', '../docs/dataManagement/schemas'),
        _utils_1.commonHandler.conditionalImport('src/docs/dataManagement', '../docs/dataManagement/responses'),
        _utils_1.commonHandler.conditionalImport('src/docs/payment', '../docs/payment/schemas'),
        _utils_1.commonHandler.conditionalImport('src/docs/payment', '../docs/payment/responses'),
        _utils_1.commonHandler.conditionalImport('src/docs/notification', '../docs/notification/schemas'),
        _utils_1.commonHandler.conditionalImport('src/docs/notification', '../docs/notification/responses'),
        _utils_1.commonHandler.conditionalImport('src/docs/twoFA', '../docs/twoFA/schemas'),
        _utils_1.commonHandler.conditionalImport('src/docs/twoFA', '../docs/twoFA/responses'),
    ]);
    const [userSchemas, userResponses, authSchemas, authResponses, localFileHandlerSchemas, localFileHandlerResponses, s3FileHandlerSchemas, s3FileHandlerResponses, ssoSchemas, ssoResponses, dataManagementSchemas, dataManagementResponses, paymentSchemas, paymentResponses, notificationSchemas, notificationResponses, twoFASchemas, twoFAResponses,] = imports;
    const swaggerOptions = _utils_1.swaggerHandler.createSwaggerConfig({
        routes: [
            _constants_1.userVariables.USER_MODULE_SWAGGER_OPERATIONS_PATH,
            _constants_1.authVariables.AUTH_MODULE_SWAGGER_OPERATIONS_PATH,
            _constants_1.fileHandlerVariables.LOCALFILEHANDLER_MODULE_SWAGGER_OPERATIONS_PATH,
            _constants_1.fileHandlerVariables.S3FILEHANDLER_MODULE_SWAGGER_OPERATIONS_PATH,
            _constants_1.ssoVariables.SSO_MODULE_SWAGGER_OPERATIONS_PATH,
            _constants_1.twoFAVariables.TWOFA_MODULE_SWAGGER_OPERATIONS_PATH,
            _constants_1.dataManagementVariables.DATAMANAGEMENT_MODULE_SWAGGER_OPERATIONS_PATH,
            _constants_1.paymentVariables.PAYMENT_MODULE_SWAGGER_OPERATIONS_PATH,
            _constants_1.notificationVariables.NOTIFICATION_MODULE_SWAGGER_OPERATIONS_PATH,
        ],
        additionalSchemas: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, userSchemas.default), authSchemas.default), localFileHandlerSchemas.default), s3FileHandlerSchemas.default), ssoSchemas.default), twoFASchemas.default), dataManagementSchemas.default), paymentSchemas.default), notificationSchemas.default),
        additionalResponses: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, userResponses.default), authResponses.default), localFileHandlerResponses.default), s3FileHandlerResponses.default), ssoResponses.default), twoFAResponses.default), dataManagementResponses.default), paymentResponses.default), notificationResponses.default),
    });
    return swaggerOptions;
});
exports.default = initializeImports();
//# sourceMappingURL=index.js.map