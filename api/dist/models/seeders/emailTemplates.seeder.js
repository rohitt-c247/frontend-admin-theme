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
require("module-alias/register"); // Import at the top
const db_1 = __importDefault(require("@config/db"));
const logger_1 = require("@config/logger");
const _constants_1 = require("@constants");
const _models_1 = require("@models");
//run this command to seed:  node dist/models/seeders/emailTemplates.seeder
/**
 * Seeds email templates into the MongoDB database.
 *
 * @function seedEmailTemplates
 * @async
 *
 * @returns {Promise<void>}
 */
const seedEmailTemplates = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.default)();
        yield _models_1.EmailTemplate.deleteMany({});
        yield _models_1.EmailTemplate.insertMany(_constants_1.emailTemplatesVariables.emailTemplates);
        logger_1.logger.info('Email templates seeded successfully');
        process.exit(0);
    }
    catch (error) {
        logger_1.logger.error(`Error seeding email templates: ${error}`);
        process.exit(1);
    }
});
seedEmailTemplates();
//# sourceMappingURL=emailTemplates.seeder.js.map