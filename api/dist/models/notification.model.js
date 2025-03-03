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
exports.Notification = void 0;
const _enums_1 = require("@enums");
const mongoose_1 = __importStar(require("mongoose"));
const NotificationSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users', default: null },
    type: {
        type: String,
        required: true,
        enum: _enums_1.NotificationType,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    metadata: { type: mongoose_1.Schema.Types.Mixed },
    priority: {
        type: String,
        required: true,
        enum: _enums_1.NotificationPriority,
        default: _enums_1.NotificationPriority.MEDIUM,
    },
    deliveredAt: { type: Date },
}, { timestamps: true });
NotificationSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret) => {
        ret.id = ret._id;
        // biome-ignore lint/performance/noDelete: <explanation>
        delete ret._id;
        return ret;
    },
});
NotificationSchema.index({ userId: 1, type: 1 });
exports.Notification = mongoose_1.default.model('notifications', NotificationSchema);
//# sourceMappingURL=notification.model.js.map