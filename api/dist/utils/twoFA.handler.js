"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.isValidPhoneNumber = exports.verifySmsOTP = exports.sendSmsToUser = exports.verifyAppOtp = exports.generateAppQR = exports.generateAppTokenSecret = exports.generateRecoveryCodes = exports.generateTwoFAOTP = exports.twoFactorAuthRandomData = void 0;
const crypto = __importStar(require("node:crypto"));
const envVar_1 = __importDefault(require("@config/envVar"));
const logger_1 = require("@config/logger");
const _constants_1 = require("@constants");
//Third-party modules
const _enums_1 = require("@enums");
const faker_1 = require("@faker-js/faker");
const qrcode = __importStar(require("qrcode"));
const speakeasy = __importStar(require("speakeasy"));
// third party api
const twilio_1 = require("twilio");
// Twilio Credentials
const accountSid = envVar_1.default.TWILIO_ACCOUNT_SID; // Replace with your Twilio Account SID
const authToken = envVar_1.default.TWILIO_AUTH_TOKEN; // Replace with your Twilio Auth Token
// Verification Service SID
const serviceSid = envVar_1.default.TWILIO_SERVICE_SID;
const client = new twilio_1.Twilio(accountSid, authToken);
/**
 * Generates random data for a twoFactorAuth schema based on the provided type.
 * @param {string} type - The type of twoFactorAuth schema to generate data for.
 * @returns {Record<string, unknown>} - The random data for the twoFactorAuth schema.
 * @throws {Error} If the type is not supported.
 */
const twoFactorAuthRandomData = (type) => {
    switch (type) {
        case 'activeTwoFactorAuthRequest':
            return {
                email: { type: 'string', example: faker_1.faker.internet.email() },
                password: { type: 'string', example: faker_1.faker.internet.password() },
                isTwoAuthEnabled: { type: 'boolean', example: 'true' },
                twoFAMethodType: { type: 'string', example: _enums_1.TwoFactorMethod.EMAIL },
            };
        case 'sendEmailRequest':
            return {
                email: { type: 'string', example: faker_1.faker.internet.email() },
                password: { type: 'string', example: faker_1.faker.internet.password() },
                phoneNumber: { type: 'string', example: '769386759' },
                twoFAMethodType: { type: 'string', example: _enums_1.TwoFactorMethod.EMAIL },
            };
        case 'sendPhoneRequest':
            return {
                phone: { type: 'string', example: faker_1.faker.internet.email() },
                password: { type: 'string', example: faker_1.faker.internet.password() },
            };
        case 'sendAppRequest':
            return {
                email: { type: 'string', example: faker_1.faker.internet.email() },
            };
        case 'verifyOtpRequest':
            return {
                email: { type: 'string', example: faker_1.faker.internet.email() },
                otp: { type: 'string', example: 123456 },
            };
        default:
            throw new Error(`Unsupported type: ${type}`);
    }
};
exports.twoFactorAuthRandomData = twoFactorAuthRandomData;
/**
 * Generates a custom OTP (One-Time Password).
 * @param {number} length - Length of the OTP to generate.
 * @param {string} charset - Characters allowed in the OTP (default: digits).
 * @description Generate a 6-digit numeric OTP
 * @returns {string} - The generated OTP.
 */
const generateTwoFAOTP = (length, charset) => __awaiter(void 0, void 0, void 0, function* () {
    if (length <= 0) {
        throw new Error('OTP length must be greater than zero.');
    }
    let otp = '';
    const charsetLength = charset.length;
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charsetLength);
        otp += charset[randomIndex];
    }
    return otp;
});
exports.generateTwoFAOTP = generateTwoFAOTP;
// Utility to Generate Recovery Codes
const generateRecoveryCodes = () => __awaiter(void 0, void 0, void 0, function* () {
    const codes = [];
    for (let i = 0; i < 5; i++) {
        const hashedCode = crypto.randomBytes(4).toString('hex').toUpperCase();
        codes.push({ code: hashedCode, used: false });
    }
    return codes;
});
exports.generateRecoveryCodes = generateRecoveryCodes;
/**
 * This method is for generate otp secret token for verify user
 *
 * @returns
 */
const generateAppTokenSecret = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const secret = speakeasy.generateSecret({
        name: `${envVar_1.default.AUTH_TOKEN_APP_NAME} (${email})`, //The application name
        length: _constants_1.twoFAVariables.TOKEN_LENGTH,
    });
    /** save secret token for verify user which MFA process */
    return secret;
});
exports.generateAppTokenSecret = generateAppTokenSecret;
/**
 * This method is for generate otpQR for verify user
 *
 * @returns
 */
const generateAppQR = (secretToken) => __awaiter(void 0, void 0, void 0, function* () {
    /** save secret token for verify user which MFA process */
    return qrcode.toDataURL(JSON.stringify(secretToken));
});
exports.generateAppQR = generateAppQR;
/**
 * This method is use for  verify user with given code(otp) is correct or not
 *
 * @returns
 */
const verifyAppOtp = (otp, secret) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isVerifiedUser = speakeasy.totp.verify({
            secret: secret.toString(),
            encoding: 'base32',
            token: otp,
            window: 1,
        });
        if (isVerifiedUser) {
            return true;
        }
        return false;
    }
    catch (err) {
        const error = err instanceof Error;
        throw error;
    }
});
exports.verifyAppOtp = verifyAppOtp;
/**
 * Send SMS using Twilio
 * @param {string} to - Recipient phone number (e.g., +1234567890)
 * @param {string} channel - SMS channel
 * @returns {Promise} - Promise resolving the SMS response
 */
const sendSmsToUser = (to, channel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verification = yield client.verify.v2.services(serviceSid).verifications.create({ to, channel });
        logger_1.logger.info(`SMS sent successfully: ${verification.sid}`);
        return verification;
    }
    catch (error) {
        logger_1.logger.error(`Error sending SMS: ${error}`);
        throw error;
    }
});
exports.sendSmsToUser = sendSmsToUser;
/**
 * Verify SMS OTP
 * @param {string} to - Recipient phone number (e.g., +1234567890)
 * @param {string} code - OTP code to verify
 * @returns {Promise} - Promise resolving the verification result
 * @throws {Error} - If the OTP is invalid
 */
const verifySmsOTP = (to, code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verificationCheck = yield client.verify.v2.services(serviceSid).verificationChecks.create({ to, code });
        if (verificationCheck.status === 'approved') {
            logger_1.logger.info('Verification successful!');
        }
        else {
            throw new Error('Invalid OTP. Please try again.');
        }
        return;
    }
    catch (error) {
        logger_1.logger.error(`Error sending SMS: ${error}`);
        throw error;
    }
});
exports.verifySmsOTP = verifySmsOTP;
/**
 * Validates the phone number is in E.164 format
 * @param phoneNumber - Phone number to validate
 * @returns Boolean indicating if the phone number is valid
 */
const isValidPhoneNumber = (phoneNumber) => {
    const e164Regex = /^\+[1-9]\d{1,14}$/; // E.164 regex pattern
    return e164Regex.test(phoneNumber);
};
exports.isValidPhoneNumber = isValidPhoneNumber;
//# sourceMappingURL=twoFA.handler.js.map