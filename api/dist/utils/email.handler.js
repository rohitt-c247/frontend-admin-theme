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
exports.sendEmailBySlug = exports.getEmailTemplate = exports.sendEmail = void 0;
const envVar_1 = __importDefault(require("@config/envVar"));
const logger_1 = require("@config/logger");
const _constants_1 = require("@constants");
const _models_1 = require("@models");
const nodemailer_1 = __importDefault(require("nodemailer"));
/**
 * Create a transporter object using your SMTP provider details
 */
const transporter = nodemailer_1.default.createTransport({
    service: envVar_1.default.SMTP_MAIL_SERVICE,
    host: envVar_1.default.SMTP_HOST,
    port: Number(envVar_1.default.SMTP_PORT),
    secure: Boolean(envVar_1.default.SMTP_IS_SECURE),
    auth: {
        user: envVar_1.default.SMTP_SENDER_EMAIL,
        pass: envVar_1.default.SMTP_SENDER_PASSWORD,
    },
});
/**
 * Sends an email using the configured SMTP transporter.
 * @param {string} email - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} message - The HTML message to be sent in the email body.
 * @returns {Promise<{ success: boolean, data?: object, error?: any }>}
 *          An object indicating success status, with additional data or error information.
 */
const sendEmail = (email, subject, message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const info = yield transporter.sendMail({
            from: envVar_1.default.SMTP_SENDER_EMAIL,
            to: email,
            subject,
            html: message,
        });
        return { success: true, data: info };
    }
    catch (error) {
        logger_1.logger.error(`Error sending email: ${error}`);
        return { success: false, error };
    }
});
exports.sendEmail = sendEmail;
/**
 * Processes an email template by replacing placeholders with corresponding data values.
 *
 * @param {string} template - The template string containing placeholders in the format {key}.
 * @param {ITemplateData} data - An object containing key-value pairs for replacing placeholders.
 * @returns {string} The processed template with placeholders replaced by actual data values.
 */
const processTemplate = (template, data) => {
    return template.replace(/{([^}]+)}/g, (_, key) => { var _a; return (_a = String(data[key])) !== null && _a !== void 0 ? _a : `{${key}}`; });
};
/**
 * Retrieves an email template by its slug if it is active.
 *
 * @param {string} slug - The unique identifier for the email template.
 * @returns {Promise<IEmailTemplate | null>} - A promise that resolves to the email template object if found and active, or null if not found or an error occurs.
 */
const getEmailTemplate = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const template = yield _models_1.EmailTemplate.findOne({ slug, isActive: true, isDeleted: false });
        return template;
    }
    catch (error) {
        logger_1.logger.error(`Error fetching email template: ${error}`);
        return null;
    }
});
exports.getEmailTemplate = getEmailTemplate;
/**
 * Sends an email using a template slug and replacing placeholders with actual data values.
 * Currently supported templates are:
 * - forgot-password
 * - reset-password
 * - verify-email
 * - verify-otp
 *
 * @param {IEmailData} data - An object containing the email recipient, name, template slug, and additional data to replace placeholders.
 * @returns {Promise<boolean>} - A promise that resolves to true if the email is sent successfully, or false if an error occurs.
 */
const sendEmailBySlug = (_a) => __awaiter(void 0, [_a], void 0, function* ({ toEmail, toName, templateName, data }) {
    try {
        const template = yield (0, exports.getEmailTemplate)(templateName);
        if (!template) {
            throw new Error(`Email template not found for slug: ${templateName}`);
        }
        let templateData;
        const link = `${_constants_1.commonVariables.FRONTEND_APP_URL}?token=${data === null || data === void 0 ? void 0 : data.token}`;
        switch (templateName) {
            case _constants_1.emailTemplatesVariables.emailTemplates[0].slug: {
                templateData = {
                    name: toName,
                    link,
                    expire: _constants_1.emailTemplatesVariables.RESET_TOKEN_EXPIRE, // Example default value
                    unit: _constants_1.emailTemplatesVariables.RESET_TOKEN_UNIT, // Example default value
                    plural: _constants_1.emailTemplatesVariables.RESET_TOKEN_EXPIRE > 1 ? 's' : '',
                };
                break;
            }
            case _constants_1.emailTemplatesVariables.emailTemplates[1].slug: {
                templateData = {
                    name: toName,
                    link,
                    expire: _constants_1.emailTemplatesVariables.RESET_TOKEN_EXPIRE, // Example default value
                    unit: _constants_1.emailTemplatesVariables.RESET_TOKEN_UNIT, // Example default value
                    plural: _constants_1.emailTemplatesVariables.RESET_TOKEN_EXPIRE > 1 ? 's' : '',
                };
                break;
            }
            case _constants_1.emailTemplatesVariables.emailTemplates[2].slug: {
                templateData = {
                    name: toName,
                    link,
                };
                break;
            }
            case _constants_1.emailTemplatesVariables.emailTemplates[3].slug: {
                templateData = {
                    otp: data === null || data === void 0 ? void 0 : data.otp,
                    otpValidTime: _constants_1.twoFAVariables.OTP_VALID_TIME,
                };
                break;
            }
            default:
                throw new Error(`Unhandled email template slug: ${templateName}`);
        }
        const emailContent = processTemplate(template.template, templateData);
        const emailResult = yield (0, exports.sendEmail)(toEmail, template.subject, emailContent);
        return emailResult.success;
    }
    catch (error) {
        logger_1.logger.error(`Error sending email by slug: ${error}`);
        return false;
    }
});
exports.sendEmailBySlug = sendEmailBySlug;
//# sourceMappingURL=email.handler.js.map