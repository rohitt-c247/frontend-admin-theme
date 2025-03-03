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
exports.changePassword = exports.resetPassword = exports.forgetPassword = exports.updateProfile = exports.userProfile = exports.login = exports.verifyEmail = exports.register = void 0;
// Built-in modules
const node_crypto_1 = __importDefault(require("node:crypto"));
const envVar_1 = __importDefault(require("@config/envVar"));
const logger_1 = require("@config/logger");
const role_1 = require("@config/role");
const _constants_1 = require("@constants");
const _enums_1 = require("@enums");
// Models
const _models_1 = require("@models");
const _services_1 = require("@services");
// Utilities
const _utils_1 = require("@utils");
/**
 * Handles user registration
 * @param {IRegisterBody} data User registration data
 * @returns {Promise<IApiResponse>} Response containing the created user or error information
 */
const register = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = data;
    const formatEmail = email.toLowerCase();
    const checkUser = yield _models_1.User.findOne({ email: formatEmail });
    if (checkUser) {
        return {
            status: _constants_1.CONFLICT,
            success: false,
            message: _constants_1.commonMessages.USER_ALREADY_EXISTS,
            data: null,
        };
    }
    const hashedPassword = yield _utils_1.authHandler.hashPassword(password);
    const user = yield _models_1.User.create({
        name,
        email: formatEmail,
        password: hashedPassword,
        role: role_1.defaultRole,
    });
    if (!user) {
        return {
            status: _constants_1.UNAUTHORIZE,
            success: false,
            message: _constants_1.commonMessages.INTERNAL_SERVER_ERROR,
            data: null,
        };
    }
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
    };
    // const verifyToken = await authHandler.generateVerifyEmailToken(payload);
    // const emailInfo = await emailHandler.sendEmailBySlug({
    //   toEmail: email,
    //   toName: `${user.name}`,
    //   templateName: emailTemplatesVariables.emailTemplates[2].slug,
    //   data: { token: verifyToken },
    // });
    // logger.log(`verifyToken: ${verifyToken}`);
    // if (!emailInfo) {
    //   await User.deleteOne({ _id: user._id });
    //   return {
    //     status: SERVER_ERROR,
    //     success: false,
    //     message: commonMessages.EMAIL_NOT_SENT,
    //     data: null,
    //   };
    // }
    return {
        status: _constants_1.CREATED,
        success: true,
        message: _constants_1.authMessages.USER_VERIFY_EMAIL,
        data: null,
    };
});
exports.register = register;
/**
 * Verifies the user's email address using the provided token.
 * - Decodes and verifies the JWT token.
 * - Finds the user associated with the email in the token.
 * - Checks if the user is already active.
 * - Activates the user if not already active.
 *
 * @param {string} token - JWT token for email verification.
 * @returns {Promise<IApiResponse>} Response indicating the result of the verification process.
 * - Success: Returns status OK and a success message if email is successfully verified.
 * - Failure: Returns appropriate error status and message if verification fails.
 */
const verifyEmail = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Verify the token
        let decoded;
        try {
            decoded = yield _utils_1.commonHandler.verifyJwt(token, envVar_1.default.JWT_SECRET);
        }
        catch (error) {
            const err = error;
            const errorMessage = err.name === _constants_1.commonVariables.TOKEN_EXPIRED_ERROR
                ? _constants_1.commonMessages.SESSION_TIMEOUT
                : _constants_1.commonMessages.INVALID_TOKEN;
            return {
                status: _constants_1.UNAUTHORIZE,
                success: false,
                message: errorMessage,
                data: null,
            };
        }
        const email = decoded.email;
        // Find the user by email
        const user = yield _models_1.User.findOne({ email }, { email: 1, status: 1 });
        if (!user) {
            return {
                status: _constants_1.NOT_FOUND,
                success: false,
                message: _constants_1.commonMessages.USER_NOT_FOUND,
                data: null,
            };
        }
        // Check if user is already active
        if (user.status === _enums_1.UserStatus.Active) {
            return {
                status: _constants_1.BAD_REQUEST,
                success: false,
                message: _constants_1.authMessages.USER_VERIFIED,
                data: null,
            };
        }
        // Update user status
        user.status = _enums_1.UserStatus.Active;
        yield user.save();
        return {
            status: _constants_1.OK,
            success: true,
            message: _constants_1.authMessages.VERIFY_EMAIL_SUCCESS,
            data: null,
        };
    }
    catch (error) {
        console.error(error);
        return {
            status: _constants_1.SERVER_ERROR,
            success: false,
            message: _constants_1.commonMessages.FORGET_PASSWORD_ERROR,
            data: error,
        };
    }
});
exports.verifyEmail = verifyEmail;
/**
 * Login a user with email and password. If the user has TwoFA enabled, a verification code will be sent to the selected method.
 * @param {ILoginBody} data - The login data
 * @param {Response} res - The response
 * @returns {Promise<IApiResponse>} - The response
 */
const login = (data, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { email, password } = data;
    const formatEmail = email.toLowerCase();
    //  'name email role password isTwoAuthEnabled preferredTwoFAMethods,'
    const user = yield _models_1.User.findOne({ email: formatEmail });
    if (!user) {
        return {
            status: _constants_1.BAD_REQUEST,
            success: false,
            message: _constants_1.commonMessages.INVALID_CREDENTIALS,
            data: null,
        };
    }
    if (user && user.status === 0) {
        return {
            status: _constants_1.BAD_REQUEST,
            success: false,
            message: _constants_1.commonMessages.INVALID_CREDENTIALS,
            data: null,
        };
    }
    const isMatch = yield _utils_1.authHandler.comparePassword(password, user.password);
    if (!isMatch) {
        return {
            status: _constants_1.BAD_REQUEST,
            success: false,
            message: _constants_1.commonMessages.INVALID_CREDENTIALS,
            data: null,
        };
    }
    if (user.isTwoAuthEnabled) {
        // Send OTP to the selected method
        // Check if the method is already active
        if ((_a = user.preferredTwoFAMethods) === null || _a === void 0 ? void 0 : _a.find((dt) => dt.methodType === _enums_1.TwoFactorMethod.EMAIL)) {
            yield _services_1.twoFAService.sendOtpToMail(email, user.password);
            return {
                status: _constants_1.OK,
                success: true,
                message: _constants_1.twoFAMessages.VERIFICATION_CODE_TO_EMAIL,
                data: {
                    isTwoAuthEnabled: user.isTwoAuthEnabled,
                    token: null,
                    role: user.role,
                },
            };
        }
        else if ((_b = user.preferredTwoFAMethods) === null || _b === void 0 ? void 0 : _b.find((dt) => dt.methodType === _enums_1.TwoFactorMethod.PHONE)) {
            yield _services_1.twoFAService.sendSmsCode(user.phoneNumber);
            return {
                status: _constants_1.OK,
                success: true,
                message: _constants_1.twoFAMessages.VERIFICATION_CODE_TO_PHONE,
                data: {
                    isTwoAuthEnabled: user.isTwoAuthEnabled,
                    token: null,
                    role: user.role,
                },
            };
        }
        else if ((_c = user.preferredTwoFAMethods) === null || _c === void 0 ? void 0 : _c.find((dt) => dt.methodType === _enums_1.TwoFactorMethod.APP)) {
            // send QR
            yield _services_1.twoFAService.createQRCode(user.email);
            return {
                status: _constants_1.OK,
                success: true,
                message: _constants_1.twoFAMessages.VERIFICATION_CODE_TO_PHONE,
                data: {
                    isTwoAuthEnabled: user.isTwoAuthEnabled,
                    token: null,
                    role: user.role,
                },
            };
        }
        else {
            return {
                status: _constants_1.BAD_REQUEST,
                success: true,
                message: _constants_1.twoFAMessages.INVALID_TWOFA,
                data: {
                    isTwoAuthEnabled: user.isTwoAuthEnabled,
                    token: null,
                    role: user.role,
                },
            };
        }
    }
    else {
        const payload = {
            id: user._id,
            email: user.email,
            role: user.role,
        };
        return {
            status: _constants_1.OK,
            success: true,
            message: _constants_1.authMessages.LOGIN_SUCCESS,
            data: {
                token: yield _utils_1.generateTokenHandler.generateAuthToken(res, payload),
                role: user.role,
                isTwoAuthEnabled: user.isTwoAuthEnabled,
            },
        };
    }
});
exports.login = login;
/**
 * Returns the user profile.
 * @param {IUser} user - The user object.
 * @return {IApiResponse} - The response object.
 */
const userProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        status: _constants_1.OK,
        success: true,
        message: _constants_1.authMessages.USER_PROFILE,
        data: user,
    };
});
exports.userProfile = userProfile;
/**
 * Updates user profile information.
 * @param {IUser} userData - The user object to be updated.
 * @param {IUpdateProfile} data - The user profile data to be updated.
 * @returns {Promise<IApiResponse>} - The response object with the updated user object.
 */
const updateProfile = (userData, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = data;
    if (email && email !== userData.email && (yield _models_1.User.findOne({ email })))
        return {
            status: _constants_1.CONFLICT,
            success: false,
            message: _constants_1.commonMessages.USER_ALREADY_EXISTS,
            data: null,
        };
    Object.assign(userData, {
        name: name || userData.name,
        email: email || userData.email,
    });
    const updatedUser = yield userData.save();
    return {
        status: _constants_1.CREATED,
        success: true,
        message: _constants_1.authMessages.UPDATE_PROFILE,
        data: updatedUser,
    };
});
exports.updateProfile = updateProfile;
/**
 * Handles user forget password by sending an email with a reset link.
 * @param {IForgetPasswordBody} data - The user email to be used for sending the reset link.
 * @returns {Promise<IApiResponse>} - The response object with the status, success, message and data.
 */
const forgetPassword = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = data;
        const user = yield _models_1.User.findOne({ email });
        if (!user) {
            return {
                status: _constants_1.OK,
                success: true,
                message: _constants_1.commonMessages.SHARE_RESET_LINK,
                data: null,
            };
        }
        const { token, hashedToken, expireDate } = yield _utils_1.authHandler.generateResetToken();
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpire = expireDate;
        yield user.save();
        logger_1.logger.log(`token: ${token}`);
        const emailInfo = yield _utils_1.emailHandler.sendEmailBySlug({
            toEmail: email,
            toName: `${user.name}`,
            templateName: _constants_1.emailTemplatesVariables.emailTemplates[1].slug,
            data: { token },
        });
        return {
            status: emailInfo ? _constants_1.OK : _constants_1.SERVER_ERROR,
            success: emailInfo,
            message: emailInfo ? _constants_1.commonMessages.SHARE_RESET_LINK : _constants_1.commonMessages.EMAIL_NOT_SENT,
            data: null,
        };
    }
    catch (error) {
        return {
            status: _constants_1.SERVER_ERROR,
            success: false,
            message: _constants_1.commonMessages.FORGET_PASSWORD_ERROR,
            data: error,
        };
    }
});
exports.forgetPassword = forgetPassword;
/**
 * Resets user password with a valid reset token.
 * @param {IResetPasswordBody} data - The user data to be reset.
 * @returns {Promise<IApiResponse>} - The response object with the status, success, message and data.
 */
const resetPassword = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, password } = data;
    const resetToken = yield node_crypto_1.default.createHash(`${_constants_1.commonVariables.HASH_METHOD}`).update(token).digest('hex');
    const user = yield _models_1.User.findOne({
        resetPasswordToken: resetToken,
        resetPasswordExpire: { $gt: new Date() }, // Check if token hasn't expired
    });
    if (!user) {
        return {
            status: _constants_1.UNAUTHORIZE,
            success: false,
            message: _constants_1.commonMessages.USER_NOT_FOUND,
            data: user,
        };
    }
    const hashedPassword = yield _utils_1.authHandler.hashPassword(password);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    yield user.save();
    return {
        status: _constants_1.CREATED,
        success: true,
        message: _constants_1.authMessages.PASSWORD_CHANGED,
        data: null,
    };
});
exports.resetPassword = resetPassword;
/**
 * Changes the user's password.
 * @param {IUser} user - The user instance.
 * @param {IChangePasswordBody} data - The user data to be changed.
 * @returns {Promise<IApiResponse>} - The response object with the status, success, message and data.
 */
const changePassword = (user, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { currentPassword, newPassword } = data;
    const isMatch = yield _utils_1.authHandler.comparePassword(currentPassword, user.password);
    if (!isMatch) {
        return {
            status: _constants_1.UNAUTHORIZE,
            success: false,
            message: _constants_1.authMessages.INCORRECT_PASSWORD,
            data: null,
        };
    }
    const hashedPassword = yield _utils_1.authHandler.hashPassword(newPassword);
    user.password = hashedPassword;
    yield user.save();
    return {
        status: _constants_1.CREATED,
        success: true,
        message: _constants_1.authMessages.PASSWORD_CHANGED,
        data: null,
    };
});
exports.changePassword = changePassword;
//# sourceMappingURL=auth.service.js.map