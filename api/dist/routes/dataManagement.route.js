"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _controllers_1 = require("@controllers");
const _middlewares_1 = require("@middlewares");
const _utils_1 = require("@utils");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Upload CSV and Process Data
router.post('/upload', _middlewares_1.authenticate, _utils_1.dataManagementHandler.uploadFile, _controllers_1.dataManagementController.uploadFile);
// Download CSV
router.get('/download/file', _middlewares_1.authenticate, _controllers_1.dataManagementController.downloadFile);
// Download PDF
router.get('/download/pdf', _middlewares_1.authenticate, _controllers_1.dataManagementController.downloadPdf);
router.get('/batches', _middlewares_1.authenticate, _controllers_1.dataManagementController.getBatches);
//Delete Data
router.delete('/batches/:batchId/dataItems', _middlewares_1.authenticate, _controllers_1.dataManagementController.deleteDataItemsByBatch);
exports.default = router;
//# sourceMappingURL=dataManagement.route.js.map