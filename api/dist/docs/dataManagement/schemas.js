"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _utils_1 = require("@utils");
const dataManagementSchemas = {
    UploadFileData: {
        type: 'object',
        properties: _utils_1.dataManagementHandler.dataManagementRandomData('UploadFileResponse'),
    },
    UploadFileRequest: {
        type: 'object',
        properties: {
            csv_file: {
                type: 'string',
                format: 'binary',
            },
        },
    },
    GetBatchesResponse: {
        type: 'object',
        properties: _utils_1.dataManagementHandler.dataManagementRandomData('GetBatchesResponse'),
    },
};
exports.default = dataManagementSchemas;
//# sourceMappingURL=schemas.js.map