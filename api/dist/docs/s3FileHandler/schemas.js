"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _utils_1 = require("@utils");
const s3FileHandlerSchemas = {
    // File schema
    S3File: {
        type: 'object',
        properties: _utils_1.fileHandler.fileHandlerRandomData('fileSchema'),
    },
    // Upload File Request
    S3UploadFileRequest: {
        type: 'object',
        required: ['fileUpload'],
        properties: _utils_1.fileHandler.fileHandlerRandomData('fileUploadSchema'),
    },
};
exports.default = s3FileHandlerSchemas;
//# sourceMappingURL=schemas.js.map