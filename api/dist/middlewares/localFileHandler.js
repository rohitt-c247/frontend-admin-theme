"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileLocal = void 0;
const path_1 = __importDefault(require("path"));
const _utils_1 = require("@utils");
// Third-party modules
const multer_1 = __importDefault(require("multer"));
const _constants_1 = require("@constants");
const _utils_2 = require("@utils");
/**
 * Local file storage configuration.
 */
const localFileStorage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        // File upload path
        const destinationPath = `${_constants_1.fileHandlerVariables.UPLOAD_DIR}/${_constants_1.fileHandlerVariables.UPLOAD_FOLDER}/`;
        cb(null, destinationPath);
    },
    filename: (_req, file, cb) => {
        //Upload file name
        const fileName = `${Date.now().toString()}-${file.originalname}`;
        cb(null, fileName);
    },
});
/**
 * Middleware to handle local file upload.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 * @returns {void}
 * @throws {ErrorHandler} An error handler with a 400 status code if the file upload fails.
 */
const localUploadMiddleware = (0, multer_1.default)({
    storage: localFileStorage,
    limits: {
        fileSize: _constants_1.fileHandlerVariables.FILE_SIZE,
    },
    fileFilter: (_req, file, cb) => {
        const extname = path_1.default.extname(file.originalname).toLowerCase();
        if (_constants_1.fileHandlerVariables.FILE_FORMATS.includes(extname.slice(1))) {
            cb(null, true);
        }
        else {
            cb(new Error(_constants_1.fileHandlerMessages.FILE_TYPE_ERROR));
        }
    },
}).fields([
    {
        name: _constants_1.fileHandlerVariables.FILE_UPLOAD_FIELD,
        maxCount: _constants_1.fileHandlerVariables.FILE_UPLOAD_LIMIT,
    },
]);
/**
 * Handles local file uploading.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 * @throws {ErrorHandler} An error handler with a 400 status code if the file upload fails.
 */
const uploadFileLocal = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const convertedFileSize = yield _utils_1.commonHandler.convertFileSize(_constants_1.fileHandlerVariables.FILE_SIZE, 'Byte', 'MB');
        localUploadMiddleware(req, res, (error) => {
            if (error) {
                if (error.code === _constants_1.fileHandlerVariables.LIMIT_FILE_SIZE_ERROR_CODE) {
                    return next(new _utils_2.ErrorHandler(`${error.field} ${_constants_1.fileHandlerMessages.FILE_SIZE_ERROR} ${convertedFileSize}MB`, 400, error));
                }
                if (error.code === _constants_1.fileHandlerVariables.ENOENT_ERROR_CODE) {
                    return next(new _utils_2.ErrorHandler(`${_constants_1.fileHandlerMessages.DIRECTORY_FOUND_ERROR} ${_constants_1.fileHandlerVariables.UPLOAD_DIR}.`, 400, error));
                }
                if (error.code === _constants_1.fileHandlerVariables.LIMIT_UNEXPECTED_FILE_ERROR_CODE) {
                    return next(new _utils_2.ErrorHandler(`${_constants_1.fileHandlerMessages.FILE_UPLOAD_LIMIT_ERROR} for ${error.field} `, 400, error));
                }
                if (error.name === 'Error') {
                    return next(new _utils_2.ErrorHandler(error.message, 400, error));
                }
                return next(new _utils_2.ErrorHandler(`${_constants_1.fileHandlerMessages.UPLOAD_FILE_ERROR} ${error.field}.`, 400, error));
            }
            next();
        });
    }
    catch (error) {
        (0, _utils_2.catchHandler)(error, next);
    }
});
exports.uploadFileLocal = uploadFileLocal;
//# sourceMappingURL=localFileHandler.js.map