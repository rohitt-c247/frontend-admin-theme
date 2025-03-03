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
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3FileUpload = exports.fetchS3FileList = exports.fetchS3File = void 0;
const _constants_1 = require("@constants");
const _enums_1 = require("@enums");
const _models_1 = require("@models");
/**
 * Get particular file from the database with storage type.
 * @param {Request} req Express request object
 * @returns {IApiResponse} Response containing the files and user detail or error information
 */
const fetchS3File = (fileId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!fileId) {
        return {
            status: _constants_1.BAD_REQUEST,
            success: false,
            message: _constants_1.fileHandlerMessages.SELECT_FILE_ERROR,
            data: null,
        };
    }
    const file = yield _models_1.File.findById(fileId);
    if (!file)
        return {
            status: _constants_1.BAD_REQUEST,
            success: false,
            message: _constants_1.fileHandlerMessages.FILES_NOT_FOUND,
            data: null,
        };
    return {
        status: _constants_1.OK,
        success: true,
        message: _constants_1.fileHandlerMessages.FILE_DETAIL_GET_SUCCESS,
        data: file,
    };
});
exports.fetchS3File = fetchS3File;
/**
 * Get list of files with storage type of a user from the database.
 * @param {Request} req Express request object
 * @returns {IApiResponse} Response containing the files and user detail or error information
 */
const fetchS3FileList = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const fileFilter = user.role === _enums_1.Role.User ? { userId: user.id } : {};
    const userFiles = yield _models_1.File.find(fileFilter);
    return {
        status: _constants_1.OK,
        success: true,
        message: _constants_1.fileHandlerMessages.FILES_GET_SUCCESS,
        data: userFiles,
    };
});
exports.fetchS3FileList = fetchS3FileList;
/**
 * Store local file path with storage_type to user in database.
 * @param {Request} req Express request object
 * @returns {IApiResponse} Response containing the files and user detail or error information
 */
const s3FileUpload = (user, files) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadedFiles = [];
    if (files) {
        if (files === null || files === void 0 ? void 0 : files.fileUpload) {
            files.fileUpload.forEach((file) => uploadedFiles.push(file.path));
        }
    }
    if (uploadedFiles.length === 0) {
        return {
            status: _constants_1.BAD_REQUEST,
            success: false,
            message: _constants_1.fileHandlerMessages.SELECTED_FILE_ERROR,
            data: null,
        };
    }
    const result = yield _models_1.File.create({
        userId: user.id,
        path: uploadedFiles,
    });
    return {
        status: _constants_1.OK,
        success: true,
        message: _constants_1.fileHandlerMessages.FILES_UPLOAD_SUCCESS,
        data: result,
    };
});
exports.s3FileUpload = s3FileUpload;
//# sourceMappingURL=s3FileHandler.service.js.map