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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.twoFAMessages = exports.notificationMessages = exports.paymentMessages = exports.fileHandlerMessages = exports.dataManagementMessages = exports.ssoMessages = exports.authMessages = exports.commonMessages = exports.userMessages = exports.emailTemplatesVariables = exports.twoFAVariables = exports.notificationVariables = exports.socketVariables = exports.paymentVariables = exports.dataManagementVariables = exports.ssoVariables = exports.fileHandlerVariables = exports.authVariables = exports.commonVariables = exports.userVariables = void 0;
var variables_1 = require("./variables");
Object.defineProperty(exports, "userVariables", { enumerable: true, get: function () { return variables_1.userVariables; } });
Object.defineProperty(exports, "commonVariables", { enumerable: true, get: function () { return variables_1.commonVariables; } });
Object.defineProperty(exports, "authVariables", { enumerable: true, get: function () { return variables_1.authVariables; } });
Object.defineProperty(exports, "fileHandlerVariables", { enumerable: true, get: function () { return variables_1.fileHandlerVariables; } });
Object.defineProperty(exports, "ssoVariables", { enumerable: true, get: function () { return variables_1.ssoVariables; } });
Object.defineProperty(exports, "dataManagementVariables", { enumerable: true, get: function () { return variables_1.dataManagementVariables; } });
Object.defineProperty(exports, "paymentVariables", { enumerable: true, get: function () { return variables_1.paymentVariables; } });
Object.defineProperty(exports, "socketVariables", { enumerable: true, get: function () { return variables_1.socketVariables; } });
Object.defineProperty(exports, "notificationVariables", { enumerable: true, get: function () { return variables_1.notificationVariables; } });
Object.defineProperty(exports, "twoFAVariables", { enumerable: true, get: function () { return variables_1.twoFAVariables; } });
Object.defineProperty(exports, "emailTemplatesVariables", { enumerable: true, get: function () { return variables_1.emailTemplatesVariables; } });
var messages_1 = require("./messages");
Object.defineProperty(exports, "userMessages", { enumerable: true, get: function () { return messages_1.userMessages; } });
Object.defineProperty(exports, "commonMessages", { enumerable: true, get: function () { return messages_1.commonMessages; } });
Object.defineProperty(exports, "authMessages", { enumerable: true, get: function () { return messages_1.authMessages; } });
Object.defineProperty(exports, "ssoMessages", { enumerable: true, get: function () { return messages_1.ssoMessages; } });
Object.defineProperty(exports, "dataManagementMessages", { enumerable: true, get: function () { return messages_1.dataManagementMessages; } });
Object.defineProperty(exports, "fileHandlerMessages", { enumerable: true, get: function () { return messages_1.fileHandlerMessages; } });
Object.defineProperty(exports, "paymentMessages", { enumerable: true, get: function () { return messages_1.paymentMessages; } });
Object.defineProperty(exports, "notificationMessages", { enumerable: true, get: function () { return messages_1.notificationMessages; } });
Object.defineProperty(exports, "twoFAMessages", { enumerable: true, get: function () { return messages_1.twoFAMessages; } });
__exportStar(require("./statusCode"), exports);
//# sourceMappingURL=index.js.map