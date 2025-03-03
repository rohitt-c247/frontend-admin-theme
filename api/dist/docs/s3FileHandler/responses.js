"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// constants
const _constants_1 = require("@constants");
// utils
const _utils_1 = require("@utils");
const s3FileHandlerResponses = {
    S3FileUploaded: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.fileHandlerMessages.FILES_UPLOAD_SUCCESS, {
        $ref: _constants_1.fileHandlerVariables.REF_S3_FILE,
    }),
    S3FileFetched: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.fileHandlerMessages.FILE_DETAIL_GET_SUCCESS, {
        $ref: _constants_1.fileHandlerVariables.REF_S3_FILE,
    }),
    S3FileListFetched: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.fileHandlerMessages.FILES_GET_SUCCESS, _utils_1.swaggerHandler.createListResponse({
        $ref: _constants_1.fileHandlerVariables.REF_S3_FILE,
    }, _constants_1.fileHandlerMessages.FILES_GET_SUCCESS)),
};
exports.default = s3FileHandlerResponses;
//# sourceMappingURL=responses.js.map