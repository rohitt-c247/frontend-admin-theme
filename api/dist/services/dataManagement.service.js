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
exports.deleteDataItemsByBatch = exports.getBatches = exports.downloadPdf = exports.downloadFile = exports.uploadFile = void 0;
const promises_1 = require("node:fs/promises");
const csvtojson_1 = __importDefault(require("csvtojson"));
const json2csv_1 = require("json2csv");
const mongoose_1 = __importDefault(require("mongoose"));
const pdfkit_1 = __importDefault(require("pdfkit"));
// Config
const logger_1 = require("@config/logger");
// Utils
const _utils_1 = require("@utils");
// Models
const _models_1 = require("@models");
// Constants
const _constants_1 = require("@constants");
// Enums
const _enums_1 = require("@enums");
/**
 * Handles uploading a CSV file
 * @param {IFileType} file - The uploaded CSV file
 * @param {IUser} user - The user who uploaded the file
 * @returns {Promise<IApiResponse>} Response indicating success or failure with message and data
 */
const uploadFile = (file, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        if (!(file === null || file === void 0 ? void 0 : file.csv_file) || ((_a = file === null || file === void 0 ? void 0 : file.csv_file) === null || _a === void 0 ? void 0 : _a.length) === 0) {
            return {
                status: _constants_1.BAD_REQUEST,
                success: false,
                message: _constants_1.dataManagementMessages.FILE_REQUIRED_ERROR,
                data: null,
            };
        }
        // Create batch record
        const batch = yield _models_1.BatchModel.create([
            {
                uploadedBy: (_b = user === null || user === void 0 ? void 0 : user.id) !== null && _b !== void 0 ? _b : '',
                fileName: file.csv_file[0].originalname,
                totalRecords: 0,
                status: _enums_1.DataBatchStatus.Processing,
            },
        ], { session });
        const startTime = Date.now();
        const filePath = file.csv_file[0].path;
        // Convert CSV to JSON using csvtojson
        const jsonData = yield (0, csvtojson_1.default)().fromFile(filePath);
        yield (0, promises_1.unlink)(filePath);
        const { valid, errors, headersError, missingHeaders } = _utils_1.dataManagementHandler.validateCSV(jsonData);
        if (errors.length > 0 || headersError) {
            return {
                status: _constants_1.BAD_REQUEST,
                success: false,
                message: headersError
                    ? `${_constants_1.dataManagementMessages.FILE_VALIDATION_ERROR}: Missing headers - ${missingHeaders === null || missingHeaders === void 0 ? void 0 : missingHeaders.join(', ')}`
                    : _constants_1.dataManagementMessages.FILE_VALIDATION_ERROR,
                data: headersError ? null : errors,
            };
        }
        logger_1.logger.log(`Valid: ${valid} `);
        logger_1.logger.log(`Errors: ${errors} `);
        const dataItems = valid.map((item) => (Object.assign(Object.assign({}, item), { createdBy: user === null || user === void 0 ? void 0 : user.id, lastUpdatedBy: user === null || user === void 0 ? void 0 : user.id, batchId: batch[0].id })));
        // Save data and update batch
        if (dataItems.length > 0) {
            yield _models_1.DataModel.insertMany(dataItems, { session });
        }
        yield _utils_1.dataManagementHandler.updateBatch(session, batch, jsonData, valid, errors, startTime);
        yield session.commitTransaction();
        return {
            status: _constants_1.OK,
            success: true,
            message: _constants_1.dataManagementMessages.FILE_DATA_UPLOAD_SUCCESS,
            data: {
                batchId: batch[0].id,
                totalProcessed: jsonData.length,
                successful: valid.length,
                failed: errors.length,
                errors: errors.length > 0 ? errors : null,
            },
        };
    }
    catch (error) {
        yield session.abortTransaction();
        console.error(error);
        return {
            status: _constants_1.SERVER_ERROR,
            success: false,
            message: _constants_1.dataManagementMessages.FILE_PROCESSING_ERROR,
            data: error,
        };
    }
    finally {
        yield session.endSession();
    }
});
exports.uploadFile = uploadFile;
/**
 * Generates a CSV report based on the data items created by the user
 * @param {ExportFilters} filters - Filters to apply to the data
 * @param {IUser} user - The user who created the data items
 * @returns {Promise<IApiResponse>} Response containing the CSV document or error information
 */
const downloadFile = (filters, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield _utils_1.dataManagementHandler.getDataItemsCreatedByUser(user === null || user === void 0 ? void 0 : user.id, filters);
        if (!data || !data.length) {
            return {
                status: _constants_1.BAD_REQUEST,
                success: false,
                message: _constants_1.dataManagementMessages.FILE_DATA_NOT_FOUND,
                data: null,
            };
        }
        const { transformedData, fields } = _utils_1.dataManagementHandler.createTransformedDataAndFields(data);
        const json2csvParser = new json2csv_1.Parser({
            fields,
            delimiter: ',',
            quote: '"',
        });
        const csv = json2csvParser.parse(transformedData);
        return {
            status: _constants_1.OK,
            success: true,
            message: _constants_1.dataManagementMessages.FILE_DOWNLOAD_SUCCESS,
            data: csv,
        };
    }
    catch (error) {
        return {
            status: _constants_1.SERVER_ERROR,
            success: false,
            message: _constants_1.dataManagementMessages.FILE_DOWNLOAD_ERROR,
            data: error,
        };
    }
});
exports.downloadFile = downloadFile;
/**
 * Generates a PDF report based on the data items created by the user
 * @param {ExportFilters} filters - Filters to apply to the data
 * @param {IUser} user - The user who created the data items
 * @returns {Promise<IApiResponse>} Response containing the PDF document or error information
 */
const downloadPdf = (filters, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield _utils_1.dataManagementHandler.getDataItemsCreatedByUser(user === null || user === void 0 ? void 0 : user.id, filters);
        if (!data || !data.length) {
            return {
                status: _constants_1.BAD_REQUEST,
                success: false,
                message: _constants_1.dataManagementMessages.FILE_DATA_NOT_FOUND,
                data: null,
            };
        }
        const doc = new pdfkit_1.default({
            size: 'A4',
            margin: 50,
            bufferPages: true,
        });
        const chunks = [];
        doc.on('data', (chunk) => chunks.push(chunk));
        _utils_1.dataManagementHandler.addPDFHeaderInfo(doc, _constants_1.dataManagementVariables.PDF_GENERATION_OPTIONS);
        _utils_1.dataManagementHandler.addDataToPDF(doc, data, _constants_1.dataManagementVariables.PDF_GENERATION_OPTIONS);
        doc.end();
        return new Promise((resolve) => {
            doc.on('end', () => {
                resolve({
                    status: _constants_1.OK,
                    success: true,
                    message: _constants_1.dataManagementMessages.FILE_DOWNLOAD_SUCCESS,
                    data: Buffer.concat(chunks),
                });
            });
        });
    }
    catch (error) {
        return {
            status: _constants_1.SERVER_ERROR,
            success: false,
            message: _constants_1.dataManagementMessages.FILE_DOWNLOAD_ERROR,
            data: error,
        };
    }
});
exports.downloadPdf = downloadPdf;
/**
 * Retrieves a list of data batches uploaded by the specified user.
 *
 * @param {IUser} user - The user whose batches are to be retrieved.
 * @returns {Promise<IApiResponse>} Response containing the list of batches or error information.
 */
const getBatches = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield _models_1.BatchModel.find({ uploadedBy: user === null || user === void 0 ? void 0 : user.id });
        return {
            status: _constants_1.OK,
            success: true,
            message: _constants_1.dataManagementMessages.GET_BATCHES_SUCCESS,
            data,
        };
    }
    catch (error) {
        return {
            status: _constants_1.SERVER_ERROR,
            success: false,
            message: _constants_1.dataManagementMessages.GET_BATCHES_ERROR,
            data: error,
        };
    }
});
exports.getBatches = getBatches;
/**
 * Deletes all data items associated with a given batch ID.
 * @param {string} params.batchId - The ID of the batch whose data items are to be deleted.
 * @returns {Promise<IApiResponse>} Response containing the result of the deletion, including the status, success flag, message, and data (if any).
 */
const deleteDataItemsByBatch = (params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const batch = yield _models_1.BatchModel.findById(params.batchId);
        if (!batch) {
            return {
                status: _constants_1.BAD_REQUEST,
                success: false,
                message: _constants_1.dataManagementMessages.BATCH_NOT_FOUND,
                data: null,
            };
        }
        yield _utils_1.dataManagementHandler.deleteDataItemsAndBatch(params.batchId);
        return {
            status: _constants_1.NO_CONTENT,
            success: true,
            message: _constants_1.dataManagementMessages.FILE_DATA_DELETED_SUCCESS,
            data: null,
        };
    }
    catch (error) {
        return {
            status: _constants_1.SERVER_ERROR,
            success: false,
            message: _constants_1.dataManagementMessages.FILE_DATA_DELETED_ERROR,
            data: error,
        };
    }
});
exports.deleteDataItemsByBatch = deleteDataItemsByBatch;
//# sourceMappingURL=dataManagement.service.js.map