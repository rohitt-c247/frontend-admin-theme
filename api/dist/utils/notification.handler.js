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
exports.notificationRandomData = exports.createNotificationListFilter = exports.broadcastSystemAlert = exports.sendNotification = void 0;
const logger_1 = require("@config/logger");
const _enums_1 = require("@enums");
const faker_1 = require("@faker-js/faker");
const _models_1 = require("@models");
const _services_1 = require("@services");
/**
 * Sends a notification to the specified recipient(s) and persists the notification to the database.
 * @param {NotificationPayload} notification The notification to send
 * @returns {Promise<boolean>} true if the notification is sent and persisted successfully, false otherwise
 */
const sendNotification = (notification) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const io = _services_1.socketService.socketStore.io;
        if (!io) {
            throw new Error('Socket.IO server not initialized');
        }
        const { recipientId, type } = notification;
        if (recipientId) {
            // Send to specific user
            const recipientSockets = Array.from(_services_1.socketService.socketStore.connectedUsers.values())
                .filter((client) => client.userId === recipientId.toString())
                .map((client) => client.socketId);
            recipientSockets.forEach((socketId) => io.to(socketId).emit('notification', notification));
        }
        else {
            // Broadcast to all connected clients
            io.emit('notification', notification);
        }
        logger_1.logger.info(`Notification sent: ${type}`);
        // Save notification to the database
        yield _models_1.Notification.create({
            userId: recipientId || null,
            type: notification.type,
            title: notification.title,
            message: notification.message,
            metadata: notification.metadata,
            priority: notification.priority,
            deliveredAt: new Date(),
        });
        return true;
    }
    catch (error) {
        logger_1.logger.error(`Error sending notification: ${error.message}`);
        return false;
    }
});
exports.sendNotification = sendNotification;
/**
 * Broadcast a system alert notification to all connected clients.
 *
 * @param {string} message The message to be sent as the system alert.
 * @returns {Promise<boolean>} A promise resolving to true if the notification is sent successfully, false otherwise.
 */
const broadcastSystemAlert = (message) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, exports.sendNotification)({
        type: _enums_1.NotificationType.SYSTEM_ALERT,
        title: 'System Alert',
        message,
        priority: _enums_1.NotificationPriority.HIGH,
    });
});
exports.broadcastSystemAlert = broadcastSystemAlert;
/**
 * Creates a filter query for retrieving notifications based on specified criteria.
 *
 * @param {string[]} [type] - An optional array of notification types to filter by.
 * @param {Date} [startDate] - An optional start date to filter notifications created on or after this date.
 * @param {Date} [endDate] - An optional end date to filter notifications created on or before this date.
 * @param {Types.ObjectId} [userId] - An optional user ID to filter notifications for a specific user.
 * @returns {FilterQuery<INotification>} A MongoDB filter query object for fetching notifications.
 * @throws {Error} If there is an error while creating the notification filter.
 */
const createNotificationListFilter = (userId, type, startDate, endDate) => {
    try {
        const filter = {
            $or: [{ userId }, { type: { $in: [_enums_1.NotificationType.ALL, _enums_1.NotificationType.SYSTEM_ALERT] } }],
        };
        if (type === null || type === void 0 ? void 0 : type.length)
            filter.type = { $in: type };
        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate)
                filter.createdAt.$gte = new Date(startDate);
            if (endDate)
                filter.createdAt.$lte = new Date(endDate);
        }
        return filter;
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : error;
        throw new Error(`Error creating notification filter: ${errorMessage}`);
    }
};
exports.createNotificationListFilter = createNotificationListFilter;
/**
 * Generates random data for a notification based on the provided type.
 * @param {string} type - The type of notification to generate data for.
 * @returns {Record<string, unknown>} - The random data for the notification.
 * @throws {Error} If the type is not supported.
 */
const notificationRandomData = (type) => {
    switch (type) {
        case 'notificationSchema':
            return {
                id: { type: 'string', example: faker_1.faker.string.uuid() },
                type: { type: 'boolean', example: true },
                title: { type: 'string', example: faker_1.faker.lorem.sentence() },
                message: { type: 'string', example: faker_1.faker.lorem.sentence() },
                userId: { type: 'string', example: faker_1.faker.string.uuid() },
                metadata: { type: 'object', example: { key: 'value' } },
                priority: { type: 'string', example: _enums_1.NotificationPriority.MEDIUM, enum: Object.values(_enums_1.NotificationPriority) },
                deliveredAt: { type: 'string', format: 'date-time', example: faker_1.faker.date.recent() },
                createdAt: { type: 'string', format: 'date-time', example: faker_1.faker.date.recent() },
                updatedAt: { type: 'string', format: 'date-time', example: faker_1.faker.date.recent() },
            };
        default:
            throw new Error(`Unsupported type: ${type}`);
    }
};
exports.notificationRandomData = notificationRandomData;
//# sourceMappingURL=notification.handler.js.map