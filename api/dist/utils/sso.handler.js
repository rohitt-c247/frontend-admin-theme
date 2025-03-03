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
exports.ssoRandomData = void 0;
const envVar_1 = __importDefault(require("@config/envVar"));
const logger_1 = require("@config/logger");
const _constants_1 = require("@constants");
//Enums
const _enums_1 = require("@enums");
//Third-party modules
const faker_1 = require("@faker-js/faker");
const _models_1 = require("@models");
//Third-party modules
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = require("passport-facebook");
const passport_google_oauth20_1 = require("passport-google-oauth20");
/** Google Strategy
 * This strategy is used to authenticate users using their Google account.
 * It requires a client ID, client secret, and callback URL.
 * The callback function receives the profile and calls `done` to pass the user to the next middleware.
 * If the user does not exist, a new user is created.
 * If the user exists but has a different email, the email is updated.
 * If an error occurs, it is passed to `done`.
 */
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: envVar_1.default.GOOGLE_CLIENT_ID || '',
    clientSecret: envVar_1.default.GOOGLE_CLIENT_SECRET || '',
    callbackURL: envVar_1.default.GOOGLE_CALLBACK_URL,
}, (_accessToken, _refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const email = (_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value;
        if (!email)
            throw new Error(_constants_1.ssoMessages.EMAIL_IS_REQUIRED);
        // Check for existing user
        let user = yield _models_1.User.findOne({
            $or: [{ googleId: profile.id }, { email }],
        });
        logger_1.logger.log(`GoogleStrategy profile check user: ${user}`);
        if (!user) {
            // Create a new user if none exists
            user = yield _models_1.User.create({
                googleId: profile.id,
                name: profile.displayName,
                email,
            });
        }
        else if (user.email !== email) {
            // Update the user's email if it has changed
            user.email = email;
            yield user.save();
        }
        logger_1.logger.log(`GoogleStrategy profile user: ${user}`);
        // Successfully authenticated, pass the user to `done`
        done(null, user);
    }
    catch (error) {
        // Pass the error to `done`
        done(error);
    }
})));
/** Facebook Strategy
 * This strategy is used to authenticate users using their Facebook account.
 * It requires a client ID, client secret, and callback URL.
 * The callback function receives the profile and calls `done` to pass the user to the next middleware.
 * If the user does not exist, a new user is created.
 * If the user exists but has a different email, the email is updated.
 * If an error occurs, it is passed to `done`.
 */
passport_1.default.use(new passport_facebook_1.Strategy({
    clientID: envVar_1.default.FACEBOOK_CLIENT_ID || '',
    clientSecret: envVar_1.default.FACEBOOK_CLIENT_SECRET || '',
    callbackURL: envVar_1.default.FACEBOOK_CALLBACK_URL,
    profileFields: ['_id', 'emails', 'name'],
}, (_accessToken, _refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const email = profile.emails ? profile.emails[0].value : '';
    try {
        let user = yield _models_1.User.findOne({ facebookId: profile.id });
        if (!user) {
            user = yield _models_1.User.create({
                facebookId: profile.id,
                email,
                name: `${(_a = profile.name) === null || _a === void 0 ? void 0 : _a.givenName} ${(_b = profile.name) === null || _b === void 0 ? void 0 : _b.familyName}`,
            });
        }
        return done(null, user);
    }
    catch (error) {
        done(error);
    }
})));
/** Serialize and Deserialize User
 * The user ID is serialized to the session and deserialized when subsequent requests are made.
 * This allows the user to be retrieved from the database and used in the request.
 */
passport_1.default.serializeUser((user, done) => {
    const userId = user.id;
    logger_1.logger.log(`Serialized user ID: ${userId}`);
    done(null, userId);
});
/** Deserialize User
 * The user ID is deserialized from the session and used to retrieve the user from the database.
 * This allows the user to be retrieved from the database and used in the request.
 */
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield _models_1.User.findById(id);
        if (!user)
            throw new Error(_constants_1.ssoMessages.USER_FOUND_DURING_DESERIALIZE);
        done(null, user);
    }
    catch (error) {
        logger_1.logger.error(`Deserialization error: ${error}`);
        done(error);
    }
}));
/**
 * Generates random data for a SSO schema based on the provided type.
 * @param {string} type - The type of SSO schema to generate data for.
 * @returns {Record<string, unknown>} - The random data for the SSO schema.
 * @throws {Error} If the type is not supported.
 */
const ssoRandomData = (type) => {
    switch (type) {
        case 'ssoSchema':
            return {
                id: { type: 'string', example: faker_1.faker.string.uuid() },
                name: { type: 'string', example: faker_1.faker.person.fullName() },
                email: { type: 'string', example: faker_1.faker.internet.email() },
                createdAt: { type: 'string', example: faker_1.faker.date.past() },
                updatedAt: { type: 'string', example: faker_1.faker.date.recent() },
            };
        case 'ssoLoginRequest':
            return {
                strategy: {
                    type: 'string',
                    enum: [_enums_1.Strategy.Google, _enums_1.Strategy.Facebook],
                    example: _enums_1.Strategy.Google,
                },
            };
        case 'ssoUserResponse':
            return {
                token: { type: 'string', example: faker_1.faker.string.uuid() },
                message: { type: 'string', example: _constants_1.ssoMessages.SSO_LOGIN_SUCCESS },
            };
        default:
            throw new Error(`Unsupported type: ${type}`);
    }
};
exports.ssoRandomData = ssoRandomData;
//# sourceMappingURL=sso.handler.js.map