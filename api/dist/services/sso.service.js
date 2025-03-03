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
const _models_1 = require("@models");
const _utils_1 = require("@utils");
/**
 * Generate token after successfully authenticated by sso-support.
 * @param {Request} req Express request object
 * @returns {Promise<IApiResponse>} Response containing the token and user role detail or error information
 */
const ssoLogin = (user, res) => __awaiter(void 0, void 0, void 0, function* () {
    const checkUser = yield _models_1.User.findOne({ email: user.email }, 'name email role');
    if (!checkUser) {
        return {
            status: _constants_1.NOT_FOUND,
            success: false,
            message: _constants_1.ssoMessages.SSO_USER_NOT_FOUND,
            data: null,
        };
    }
    const payload = {
        id: checkUser.id,
        name: checkUser.name,
        email: checkUser.email,
        role: checkUser.role,
    };
    return {
        status: _constants_1.OK,
        success: true,
        message: _constants_1.ssoMessages.SSO_LOGIN_SUCCESS,
        data: { token: yield _utils_1.generateTokenHandler.generateAuthToken(res, payload), role: checkUser.role },
    };
});
exports.ssoLogin = ssoLogin;
//# sourceMappingURL=sso.service.js.map