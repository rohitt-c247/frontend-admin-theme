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
exports.disconnectUserDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const envVar_1 = __importDefault(require("./envVar"));
const logger_1 = require("./logger");
const connectUserDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mongoUri = `${envVar_1.default.MONGODB_URI}`;
        const conn = yield mongoose_1.default.connect(mongoUri || '');
        logger_1.logger.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (err) {
        const error = err;
        logger_1.logger.error(`MongoDB Error: ${error.message}`);
        process.exit(1);
    }
});
const disconnectUserDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect();
});
exports.disconnectUserDB = disconnectUserDB;
exports.default = connectUserDB;
//# sourceMappingURL=db.js.map