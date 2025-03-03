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
exports.verifyJwt = exports.conditionalImport = exports.convertTime = exports.convertFileSize = exports.isLogger = void 0;
//Third party
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
//Internal modules
const envVar_1 = __importDefault(require("@config/envVar"));
//Config
const index_1 = require("@config/index");
//Constants
const _constants_1 = require("@constants");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.isLogger = envVar_1.default.NODE_ENV === 'development';
/**
 * Converts a file size from one unit to another.
 * @param {number} size The size of the file in the given unit.
 * @param {string} fromUnit The unit that the given size is in.
 * @param {string} toUnit The unit to convert the size to.
 * @returns {number} The size of the file in the given unit.
 * @throws {Error} If either the fromUnit or toUnit is not a valid unit.
 */
const convertFileSize = (size, fromUnit, toUnit) => __awaiter(void 0, void 0, void 0, function* () {
    index_1.logger.log(`${size}, ${fromUnit}, ${toUnit}`);
    // File size conversion units in bytes
    const unitsInBytes = {
        gb: 1024 * 1024 * 1024, // 1 GB = 1024 * 1024 * 1024 Bytes
        mb: 1024 * 1024, // 1 MB = 1024 * 1024 Bytes
        kb: 1024, // 1 KB = 1024 Bytes
        byte: 1, // 1 Byte
    };
    // Normalize units to lowercase to handle case-insensitivity
    const fromUnitLower = fromUnit.toLowerCase();
    const toUnitLower = toUnit.toLowerCase();
    // Check if the provided units are valid
    if (!unitsInBytes[fromUnitLower]) {
        throw new Error(`${_constants_1.commonMessages.INVALID_FROM_UNIT} "${fromUnit}". ${_constants_1.commonMessages.SUPPORTED_SIZE_UNITS}`);
    }
    if (!unitsInBytes[toUnitLower]) {
        throw new Error(`${_constants_1.commonMessages.INVALID_TO_UNIT} "${toUnit}". ${_constants_1.commonMessages.SUPPORTED_SIZE_UNITS}`);
    }
    // Convert from `fromUnit` to bytes
    const sizeInBytes = size * unitsInBytes[fromUnitLower];
    // Convert from bytes to `toUnit`
    index_1.logger.log(`${sizeInBytes / unitsInBytes[toUnitLower]}`);
    return sizeInBytes / unitsInBytes[toUnitLower];
});
exports.convertFileSize = convertFileSize;
/**
 * Converts a time duration from one unit to another.
 * @param {number} duration The duration of time in the given unit.
 * @param {string} fromUnit The unit that the given duration is in.
 * @param {string} toUnit The unit to convert the duration to.
 * @returns {number} The duration of time in the given unit.
 * @throws {Error} If either the fromUnit or toUnit is not a valid unit.
 */
const convertTime = (duration, fromUnit, toUnit) => __awaiter(void 0, void 0, void 0, function* () {
    // Time conversion units in milliseconds
    const unitsInMilliseconds = {
        year: 365 * 24 * 60 * 60 * 1000, // 1 year = 365 days in milliseconds
        month: 30 * 24 * 60 * 60 * 1000, // 1 month = 30 days in milliseconds
        day: 24 * 60 * 60 * 1000, // 1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
        hour: 60 * 60 * 1000, // 1 hour = 60 minutes * 60 seconds * 1000 milliseconds
        minute: 60 * 1000, // 1 minute = 60 seconds * 1000 milliseconds
        second: 1000, // 1 second = 1000 milliseconds
        millisecond: 1, // 1 millisecond
    };
    // Normalize units to lowercase to handle case-insensitivity
    const fromUnitLower = fromUnit.toLowerCase();
    const toUnitLower = toUnit.toLowerCase();
    // Check if the provided units are valid
    if (!unitsInMilliseconds[fromUnitLower]) {
        throw new Error(`${_constants_1.commonMessages.INVALID_FROM_UNIT} "${fromUnit}". ${_constants_1.commonMessages.SUPPORTED_TIME_UNITS}`);
    }
    if (!unitsInMilliseconds[toUnitLower]) {
        throw new Error(`${_constants_1.commonMessages.INVALID_TO_UNIT} "${toUnit}". ${_constants_1.commonMessages.SUPPORTED_TIME_UNITS}`);
    }
    // Convert from `fromUnit` to milliseconds
    const durationInMilliseconds = duration * unitsInMilliseconds[fromUnitLower];
    // Convert from milliseconds to `toUnit`
    return durationInMilliseconds / unitsInMilliseconds[toUnitLower];
});
exports.convertTime = convertTime;
/**
 * Conditionally imports a module based on the existence of a file.
 * @param {string} modulePath The path to the module to import.
 * @param {string} importPath The path to the import statement.
 * @returns {Promise<object | T>} A promise that resolves to the imported module if the file exists, or an empty object if it does not.
 */
const conditionalImport = (modulePath, importPath) => {
    const absolutePath = node_path_1.default.resolve(modulePath);
    if (node_fs_1.default.existsSync(absolutePath)) {
        return Promise.resolve(`${importPath}`).then(s => __importStar(require(s))).catch((_e) => {
            return {};
        });
    }
    return Promise.resolve({});
};
exports.conditionalImport = conditionalImport;
/**
 * Verifies a JWT token using a secret key.
 *
 * @param {string} token - The JWT token to verify.
 * @param {string} secret - The secret key to use for verification.
 * @returns {Promise<AuthTokenPayload>} - A promise that resolves to the decoded payload,
 *   or rejects with an error if the token is invalid.
 */
const verifyJwt = (token, secret) => new Promise((resolve, reject) => jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
    if (err || typeof decoded !== 'object' || !('id' in decoded)) {
        return reject(err || new Error(_constants_1.commonMessages.INVALID_TOKEN));
    }
    resolve(decoded);
}));
exports.verifyJwt = verifyJwt;
//# sourceMappingURL=common.handler.js.map