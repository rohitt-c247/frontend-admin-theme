"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileHandlerRandomData = void 0;
const faker_1 = require("@faker-js/faker");
/**
 * Generates random data for a file handler based on the provided type.
 * @param {string} type - The type of file handler data to generate.
 * @returns {Record<string, unknown>} - The random data for the file handler.
 * @throws {Error} If the type is not supported.
 */
const fileHandlerRandomData = (type) => {
    switch (type) {
        case 'fileSchema':
            return {
                id: { type: 'string', example: faker_1.faker.string.uuid() },
                userId: { type: 'string', example: faker_1.faker.string.uuid() },
                path: { type: 'string', example: faker_1.faker.system.filePath() },
                isDeleted: { type: 'boolean', example: faker_1.faker.datatype.boolean() },
                createdAt: { type: 'string', example: faker_1.faker.date.past() },
                updatedAt: { type: 'string', example: faker_1.faker.date.past() },
            };
        case 'fileUploadSchema':
            return {
                fileUpload: { type: 'string', format: 'binary', example: faker_1.faker.system.fileName() },
            };
        default:
            throw new Error(`Unsupported type: ${type}`);
    }
};
exports.fileHandlerRandomData = fileHandlerRandomData;
//# sourceMappingURL=file.handler.js.map