"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _constants_1 = require("@constants");
const _utils_1 = require("@utils");
const dataManagementResponses = {
    UploadFile: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.dataManagementMessages.FILE_DATA_UPLOAD_SUCCESS, {
        $ref: '#/components/schemas/UploadFileData',
    }),
    GetBatches: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.dataManagementMessages.GET_BATCHES_SUCCESS, _utils_1.swaggerHandler.createListResponse({
        $ref: '#/components/schemas/GetBatchesResponse',
    }, _constants_1.dataManagementMessages.GET_BATCHES_SUCCESS)),
};
exports.default = dataManagementResponses;
//# sourceMappingURL=responses.js.map