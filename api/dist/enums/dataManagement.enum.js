"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBatchStatus = exports.DataItemStatus = void 0;
var DataItemStatus;
(function (DataItemStatus) {
    DataItemStatus["Available"] = "Available";
    DataItemStatus["Expired"] = "Expired";
})(DataItemStatus || (exports.DataItemStatus = DataItemStatus = {}));
var DataBatchStatus;
(function (DataBatchStatus) {
    DataBatchStatus["Processing"] = "processing";
    DataBatchStatus["Completed"] = "completed";
    DataBatchStatus["Failed"] = "failed";
    DataBatchStatus["CompletedWithError"] = "completed with error";
})(DataBatchStatus || (exports.DataBatchStatus = DataBatchStatus = {}));
//# sourceMappingURL=dataManagement.enum.js.map