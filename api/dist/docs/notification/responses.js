"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _constants_1 = require("@constants");
const _utils_1 = require("@utils");
const notificationResponses = {
    NotificationList: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.notificationMessages.NOTIFICATION_FETCH_SUCCESS, _utils_1.swaggerHandler.createListResponse({ $ref: '#/components/schemas/Notification' }, _constants_1.notificationMessages.NOTIFICATION_FETCH_SUCCESS, true)),
};
exports.default = notificationResponses;
//# sourceMappingURL=responses.js.map