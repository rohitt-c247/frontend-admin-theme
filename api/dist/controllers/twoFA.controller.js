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
exports.recoveryCode = exports.verifyTwoFACode = exports.sendTwoFACode = exports.enableTwoFA = void 0;
const _middlewares_1 = require("@middlewares");
const _utils_1 = require("@utils");
const _constants_1 = require("@constants");
const _enums_1 = require("@enums");
const _services_1 = require("@services");
/**
 * Handles enable two factor authentication
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const enableTwoFA = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, isTwoAuthEnabled, twoFAMethodType } = request.body;
        const result = yield _services_1.twoFAService.activeTwoFAAuthentication(email, password, isTwoAuthEnabled, twoFAMethodType);
        const { success, message, status, data } = result;
        if (success) {
            (0, _middlewares_1.responseHandler)(response, message, status, data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, status, data));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.enableTwoFA = enableTwoFA;
/**
 * Handles sending the two factor authentication code
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
// not use at the moment
const sendTwoFACode = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = {
            status: 0,
            success: false,
            message: '',
            data: null,
        };
        const { email, password, twoFAMethodType, phoneNumber } = request.body;
        if (twoFAMethodType === _enums_1.TwoFactorMethod.EMAIL) {
            result = yield _services_1.twoFAService.sendOtpToMail(email, password);
        }
        if (twoFAMethodType === _enums_1.TwoFactorMethod.PHONE) {
            if (!_utils_1.twoFAHandler.isValidPhoneNumber(phoneNumber)) {
                next(new _utils_1.ErrorHandler(_constants_1.twoFAMessages.INVALID_PHONE_FORMAT, _constants_1.BAD_REQUEST, null));
            }
            result = yield _services_1.twoFAService.sendSmsCode(phoneNumber);
        }
        if (twoFAMethodType === _enums_1.TwoFactorMethod.APP) {
            result = yield _services_1.twoFAService.createQRCode(email);
        }
        const { success, message, status, data } = result;
        if (success) {
            (0, _middlewares_1.responseHandler)(response, message, status, data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, status, data));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.sendTwoFACode = sendTwoFACode;
/**
 * Handles verifying the two factor authentication code
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const verifyTwoFACode = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp } = request.body;
        const result = yield _services_1.twoFAService.verifyToken(email, otp, response);
        const { success, message, status, data } = result;
        if (success) {
            (0, _middlewares_1.responseHandler)(response, message, status, data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, status, data));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.verifyTwoFACode = verifyTwoFACode;
/**
 * Handles validating the recovery code
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
// not use at the moment
const recoveryCode = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, recoveryCode } = request.body;
        const result = yield _services_1.twoFAService.validateRecoveryCode(email, recoveryCode);
        const { success, message, status, data } = result;
        if (success) {
            (0, _middlewares_1.responseHandler)(response, message, status, data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, status, data));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.recoveryCode = recoveryCode;
//# sourceMappingURL=twoFA.controller.js.map