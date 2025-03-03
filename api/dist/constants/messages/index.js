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
exports.notificationMessages = exports.paymentMessages = exports.dataManagementMessages = exports.twoFAMessages = exports.ssoMessages = exports.fileHandlerMessages = exports.userMessages = exports.authMessages = exports.commonMessages = void 0;
exports.commonMessages = __importStar(require("./common.messages"));
exports.authMessages = __importStar(require("./auth.messages"));
exports.userMessages = __importStar(require("./user.messages"));
exports.fileHandlerMessages = __importStar(require("./fileHandler.messages"));
exports.ssoMessages = __importStar(require("./sso.messages"));
exports.twoFAMessages = __importStar(require("./twoFA.messages"));
exports.dataManagementMessages = __importStar(require("./dataManagement.messages"));
exports.paymentMessages = __importStar(require("./payment.messages"));
exports.notificationMessages = __importStar(require("./notification.messages"));
//# sourceMappingURL=index.js.map