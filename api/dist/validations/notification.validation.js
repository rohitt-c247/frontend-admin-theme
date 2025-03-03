"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotificationListSchema = void 0;
const _enums_1 = require("@enums");
const joi_1 = __importDefault(require("joi"));
exports.getNotificationListSchema = {
    query: joi_1.default.object({
        type: joi_1.default.string()
            .valid(...Object.values(_enums_1.NotificationType))
            .optional(),
        startDate: joi_1.default.date().optional(),
        endDate: joi_1.default.date().optional(),
        page: joi_1.default.number().integer().optional(),
        limit: joi_1.default.number().integer().optional(),
    }),
};
//# sourceMappingURL=notification.validation.js.map