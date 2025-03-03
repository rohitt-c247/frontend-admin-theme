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
exports.userRandomData = exports.generateSetPasswordToken = exports.generateHashedToken = void 0;
//Third-party modules
const node_crypto_1 = __importDefault(require("node:crypto"));
//Constants
const _constants_1 = require("@constants");
//Utils
const _utils_1 = require("@utils");
//Enums
const _enums_1 = require("@enums");
//Third-party modules
const faker_1 = require("@faker-js/faker");
/**
 * Generates a hashed version of a token using the algorithm specified in
 * the HASH_METHOD configuration variable.
 * @param token - The token to be hashed.
 * @returns A hashed version of the token.
 */
const generateHashedToken = (token) => {
    return node_crypto_1.default.createHash(_constants_1.commonVariables.HASH_METHOD).update(token).digest('hex');
};
exports.generateHashedToken = generateHashedToken;
/**
 * Generates a random token, its hashed version, and an expiration date for a set password flow.
 * @returns An object containing the generated token, its hashed version, and the expiration date.
 */
const generateSetPasswordToken = () => __awaiter(void 0, void 0, void 0, function* () {
    // Generate a random token and its hashed version
    const token = node_crypto_1.default.randomBytes(32).toString('hex');
    const hashedToken = (0, exports.generateHashedToken)(token);
    // Calculate token expiration duration in milliseconds
    const expireDuration = yield _utils_1.commonHandler.convertTime(Number(_constants_1.userVariables.SET_PASSWORD_EXPIRE), _constants_1.userVariables.SET_PASSWORD_TOKEN_UNIT, 'millisecond');
    // Set the expiration date based on current time and duration
    const expireDate = new Date(Date.now() + expireDuration);
    return { token, hashedToken, expireDate };
});
exports.generateSetPasswordToken = generateSetPasswordToken;
/**
 * Generates random data for user related APIs.
 * @param {string} type The type of random data to generate. Supported types are:
 *   - `userSchema`: Random data conforming to the user schema.
 *   - `createUserRequest`: Random data for creating a new user.
 *   - `updateUserRequest`: Random data for updating a user.
 *   - `changeStatusRequest`: Random data for changing the status of a user.
 *   - `setPasswordRequest`: Random data for setting a new password for a user.
 * @returns {object} An object containing the random data.
 * @throws {Error} If the `type` parameter is not supported.
 */
const userRandomData = (type) => {
    const commonData = {
        name: { type: 'string', example: faker_1.faker.person.fullName() },
        email: { type: 'string', example: faker_1.faker.internet.email() },
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
        case 'userSchema':
            return Object.assign(Object.assign({}, commonData), { id: { type: 'string', example: faker_1.faker.string.uuid() }, status: commonStatus, isDeleted: { type: 'boolean', example: false }, isTwoAuthEnabled: { type: 'boolean', example: false }, preferredTwoFAMethods: {
                    type: 'array',
                    example: [],
                }, recoveryCodes: {
                    type: 'array',
                    example: [],
                }, createdAt: { type: 'string', example: faker_1.faker.date.past() }, updatedAt: { type: 'string', example: faker_1.faker.date.recent() } });
        case 'createUserRequest':
            return commonData;
        case 'updateUserRequest':
            return Object.assign(Object.assign({}, commonData), { status: commonStatus });
        case 'changeStatusRequest':
            return {
                status: commonStatus,
            };
        case 'setPasswordRequest':
            return {
                password: commonPassword,
                token: { type: 'string', example: faker_1.faker.string.uuid() },
            };
        default:
            throw new Error(`Unsupported type: ${type}`);
    }
};
exports.userRandomData = userRandomData;
//# sourceMappingURL=user.handler.js.map