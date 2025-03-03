"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LIMIT_UNEXPECTED_FILE_ERROR_CODE = exports.ENOENT_ERROR_CODE = exports.LIMIT_FILE_SIZE_ERROR_CODE = exports.S3FILEHANDLER_MODULE_SWAGGER_OPERATIONS_PATH = exports.LOCALFILEHANDLER_MODULE_SWAGGER_OPERATIONS_PATH = exports.REF_S3_FILE = exports.REF_LOCAL_FILE = exports.UPLOAD_FOLDER = exports.UPLOAD_DIR = exports.FILE_SIZE = exports.FILE_UPLOAD_LIMIT = exports.FILE_UPLOAD_FIELD = exports.FILE_FORMATS = void 0;
exports.FILE_FORMATS = ['pdf', 'doc', 'docx', 'csv', 'jpg', 'jpeg', 'png'];
exports.FILE_UPLOAD_FIELD = 'fileUpload';
exports.FILE_UPLOAD_LIMIT = 1;
exports.FILE_SIZE = 50 * 1024 * 1024; //50 MB
exports.UPLOAD_DIR = 'public/uploads';
exports.UPLOAD_FOLDER = 'documents';
exports.REF_LOCAL_FILE = '#/components/schemas/LocalFile';
exports.REF_S3_FILE = '#/components/schemas/S3File';
exports.LOCALFILEHANDLER_MODULE_SWAGGER_OPERATIONS_PATH = 'src/docs/localFileHandler/operations.ts';
exports.S3FILEHANDLER_MODULE_SWAGGER_OPERATIONS_PATH = 'src/docs/s3FileHandler/operations.ts';
exports.LIMIT_FILE_SIZE_ERROR_CODE = 'LIMIT_FILE_SIZE';
exports.ENOENT_ERROR_CODE = 'ENOENT';
exports.LIMIT_UNEXPECTED_FILE_ERROR_CODE = 'LIMIT_UNEXPECTED_FILE';
//# sourceMappingURL=fileHandler.variables.js.map