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
exports.authRandomData = exports.hashPassword = exports.generateResetToken = exports.generateVerifyEmailToken = exports.comparePassword = exports.clearToken = void 0;
const node_crypto_1 = __importDefault(require("node:crypto"));
const faker_1 = require("@faker-js/faker");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//Config
const envVar_1 = __importDefault(require("@config/envVar"));
const index_1 = require("@config/index");
//Constants
const _constants_1 = require("@constants");
const _enums_1 = require("@enums");
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
 * Compares a given password with a hashed password.
 * @param {string} enteredPassword - The password entered by the user
 * @param {string} hashedPassword - The hashed password
 * @returns {Promise<boolean>} - A boolean indicating whether the comparison is successful or not
 */
const comparePassword = (enteredPassword, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.compare(enteredPassword, hashedPassword);
});
exports.comparePassword = comparePassword;
/**
 * Generates a verification token for verifying email addresses.
 * @param {object} payload - The payload to be signed in the token
 * @returns {Promise<string>} - The generated token
 */
const generateVerifyEmailToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const jwtSecret = envVar_1.default.JWT_SECRET;
    const expireIn = yield _utils_1.commonHandler.convertTime(Number(_constants_1.authVariables.VERIFY_EMAIL_TOKEN_EXPIRE), String(_constants_1.authVariables.VERIFY_EMAIL_TOKEN_EXPIRE_UNIT), _constants_1.commonVariables.MILLISECOND);
    const token = jsonwebtoken_1.default.sign(payload, jwtSecret, {
        expiresIn: expireIn,
    });
    return token;
});
exports.generateVerifyEmailToken = generateVerifyEmailToken;
/**
 * Generates a password reset token.
 * @returns {Promise<{ token: string; hashedToken: string; expireDate: Date; }>} - The generated token and its hashed version, as well as the expiration date.
 */
const generateResetToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const resetToken = node_crypto_1.default.randomBytes(32).toString('hex');
    const hashedToken = node_crypto_1.default.createHash(`${_constants_1.commonVariables.HASH_METHOD}`).update(resetToken).digest('hex');
    const expireIn = yield _utils_1.commonHandler.convertTime(Number(_constants_1.authVariables.RESET_TOKEN_EXPIRE), String(_constants_1.authVariables.RESET_TOKEN_UNIT), _constants_1.commonVariables.MILLISECOND);
    const expireDate = new Date(Date.now() + expireIn); // Expires based on configured time
    return { token: resetToken, hashedToken, expireDate };
});
exports.generateResetToken = generateResetToken;
/**
 * Hashes a given password using bcrypt.
 * @param {string} password - The password to hash
 * @returns {Promise<string>} - The hashed password
 */
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(10);
    return yield bcryptjs_1.default.hash(password, salt);
});
exports.hashPassword = hashPassword;
/**
 * Generates random data for an authentication request based on the provided type.
 * @param {string} type - The type of authentication request to generate data for.
 * @returns {Record<string, unknown>} - The random data for the authentication request.
 * @throws {Error} If the type is not supported.
 */
const authRandomData = (type) => {
    const commonData = {
        name: { type: 'string', example: faker_1.faker.person.fullName() },
        email: { type: 'string', example: faker_1.faker.internet.email() },
        role: {
            type: 'integer',
            example: _enums_1.Role.User,
            enum: [_enums_1.Role.User, _enums_1.Role.Admin],
        },
    };
    const commonStatus = {
        type: 'integer',
        example: _enums_1.UserStatus.Active,
        enum: [_enums_1.UserStatus.Active, _enums_1.UserStatus.Inactive],
    };
    const commonPassword = {
        type: 'string',
        example: faker_1.faker.internet.password({
            length: _constants_1.commonVariables.PASSWORD_MIN_LENGTH,
        }),
    };
    switch (type) {
        case 'authSchema':
            return Object.assign(Object.assign({}, commonData), { id: { type: 'string', example: faker_1.faker.string.uuid() }, status: commonStatus, createdAt: { type: 'string', example: faker_1.faker.date.past() }, updatedAt: { type: 'string', example: faker_1.faker.date.recent() }, __v: { type: 'integer', example: 0 } });
        case 'registerRequest':
            return {
                name: { type: 'string', example: faker_1.faker.person.fullName() },
                email: { type: 'string', example: faker_1.faker.internet.email() },
                password: { type: 'string', example: faker_1.faker.internet.password() },
                phoneNumber: { type: 'string', example: '769386759' },
                countryCode: { type: 'string', example: '+91' },
            };
        case 'verifyRequest':
            return {
                token: { type: 'string', example: faker_1.faker.internet.jwt() },
            };
        case 'loginRequest':
            return {
                email: { type: 'string', example: faker_1.faker.internet.email() },
                password: commonPassword,
            };
        case 'loginResponse':
            return {
                token: { type: 'string', example: faker_1.faker.internet.jwt() },
                role: { type: 'integer', example: index_1.defaultRole, enum: index_1.roles },
            };
        case 'forgetPasswordRequest':
            return {
                email: { type: 'string', example: faker_1.faker.internet.email() },
            };
        case 'resetPasswordRequest':
            return {
                token: { type: 'string', example: faker_1.faker.internet.jwt() },
                password: commonPassword,
            };
        case 'changePasswordRequest':
            return {
                currentPassword: commonPassword,
                newPassword: commonPassword,
            };
        case 'changePasswordResponse':
            return {
                name: { type: 'string', example: faker_1.faker.person.fullName() },
                email: { type: 'string', example: faker_1.faker.internet.email() },
            };
        case 'updateProfileRequest':
            return {
                name: { type: 'string', example: faker_1.faker.person.fullName() },
                email: { type: 'string', example: faker_1.faker.internet.email() },
            };
        default:
            throw new Error(`Unsupported type: ${type}`);
    }
};
exports.authRandomData = authRandomData;
//# sourceMappingURL=auth.handler.js.map