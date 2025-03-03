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
//utils
const _utils_1 = require("@utils");
//middlewares
const _middlewares_1 = require("@middlewares");
//services
const _services_1 = require("@services");
/**
 * Handles retrieving the list of notifications
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getNotificationList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { page = 1, limit = 10, type, startDate, endDate } = req.query;
        const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { status, success, message, data } = yield _services_1.notificationService.getNotificationList(page, limit, id, type, startDate, endDate);
        if (success) {
            (0, _middlewares_1.responseHandler)(res, message, status, data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, status, data));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.getNotificationList = getNotificationList;
//# sourceMappingURL=notification.controller.js.map