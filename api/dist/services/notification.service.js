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
exports.getNotificationList = void 0;
const _constants_1 = require("@constants");
const _models_1 = require("@models");
const _utils_1 = require("@utils");
/**
 * Retrieves a list of notifications for the authenticated user.
 * @param {number} page The page number to fetch notifications from.
 * @param {number} limit The number of notifications to fetch per page.
 * @param {id} string The id for fetch notifications of user.
 * @param {string[]} [type] An optional array of notification types to filter by.
 * @param {Date} [startDate] An optional start date to filter notifications by.
 * @param {Date} [endDate] An optional end date to filter notifications by.
 * @returns {Promise<UnifiedNotificationServiceResponse>} A promise resolving to an object containing the list of notifications and pagination information.
 */
const getNotificationList = (page, limit, id, type, startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = _utils_1.notificationHandler.createNotificationListFilter(id, type, startDate, endDate);
        const [total, notifications] = yield Promise.all([
            _models_1.Notification.countDocuments(filter),
            _models_1.Notification.find(filter)
                .sort({ createdAt: -1 })
                .skip((Number(page) - 1) * Number(limit))
                .limit(Number(limit)),
        ]);
        const totalPages = Math.ceil(total / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;
        const data = {
            notifications: notifications,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNextPage,
                hasPrevPage,
            },
        };
        return {
            status: _constants_1.OK,
            success: true,
            message: _constants_1.notificationMessages.NOTIFICATION_FETCH_SUCCESS,
            data,
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : _constants_1.commonMessages.INTERNAL_SERVER_ERROR;
        return {
            status: _constants_1.SERVER_ERROR,
            success: false,
            message: errorMessage,
            data: null,
        };
    }
});
exports.getNotificationList = getNotificationList;
//# sourceMappingURL=notification.service.js.map