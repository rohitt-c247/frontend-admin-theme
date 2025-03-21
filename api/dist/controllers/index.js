"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = exports.studentController = exports.notificationController = exports.paymentController = exports.dataManagementController = exports.twoFAController = exports.ssoController = exports.s3FileHandlerController = exports.localFileHandlerController = exports.authController = exports.userController = void 0;
exports.userController = __importStar(require("./user.controller"));
exports.authController = __importStar(require("./auth.controller"));
exports.localFileHandlerController = __importStar(require("./localFileHandler.controller"));
exports.s3FileHandlerController = __importStar(require("./s3FileHandler.controller"));
exports.ssoController = __importStar(require("./sso.controller"));
exports.twoFAController = __importStar(require("./twoFA.controller"));
exports.dataManagementController = __importStar(require("./dataManagement.controller"));
exports.paymentController = __importStar(require("./payment.controller"));
exports.notificationController = __importStar(require("./notification.controller"));
exports.studentController = __importStar(require("./student.controller"));
exports.categoryController = __importStar(require("./category.controller"));
//# sourceMappingURL=index.js.map