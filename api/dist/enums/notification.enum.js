"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationPriority = exports.NotificationType = void 0;
var NotificationType;
(function (NotificationType) {
    NotificationType["EMAIL"] = "email";
    NotificationType["SMS"] = "sms";
    NotificationType["IN_APP"] = "in_app";
    NotificationType["ALERT"] = "alert";
    NotificationType["NOTIFICATION"] = "notification";
    NotificationType["SYSTEM_ALERT"] = "system_alert";
    NotificationType["ALL"] = "all";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
var NotificationPriority;
(function (NotificationPriority) {
    NotificationPriority["HIGH"] = "high";
    NotificationPriority["MEDIUM"] = "medium";
    NotificationPriority["LOW"] = "low";
})(NotificationPriority || (exports.NotificationPriority = NotificationPriority = {}));
//# sourceMappingURL=notification.enum.js.map