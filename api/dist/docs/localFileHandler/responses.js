"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// constants
const _constants_1 = require("@constants");
// utils
const _utils_1 = require("@utils");
const localFileHandlerResponses = {
    FileUploaded: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.fileHandlerMessages.FILES_UPLOAD_SUCCESS, {
        $ref: _constants_1.fileHandlerVariables.REF_LOCAL_FILE,
    }),
    FileFetched: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.fileHandlerMessages.FILE_DETAIL_GET_SUCCESS, {
        $ref: _constants_1.fileHandlerVariables.REF_LOCAL_FILE,
    }),
    FileListFetched: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.fileHandlerMessages.FILES_GET_SUCCESS, _utils_1.swaggerHandler.createListResponse({
        $ref: _constants_1.fileHandlerVariables.REF_LOCAL_FILE,
    }, _constants_1.fileHandlerMessages.FILES_GET_SUCCESS)),
};
exports.default = localFileHandlerResponses;
//# sourceMappingURL=responses.js.map