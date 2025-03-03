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
exports.validateRecoveryCode = exports.verifyToken = exports.createQRCode = exports.sendSmsCode = exports.sendOtpToMail = exports.activeTwoFAAuthentication = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const logger_1 = require("@config/logger");
const _constants_1 = require("@constants");
const _enums_1 = require("@enums");
const _services_1 = require("@services");
const _utils_1 = require("@utils");
const twoFA_messages_1 = require("../constants/messages/twoFA.messages");
const twoFA_variables_1 = require("../constants/variables/twoFA.variables");
/**
 * Handles enabling or disabling two factor authentication.
 * @param {string} email - Email of the user
 * @param {string} password - Password of the user
 * @param {boolean} isTwoAuthEnabled - Two factor authentication status
 * @param {TwoFactorMethod} twoFAMethodType - Two factor authentication method type
 * @returns {Promise<IApiResponse>} - The response
 */
const activeTwoFAAuthentication = (email, password, isTwoAuthEnabled, twoFAMethodType) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the methodType is valid
        if (!Object.values(_enums_1.TwoFactorMethod).includes(twoFAMethodType)) {
            return {
                status: _constants_1.BAD_REQUEST,
                success: false,
                message: _constants_1.twoFAMessages.INVALID_TWOFA_METHOD,
                data: null,
            };
        }
        const userDoc = yield _services_1.userCommonService.getUserByEmail(email);
        if (!userDoc || !(yield bcryptjs_1.default.compare(password, userDoc.password)))
            return {
                status: _constants_1.BAD_REQUEST,
                success: false,
                message: _constants_1.commonMessages.INVALID_CREDENTIALS,
                data: null,
            };
        const updates = {
            isTwoAuthEnabled: isTwoAuthEnabled,
            preferredTwoFAMethods: [{ methodType: twoFAMethodType }],
        };
        // save generated otp in db for verification
        const updatedUserDoc = yield _services_1.userCommonService.updateUserByEmail(email, updates);
        return {
            status: _constants_1.OK,
            success: true,
            message: _constants_1.twoFAMessages.USER_TWOFA_UPDATED,
            data: {
                isTwoAuthEnabled: updatedUserDoc ? updatedUserDoc.isTwoAuthEnabled : null,
                token: null,
                role: updatedUserDoc === null || updatedUserDoc === void 0 ? void 0 : updatedUserDoc.role,
            },
        };
    }
    catch (error) {
        /** add log for verify response */
        const errorMessage = error instanceof Error ? error.message : _constants_1.commonMessages.INTERNAL_SERVER_ERROR;
        throw new Error(`Error while active TwoFA: ${errorMessage}`);
    }
});
exports.activeTwoFAAuthentication = activeTwoFAAuthentication;
/**
 * Handles sending the two factor authentication code to the user's registered email.
 * @param {string} email - Email of the user
 * @param {string} password - Password of the user
 * @returns {Promise<IApiResponse>} - The response
 */
const sendOtpToMail = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDoc = yield _services_1.userCommonService.getUserByEmail(email);
        if (!userDoc || !(yield bcryptjs_1.default.compare(password, userDoc.password)))
            return {
                status: _constants_1.BAD_REQUEST,
                success: false,
                message: _constants_1.commonMessages.INVALID_CREDENTIALS,
                data: null,
            };
        /** save secret token for verify user which TwoFA process */
        const otp = yield _utils_1.twoFAHandler.generateTwoFAOTP(twoFA_variables_1.otpLength, twoFA_variables_1.charSet);
        // send generated otp in user registered mail
        yield _utils_1.emailHandler.sendEmailBySlug({
            toEmail: email,
            toName: `${userDoc.name}`,
            templateName: _constants_1.emailTemplatesVariables.emailTemplates[3].slug,
            data: { otp },
        });
        // save generated otp in db for verification
        const updates = {
            twoFAOtp: otp,
        };
        yield _services_1.userCommonService.updateUserByEmail(email, updates);
        return {
            status: _constants_1.OK,
            success: true,
            message: twoFA_messages_1.TOKEN_SENT,
            data: null,
        };
    }
    catch (error) {
        /** add log for verify response */
        const errorMessage = error instanceof Error ? error.message : _constants_1.commonMessages.INTERNAL_SERVER_ERROR;
        throw new Error(`Error verifying token: ${errorMessage}`);
    }
});
exports.sendOtpToMail = sendOtpToMail;
/**
 * Sends the two-factor authentication code to the user's registered phone number.
 * @param {string} phoneNumber - The phone number of the user.
 * @returns {Promise<IApiResponse>} - The response indicating the success or failure of the operation.
 */
const sendSmsCode = (phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /** save secret token for verify user which TwoFA process */
        const user = yield _services_1.userCommonService.getUserByPhone(phoneNumber);
        if (!user)
            return {
                status: _constants_1.BAD_REQUEST,
                success: false,
                message: _constants_1.commonMessages.INVALID_CREDENTIALS,
                data: null,
            };
        const phoneNumberWithCode = `${user.countryCode}${phoneNumber}`;
        yield _utils_1.twoFAHandler.sendSmsToUser(phoneNumberWithCode, _constants_1.twoFAVariables.TWILO_CHANNEL);
        return {
            status: _constants_1.OK,
            success: true,
            message: _constants_1.twoFAMessages.VERIFICATION_CODE_TO_PHONE,
            data: null,
        };
    }
    catch (error) {
        /** add log for verify response */
        const errorMessage = error instanceof Error ? error.message : _constants_1.commonMessages.INTERNAL_SERVER_ERROR;
        throw new Error(`Error verifying token: ${errorMessage}`);
    }
});
exports.sendSmsCode = sendSmsCode;
/**
 * Generates a QR code for the two-factor authentication setup process.
 * @param {string} email - The email of the user.
 * @returns {Promise<IApiResponse>} - The response indicating the success or failure of the operation.
 */
const createQRCode = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDoc = yield _services_1.userCommonService.getUserByEmail(email);
        if (!userDoc)
            return {
                status: _constants_1.BAD_REQUEST,
                success: false,
                message: _constants_1.commonMessages.INVALID_CREDENTIALS,
                data: null,
            };
        const secretToken = yield _utils_1.twoFAHandler.generateAppTokenSecret(email);
        const recoveryCodes = yield _utils_1.twoFAHandler.generateRecoveryCodes();
        const updates = {
            appToken: secretToken,
            recoveryCodes: recoveryCodes,
        };
        yield _services_1.userCommonService.updateUserByEmail(email, updates);
        /** save secret token for verify user which TwoFA process */
        const qrCodeUrl = yield _utils_1.twoFAHandler.generateAppQR(secretToken);
        return {
            status: _constants_1.OK,
            success: true,
            message: _constants_1.twoFAMessages.VERIFICATION_CODE_TO_PHONE,
            data: { qrCodeUrl: qrCodeUrl, setupKey: secretToken.base32 },
        };
    }
    catch (error) {
        /** add log for verify response */
        const errorMessage = error instanceof Error ? error.message : _constants_1.commonMessages.INTERNAL_SERVER_ERROR;
        throw new Error(`Error verifying token: ${errorMessage}`);
    }
});
exports.createQRCode = createQRCode;
/**
 * Handles verifying the two factor authentication code
 * @param {string} email - Email of the user
 * @param {string} inputOTP - OTP entered by the user
 * @param {Response} res - Express response object
 * @returns {Promise<IApiResponse>} - The response indicating the success or failure of the operation.
 */
const verifyToken = (email, inputOTP, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        let updates = null;
        /** save secret token for verify user which TwoFA process */
        const user = yield _services_1.userCommonService.getUserByEmail(email);
        if (!user)
            return {
                status: _constants_1.BAD_REQUEST,
                success: false,
                message: _constants_1.commonMessages.INVALID_CREDENTIALS,
                data: null,
            };
        if (!user.isTwoAuthEnabled)
            return {
                status: _constants_1.OK,
                success: true,
                message: _constants_1.twoFAMessages.VERIFICATION_NOT_ACTIVE,
                data: null,
            };
        const payload = {
            id: user._id,
            email: user.email,
            role: user.role,
        };
        if ((_a = user.preferredTwoFAMethods) === null || _a === void 0 ? void 0 : _a.find((dt) => dt.methodType === _enums_1.TwoFactorMethod.EMAIL)) {
            const generatedOTP = user ? user === null || user === void 0 ? void 0 : user.twoFAOtp : '';
            // biome-ignore lint/complexity/useOptionalChain: <explanation>
            if (!inputOTP || (inputOTP === null || inputOTP === void 0 ? void 0 : inputOTP.length) !== (generatedOTP && (generatedOTP === null || generatedOTP === void 0 ? void 0 : generatedOTP.length))) {
                return {
                    status: _constants_1.BAD_REQUEST,
                    success: false,
                    message: _constants_1.twoFAMessages.INVALID_OTP,
                    data: null,
                };
            }
            for (const char of inputOTP.toString()) {
                if (!twoFA_variables_1.charSet.includes(char)) {
                    return {
                        status: _constants_1.BAD_REQUEST,
                        success: false,
                        message: _constants_1.twoFAMessages.INVALID_OTP,
                        data: null,
                    };
                }
            }
            if (Number.parseInt(inputOTP) === Number.parseInt(generatedOTP)) {
                updates = {
                    twoFAOtp: '',
                };
            }
            yield _services_1.userCommonService.updateUserByEmail(email, updates);
            return {
                status: _constants_1.OK,
                success: true,
                message: _constants_1.twoFAMessages.SUCCESS,
                data: { token: yield _utils_1.generateTokenHandler.generateAuthToken(res, payload), role: user.role },
            };
        }
        else if ((_b = user.preferredTwoFAMethods) === null || _b === void 0 ? void 0 : _b.find((dt) => dt.methodType === _enums_1.TwoFactorMethod.PHONE)) {
            yield _utils_1.twoFAHandler.verifySmsOTP(`${user.countryCode}${user.phoneNumber}`, inputOTP);
            return {
                status: _constants_1.OK,
                success: true,
                message: _constants_1.twoFAMessages.SUCCESS,
                data: { token: yield _utils_1.generateTokenHandler.generateAuthToken(res, payload), role: user.role },
            };
        }
        else if ((_c = user.preferredTwoFAMethods) === null || _c === void 0 ? void 0 : _c.find((dt) => dt.methodType === _enums_1.TwoFactorMethod.APP)) {
            yield _utils_1.twoFAHandler.verifyAppOtp(inputOTP, user.appToken);
            return {
                status: _constants_1.OK,
                success: true,
                message: _constants_1.twoFAMessages.SUCCESS,
                data: { token: yield _utils_1.generateTokenHandler.generateAuthToken(res, payload), role: user.role },
            };
        }
        else {
            return {
                status: _constants_1.BAD_REQUEST,
                success: false,
                message: _constants_1.commonMessages.UNKNOWN_ERROR,
                data: null,
            };
        }
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : _constants_1.commonMessages.INTERNAL_SERVER_ERROR;
        logger_1.logger.error(errorMessage);
        throw new Error(`Error verifying token: ${errorMessage}`);
    }
});
exports.verifyToken = verifyToken;
/**
 * Handles verifying the two factor authentication code
 * @param {string} email - Email of the user
 * @param {string} providedCode - Recovery code entered by the user
 * @returns {Promise<IApiResponse>} - The response indicating the success or failure of the operation.
 */
const validateRecoveryCode = (email, providedCode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDoc = yield _services_1.userCommonService.getUserByEmail(email);
        if (!userDoc)
            return {
                status: _constants_1.BAD_REQUEST,
                success: false,
                message: _constants_1.commonMessages.INVALID_CREDENTIALS,
                data: null,
            };
        for (const recovery of userDoc.recoveryCodes) {
            const codeIndex = recovery.code.indexOf(providedCode);
            if (codeIndex !== -1) {
                recovery.used = true;
                yield userDoc.save();
                return {
                    status: _constants_1.BAD_REQUEST,
                    success: true,
                    message: _constants_1.twoFAMessages.VAILD_RECOVERY_CODE,
                    data: null,
                };
            }
        }
        return {
            status: _constants_1.BAD_REQUEST,
            success: false,
            message: _constants_1.twoFAMessages.INVAILD_RECOVERY_CODE,
            data: null,
        };
    }
    catch (error) {
        /** add log for verify response */
        const errorMessage = error instanceof Error ? error.message : _constants_1.commonMessages.INTERNAL_SERVER_ERROR;
        throw new Error(`Error verifying token: ${errorMessage}`);
    }
});
exports.validateRecoveryCode = validateRecoveryCode;
//# sourceMappingURL=twoFA.service.js.map