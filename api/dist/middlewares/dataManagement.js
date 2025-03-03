"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadCsvMiddleware = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
//third-party modules
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
//config
const logger_1 = require("@config/logger");
//constants
const _constants_1 = require("@constants");
/**
 * Ensures that the specified directory exists. If the directory does not exist,
 * it creates the directory and any necessary parent directories.
 *
 * @param dirPath - The path of the directory to check and create if necessary.
 */
const ensureDirectoryExists = (dirPath) => {
    if (!node_fs_1.default.existsSync(dirPath)) {
        node_fs_1.default.mkdirSync(dirPath, { recursive: true });
    }
};
/**
 * Returns the directory path where CSV files will be uploaded.
 *
 * The directory path is resolved relative to the root of the project.
 * The directory is created if it does not exist.
 *
 * @returns The path of the upload directory.
 */
const getUploadDestination = () => {
    const destinationPath = path_1.default.join(__dirname, `../../public/${_constants_1.dataManagementVariables.UPLOAD_DIR}/${_constants_1.dataManagementVariables.UPLOAD_FOLDER}/`);
    ensureDirectoryExists(destinationPath);
    return destinationPath;
};
/**
 * Upload middleware for CSV files.
 *
 * @param _req - The request object.
 * @param _file - The file object.
 * @param cb - The callback function.
 * @returns The file name and path of the uploaded file.
 */
exports.uploadCsvMiddleware = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: (_req, _file, cb) => {
            const destinationPath = getUploadDestination();
            logger_1.logger.info(`File upload path: ${destinationPath}`);
            cb(null, destinationPath);
        },
        filename: (_req, file, cb) => {
            const fileName = `${Date.now().toString()}-${file.originalname}`;
            cb(null, fileName);
        },
    }),
    limits: {
        fileSize: _constants_1.dataManagementVariables.FILE_SIZE,
    },
    fileFilter: (_req, file, cb) => {
        const extname = path_1.default.extname(file.originalname).toLowerCase();
        if (_constants_1.dataManagementVariables.FILE_FORMATS.includes(extname.slice(1))) {
            cb(null, true);
        }
        else {
            cb(new Error(_constants_1.dataManagementMessages.FILE_TYPE_ERROR));
        }
    },
}).fields([
    {
        name: _constants_1.dataManagementVariables.FILE_UPLOAD_FIELD,
        maxCount: _constants_1.dataManagementVariables.FILE_UPLOAD_LIMIT,
    },
]);
//# sourceMappingURL=dataManagement.js.map