"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _constants_1 = require("@constants");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
const requiredEnvVars = [
    'NODE_ENV',
    'PORT',
    'HOST',
    'API_URL',
    'JWT_SECRET',
    'AUTH_COOKIE_NAME',
    'MONGODB_URI',
    'CORS_ORIGIN',
    'EXPRESS_JSON_LIMIT',
    'AWS_REGION',
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
    'BUCKET_NAME',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'GOOGLE_CALLBACK_URL',
    'FACEBOOK_CLIENT_ID',
    'FACEBOOK_CLIENT_SECRET',
    'FACEBOOK_CALLBACK_URL',
    'SMTP_MAIL_SERVICE',
    'SMTP_SENDER_EMAIL',
    'SMTP_SENDER_PASSWORD',
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_IS_SECURE',
    'TWILIO_ACCOUNT_SID',
    'TWILIO_AUTH_TOKEN',
    'TWILIO_SERVICE_SID',
    'AUTH_TOKEN_APP_NAME',
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
];
// Object to hold exported environment variables
const env = {};
// Ensure all required variables are present and add them to `env`
requiredEnvVars.forEach((key) => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`${_constants_1.commonMessages.MISSING_ENV_VARIABLES}: ${key}`);
    }
    env[key] = value; // Dynamically add to the export object
});
exports.default = env;
//# sourceMappingURL=envVar.js.map