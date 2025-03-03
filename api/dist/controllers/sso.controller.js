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
exports.ssoLogin = void 0;
const _constants_1 = require("@constants");
const _middlewares_1 = require("@middlewares");
const _services_1 = require("@services");
const _utils_1 = require("@utils");
/**
 * Handles Login user after successfully sso-support authenticated
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const ssoLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return next(new _utils_1.ErrorHandler(_constants_1.commonMessages.USER_NOT_FOUND, _constants_1.UNAUTHORIZE, null));
        }
        const response = yield _services_1.ssoService.ssoLogin(user, res);
        const { success, message, status, data } = response;
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
exports.ssoLogin = ssoLogin;
//# sourceMappingURL=sso.controller.js.map