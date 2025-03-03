"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const _controllers_1 = require("@controllers");
const _middlewares_1 = require("@middlewares");
const router = express_1.default.Router();
// Apply the authentication middleware to all routes in this group
router.get('/:fileId', _middlewares_1.authenticate, _controllers_1.localFileHandlerController.fetchLocalFile);
router.get('/', _middlewares_1.authenticate, _controllers_1.localFileHandlerController.fetchLocalFileList);
router.post('/upload', _middlewares_1.authenticate, _middlewares_1.uploadFileLocal, _controllers_1.localFileHandlerController.localFileUpload);
exports.default = router;
//# sourceMappingURL=localFileHandler.route.js.map