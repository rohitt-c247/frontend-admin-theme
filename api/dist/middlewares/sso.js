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
exports.passportAuthenticate = void 0;
const passport_1 = __importDefault(require("passport"));
//Constants
const _constants_1 = require("@constants");
const logger_1 = require("@config/logger");
//Enums
const _enums_1 = require("@enums");
//Utils
const _utils_1 = require("@utils");
/**
 * Authenticates the user using the passport library with the specified strategy.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the chain.
 *
 * @throws {ErrorHandler} If the strategy is invalid or there is an internal server error.
 *
 * @returns {Promise<void>} The promise returned by the passport authentication middleware.
 */
const passportAuthenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const strategy = req.body.strategy || _enums_1.Strategy.Google;
        req.session.destroy((err) => {
            if (err) {
                logger_1.logger.error(`Error destroying session: ${err}`);
            }
        });
        if (strategy === _enums_1.Strategy.Google) {
            passport_1.default.authenticate(_enums_1.Strategy.Google, {
                scope: [_enums_1.Scope.Email, _enums_1.Scope.Profile],
            })(req, res, next);
        }
        else if (strategy === _enums_1.Strategy.Facebook) {
            passport_1.default.authenticate(_enums_1.Strategy.Facebook, {
                scope: [_enums_1.Scope.Email],
            })(req, res, next);
        }
        else {
            return next(new _utils_1.ErrorHandler(_constants_1.ssoMessages.INVALID_STRATEGY, _constants_1.BAD_REQUEST, null));
        }
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : _constants_1.commonMessages.INTERNAL_SERVER_ERROR;
        return next(new _utils_1.ErrorHandler(errorMessage, _constants_1.BAD_REQUEST, error));
    }
});
exports.passportAuthenticate = passportAuthenticate;
//# sourceMappingURL=sso.js.map