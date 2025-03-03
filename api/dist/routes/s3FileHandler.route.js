"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _controllers_1 = require("@controllers");
const _middlewares_1 = require("@middlewares");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Apply the authentication middleware to all routes in this group
router.get('/:fileId', _middlewares_1.authenticate, _controllers_1.s3FileHandlerController.fetchS3File);
router.get('/', _middlewares_1.authenticate, _controllers_1.s3FileHandlerController.fetchS3FileList);
router.post('/upload', _middlewares_1.authenticate, _middlewares_1.uploadFileS3, _controllers_1.s3FileHandlerController.s3FileUpload);
exports.default = router;
//# sourceMappingURL=s3FileHandler.route.js.map