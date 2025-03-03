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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAuthToken = exports.clearToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//Config
const envVar_1 = __importDefault(require("@config/envVar"));
//Constants
const _constants_1 = require("@constants");
//Utils
const _utils_1 = require("@utils");
const clearToken = (res) => {
    res.cookie(envVar_1.default.AUTH_COOKIE_NAME, '', {
        httpOnly: true,
        expires: new Date(0),
    });
};
exports.clearToken = clearToken;
/**
 * Generates an authentication token and sets it as a cookie in the response.
 * @param {Response} res - The response object
 * @param {object} payload - The payload to be signed in the token
 * @returns {Promise<string>} - The generated token
 */
const generateAuthToken = (res, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const jwtSecret = envVar_1.default.JWT_SECRET;
    const expireIn = yield _utils_1.commonHandler.convertTime(Number(_constants_1.commonVariables.TOKEN_EXPIRE), String(_constants_1.commonVariables.TOKEN_EXPIRE_UNIT), _constants_1.commonVariables.MILLISECOND);
    const token = jsonwebtoken_1.default.sign(payload, jwtSecret, {
        expiresIn: _constants_1.commonVariables.JWT_TOKEN_EXPIRE,
    });
    res.cookie(envVar_1.default.AUTH_COOKIE_NAME, token, {
        httpOnly: true,
        secure: !_utils_1.commonHandler.isLogger,
        sameSite: _constants_1.commonVariables.COOKIE_SAME_SITE,
        maxAge: expireIn,
    });
    return token;
});
exports.generateAuthToken = generateAuthToken;
//# sourceMappingURL=generateToken.handler.js.map