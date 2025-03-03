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
exports.emailTemplatesVariables = exports.notificationVariables = exports.socketVariables = exports.paymentVariables = exports.dataManagementVariables = exports.twoFAVariables = exports.ssoVariables = exports.fileHandlerVariables = exports.authVariables = exports.userVariables = exports.commonVariables = void 0;
exports.commonVariables = __importStar(require("./common.variables"));
exports.userVariables = __importStar(require("./user.variables"));
exports.authVariables = __importStar(require("./auth.variables"));
exports.fileHandlerVariables = __importStar(require("./fileHandler.variables"));
exports.ssoVariables = __importStar(require("./sso.variables"));
exports.twoFAVariables = __importStar(require("./twoFA.variables"));
exports.dataManagementVariables = __importStar(require("./dataManagement.variables"));
exports.paymentVariables = __importStar(require("./payment.variables"));
exports.socketVariables = __importStar(require("./socket.variables"));
exports.notificationVariables = __importStar(require("./notification.variables"));
exports.emailTemplatesVariables = __importStar(require("./emailTemplates.variables"));
//# sourceMappingURL=index.js.map