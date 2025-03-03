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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserByEmail = exports.getUserByPhone = exports.getUserByEmail = exports.getAllUsers = exports.getUserById = exports.checkIfUserExists = void 0;
const logger_1 = require("@config/logger");
const _constants_1 = require("@constants");
const _models_1 = require("@models");
/**
 * Checks if a user exists in the database by their email.
 * @param {string} email - The email of the user to check for existence.
 * @returns {Promise<boolean>} - Resolves to true if the user exists, otherwise false.
 */
const checkIfUserExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield _models_1.User.findOne({ email });
    return !!existingUser;
});
exports.checkIfUserExists = checkIfUserExists;
/**
 * Retrieves a user by their ID from the database.
 * @param {string} userId - The ID of the user to be retrieved.
 * @returns {Promise<IUser | null>} - The user document if found, otherwise null.
 */
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield _models_1.User.findById(userId);
});
exports.getUserById = getUserById;
/**
 * Retrieves a paginated list of users from the database with specified filtering and sorting.
 *
 * @param {number} limit - The maximum number of users to return.
 * @param {number} offset - The number of users to skip for pagination.
 * @param {Record<string, any>} filter - The filter criteria to apply to the user query.
 * @param {Record<string, any>} sort - The sorting criteria to apply to the user query.
 * @returns {Promise<IUser[]>} - A promise that resolves to an array of user objects, excluding sensitive fields.
 */
const getAllUsers = (limit, offset, filter, sort) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notAllowedFields = {};
        _constants_1.commonVariables.USER_SENSITIVE_INFO_DB_COLUMNS.forEach((field) => {
            notAllowedFields[field] = 0;
        });
        // return await User.find(filter).sort(sort).skip(offset).limit(limit);
        const users = yield _models_1.User.aggregate([
            { $match: filter }, // Apply filter
            { $sort: sort }, // Apply sorting
            { $skip: offset }, // Apply offset for pagination
            { $limit: limit }, // Apply limit for pagination
            { $addFields: { id: '$_id' } }, // Add id field
            { $project: notAllowedFields }, // Exclude sensitive fields
        ]);
        return users;
    }
    catch (error) {
        logger_1.logger.error(`Could not fetch users: ${error}`);
        return [];
    }
});
exports.getAllUsers = getAllUsers;
/**
 * Retrieves a user by email.
 * @param {string} email The email of the user to be retrieved.
 * @returns {Promise<IUser | null>} The user document if found or null if not found.
 */
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield _models_1.User.findOne({
        email: email.toLowerCase(),
        isDeleted: false,
    });
});
exports.getUserByEmail = getUserByEmail;
/**
 * Retrieves a user by phone number.
 * @param {string} phoneNumber The phone number of the user to be retrieved.
 * @returns {Promise<IUser | null>} The user document if found or null if not found.
 */
const getUserByPhone = (phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    return yield _models_1.User.findOne({
        phoneNumber: phoneNumber,
        isDeleted: false,
    });
});
exports.getUserByPhone = getUserByPhone;
/**
 * Updates a user's information based on their email.
 * If provided, only fields that differ from the current values will be updated.
 * Special handling is included for updating the 'preferredTwoFAMethods' field.
 *
 * @param {string} email - The email of the user to be updated.
 * @param {Partial<IUser> | null} updates - The fields to update with their new values.
 * @returns {Promise<IUser | null>} - The updated user document, or null if the user was not found.
 */
const updateUserByEmail = (email, updates) => __awaiter(void 0, void 0, void 0, function* () {
    const userDoc = yield (0, exports.getUserByEmail)(email);
    if (!userDoc)
        return null;
    // Dynamically update fields only if the value has changed
    if (updates) {
        Object.keys(updates).forEach((key) => {
            var _a, _b;
            if (userDoc[key] !== updates[key]) {
                // If we're updating 'preferredTwoFAMethods', handle it separately
                if (key === 'preferredTwoFAMethods') {
                    // Check if the method already exists in the array
                    const currentMethodType = ((_a = updates[key]) === null || _a === void 0 ? void 0 : _a[0]) ? updates[key][0].methodType : undefined;
                    if (currentMethodType &&
                        userDoc.preferredTwoFAMethods &&
                        !userDoc.preferredTwoFAMethods.some((method) => method.methodType === currentMethodType)) {
                        // If the method is not already in the array, push it
                        if (userDoc[key]) {
                            userDoc[key].push(...((_b = updates[key]) !== null && _b !== void 0 ? _b : []));
                        }
                        else {
                            userDoc[key] = updates[key];
                        }
                    }
                }
                else {
                    // For other fields, update them normally
                    userDoc[key] = updates[key];
                }
            }
        });
    }
    // Save the updated user document
    // Save the updated user document
    const updatedUserDoc = yield userDoc.save();
    return (0, _models_1.modelToDomain)(updatedUserDoc);
});
exports.updateUserByEmail = updateUserByEmail;
//# sourceMappingURL=userCommon.service.js.map