"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPLOAD_FILE_ERROR = exports.S3_UPLOAD_ERROR = exports.SUPPORTED_SIZE_UNITS = exports.INVALID_TO_SIZE_UNIT = exports.INVALID_FROM_SIZE_UNIT = exports.ACCESS_DENIED = exports.FILES_UPLOAD_SUCCESS = exports.FILES_NOT_FOUND = exports.SELECT_FILE_ERROR = exports.SELECTED_FILE_ERROR = exports.FILES_GET_SUCCESS = exports.FILE_DETAIL_GET_SUCCESS = exports.DIRECTORY_FOUND_ERROR = exports.FILE_UPLOAD_LIMIT_ERROR = exports.FILE_SIZE_ERROR = exports.FILE_TYPE_ERROR = void 0;
// import { fileHandlerVariables } from '@constants';
const fileHandler_variables_1 = require("../variables/fileHandler.variables");
exports.FILE_TYPE_ERROR = `Only ${fileHandler_variables_1.FILE_FORMATS.join(', ')} files are allowed!`;
exports.FILE_SIZE_ERROR = 'File size exceeds the allowed limit of:';
exports.FILE_UPLOAD_LIMIT_ERROR = 'Unexpected file upload:';
exports.DIRECTORY_FOUND_ERROR = 'No directory for upload files:';
exports.FILE_DETAIL_GET_SUCCESS = 'File detail get successful.';
exports.FILES_GET_SUCCESS = 'Files get successful.';
exports.SELECTED_FILE_ERROR = 'Please select a file to upload:';
exports.SELECT_FILE_ERROR = 'Please select a file:';
exports.FILES_NOT_FOUND = 'File details not found.';
exports.FILES_UPLOAD_SUCCESS = 'Files uploaded successfully.';
exports.ACCESS_DENIED = 'Access denied: insufficient permissions.';
exports.INVALID_FROM_SIZE_UNIT = 'Invalid from unit:';
exports.INVALID_TO_SIZE_UNIT = 'Invalid to unit:';
exports.SUPPORTED_SIZE_UNITS = 'Supported units: GB, MB, KB, Byte.';
exports.S3_UPLOAD_ERROR = 'Unable to upload file on S3 bucket:';
exports.UPLOAD_FILE_ERROR = 'Something went wrong when uploading:';
//# sourceMappingURL=fileHandler.messages.js.map