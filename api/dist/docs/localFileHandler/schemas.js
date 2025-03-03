"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _utils_1 = require("@utils");
const localFileHandlerSchemas = {
    LocalFile: {
        type: 'object',
        properties: _utils_1.fileHandler.fileHandlerRandomData('fileSchema'),
    },
    // Upload File Request
    LocalUploadFileRequest: {
        type: 'object',
        required: ['fileUpload'],
        properties: _utils_1.fileHandler.fileHandlerRandomData('fileUploadSchema'),
    },
};
exports.default = localFileHandlerSchemas;
//# sourceMappingURL=schemas.js.map