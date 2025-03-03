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
exports.dataManagementRandomData = exports.buildFilters = exports.deleteDataItemsAndBatchesCreatedByUser = exports.deleteDataItemsAndBatch = exports.getDataItemsCreatedByUser = exports.addDataToPDF = exports.drawTableRow = exports.addPDFHeaderInfo = exports.createTransformedDataAndFields = exports.formatDate = exports.updateBatch = exports.validateCSV = exports.handleMulterError = exports.uploadFile = void 0;
const faker_1 = require("@faker-js/faker");
// Models
const _models_1 = require("@models");
//config
const logger_1 = require("@config/logger");
//middlewares
const _middlewares_1 = require("@middlewares");
//utils
const _utils_1 = require("@utils");
//constants
const _constants_1 = require("@constants");
/**
 * Handles CSV file upload with Multer and converts the file size to human-readable format
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Express NextFunction
 * @returns Promise<void>
 * @throws ErrorHandler with a 400 status code if the file upload fails due to multer
 * @throws ErrorHandler with a 500 status code if an unexpected error occurs
 */
const uploadFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const convertedFileSize = yield _utils_1.commonHandler.convertFileSize(_constants_1.dataManagementVariables.FILE_SIZE, 'Byte', 'MB');
        yield (0, _middlewares_1.uploadCsvMiddleware)(req, res, (error) => {
            if (error) {
                logger_1.logger.error(`Multer Error: ${error}`);
                const customError = (0, exports.handleMulterError)(error, convertedFileSize);
                return next(customError);
            }
            next();
        });
    }
    catch (error) {
        logger_1.logger.error(`Unexpected error during CSV upload:, ${error}`);
        next(new _utils_1.ErrorHandler(_constants_1.commonMessages.INTERNAL_SERVER_ERROR, _constants_1.SERVER_ERROR, error instanceof Error));
    }
});
exports.uploadFile = uploadFile;
/**
 * Handles Multer errors during CSV file upload and returns an ErrorHandler object
 * @param error - Multer error object
 * @param convertedFileSize - The file size in human-readable format (MB)
 * @returns ErrorHandler object with a 400 status code and a custom error message
 */
const handleMulterError = (error, convertedFileSize) => {
    switch (error.code) {
        case _constants_1.dataManagementVariables.MULTER_ERROR_TYPES.LIMIT_FILE_SIZE:
            return new _utils_1.ErrorHandler(`${error.field} ${_constants_1.dataManagementMessages.FILE_SIZE_ERROR} ${convertedFileSize}MB`, _constants_1.BAD_REQUEST, error);
        case _constants_1.dataManagementVariables.MULTER_ERROR_TYPES.ENOENT:
            return new _utils_1.ErrorHandler(`${_constants_1.dataManagementMessages.DIRECTORY_FOUND_ERROR} ${_constants_1.dataManagementVariables.UPLOAD_DIR}`, _constants_1.BAD_REQUEST, error);
        case _constants_1.dataManagementVariables.MULTER_ERROR_TYPES.LIMIT_UNEXPECTED_FILE:
            return new _utils_1.ErrorHandler(`${_constants_1.dataManagementMessages.FILE_UPLOAD_LIMIT_ERROR} for ${error.field}`, _constants_1.BAD_REQUEST, error);
        default:
            return new _utils_1.ErrorHandler(error.name === 'Error' ? error.message : `${_constants_1.dataManagementMessages.SOMETHING_WRONG_WHEN_UPLOAD} ${error.field}`, _constants_1.BAD_REQUEST, error);
    }
};
exports.handleMulterError = handleMulterError;
/**
 * Checks if the given date string is valid and represents a date in the future.
 * @param dateString - The date string to validate
 * @returns true if the date string is valid and represents a date in the future, false otherwise
 */
const isValidDate = (dateString) => {
    const date = Date.parse(dateString);
    return !Number.isNaN(date) && date > 0;
};
/**
 * Validates the given MFG date and expiry date strings and returns an array of error messages.
 * @param mfgDate - The MFG date string to validate
 * @param expiryDate - The expiry date string to validate
 * @returns An array of strings containing the error messages
 */
const validateDates = (mfgDate, expiryDate) => {
    const errors = [];
    if (!isValidDate(mfgDate)) {
        errors.push(_constants_1.dataManagementMessages.VALID_MFG_DATE);
    }
    if (!isValidDate(expiryDate)) {
        errors.push(_constants_1.dataManagementMessages.VALID_EXPIRY_DATE);
    }
    if (isValidDate(mfgDate) && isValidDate(expiryDate) && Date.parse(mfgDate) >= Date.parse(expiryDate)) {
        errors.push(_constants_1.dataManagementMessages.MFG_DATE_AFTER_EXPIRY_DATE);
    }
    return errors;
};
/**
 * Validates a CSV file with the given data and returns a CsvValidationResult.
 * The CsvValidationResult contains two properties: valid and errors.
 * The valid property contains an array of validated items in the CSV file.
 * Each item is an object with the following properties: itemName, category, mfgDate, expiryDate, status, and companyName.
 * The errors property contains an array of objects with the following properties: row and messages.
 * The row property is the row number where the error occurred (1-indexed).
 * The messages property is an array of strings containing the error messages.
 * @param data The CSV data to validate.
 * @returns A CsvValidationResult with the validation results.
 */
const validateCSV = (data) => {
    const result = {
        valid: [],
        errors: [],
        headersError: false,
        missingHeaders: [],
    };
    if ((data === null || data === void 0 ? void 0 : data.length) > 0) {
        const row = data[0];
        const headerRow = Object.keys(row);
        const requiredColumns = [
            _constants_1.dataManagementVariables.STRUCTURED_FILE_FIELDS.itemName,
            _constants_1.dataManagementVariables.STRUCTURED_FILE_FIELDS.category,
            _constants_1.dataManagementVariables.STRUCTURED_FILE_FIELDS.companyName,
            _constants_1.dataManagementVariables.STRUCTURED_FILE_FIELDS.mfgDate,
            _constants_1.dataManagementVariables.STRUCTURED_FILE_FIELDS.expiryDate,
            _constants_1.dataManagementVariables.STRUCTURED_FILE_FIELDS.status,
        ];
        const missingHeaders = requiredColumns.filter((header) => !headerRow.includes(header));
        if (missingHeaders.length > 0) {
            result.headersError = true;
            result.missingHeaders = missingHeaders;
            return result;
        }
    }
    data.forEach((row, index) => {
        const error = { row: index + 2, messages: [] };
        const { [_constants_1.dataManagementVariables.STRUCTURED_FILE_FIELDS.itemName]: itemName, [_constants_1.dataManagementVariables.STRUCTURED_FILE_FIELDS.category]: category, [_constants_1.dataManagementVariables.STRUCTURED_FILE_FIELDS.companyName]: companyName, [_constants_1.dataManagementVariables.STRUCTURED_FILE_FIELDS.mfgDate]: mfgDate, [_constants_1.dataManagementVariables.STRUCTURED_FILE_FIELDS.expiryDate]: expiryDate, [_constants_1.dataManagementVariables.STRUCTURED_FILE_FIELDS.status]: status, } = row;
        // Required field validation
        if (!(itemName === null || itemName === void 0 ? void 0 : itemName.trim()))
            error.messages.push(_constants_1.dataManagementMessages.REQUIRED_ITEM_NAME);
        if (!(category === null || category === void 0 ? void 0 : category.trim()))
            error.messages.push(_constants_1.dataManagementMessages.REQUIRED_CATEGORY);
        if (!(companyName === null || companyName === void 0 ? void 0 : companyName.trim()))
            error.messages.push(_constants_1.dataManagementMessages.REQUIRED_COMPANY_NAME);
        // Date validation
        error.messages.push(...validateDates(mfgDate, expiryDate));
        if (error.messages.length > 0) {
            result.errors.push(error);
        }
        else {
            result.valid.push({
                itemName: itemName.trim(),
                category: category.trim(),
                mfgDate: new Date(mfgDate),
                expiryDate: new Date(expiryDate),
                status: (status === null || status === void 0 ? void 0 : status.toString().trim()) || _constants_1.dataManagementVariables.DEFAULT_STATUS,
                companyName: companyName.trim(),
            });
        }
    });
    return result;
};
exports.validateCSV = validateCSV;
/**
 * Updates the batch record in the database with the results of the CSV validation and processing time
 * @param {mongoose.ClientSession} session - Mongoose session
 * @param {IDataBatch[]} batch - Batch record
 * @param {CSVRow[]} jsonData - CSV data
 * @param {CsvRowValidatedItem[]} valid - Valid CSV rows
 * @param {CsvRowValidationError[]} errors - Error CSV rows
 * @param {number} startTime - Start time of the CSV processing
 */
const updateBatch = (session, batch, jsonData, valid, errors, startTime) => __awaiter(void 0, void 0, void 0, function* () {
    const batchUpdateData = {
        totalRecords: jsonData.length,
        successfulRecords: valid.length,
        failedRecords: errors.length,
        status: errors.length === 0 ? 'completed' : 'completed with errors',
        errors: errors.length > 0 ? errors : undefined,
        processingTime: Date.now() - startTime,
    };
    yield _models_1.BatchModel.findByIdAndUpdate(batch[0].id, batchUpdateData, {
        session,
    });
});
exports.updateBatch = updateBatch;
const formatDate = (date) => date.toISOString().split('T')[0];
exports.formatDate = formatDate;
/**
 * This function takes in an array of data items and transforms it into a format
 * suitable for exporting to CSV. The function returns an object containing
 * the transformed data and the corresponding fields.
 *
 * The transformed data is an array of objects with the following keys:
 * - "Item Name"
 * - "Category"
 * - "Company Name"
 * - "Manufacturing Date"
 * - "Expiry Date"
 * - "Status"
 * - "Upload Batch"
 * - "Created By"
 * - "Created At"
 *
 * The fields is an array of strings containing the above keys.
 *
 * @param {any[]} data - The array of data items to be transformed.
 * @returns {Object} - An object containing the transformed data and fields.
 */
const createTransformedDataAndFields = (data) => {
    const transformedData = data.map((item) => ({
        [_constants_1.dataManagementVariables.STRUCTURED_FILE_FIELDS.itemName]: item.itemName,
        [_constants_1.dataManagementVariables.STRUCTURED_FILE_FIELDS.category]: item.category,
        [_constants_1.dataManagementVariables.STRUCTURED_FILE_FIELDS.companyName]: item.companyName,
        [_constants_1.dataManagementVariables.STRUCTURED_FILE_FIELDS.mfgDate]: (0, exports.formatDate)(item.mfgDate),
        [_constants_1.dataManagementVariables.STRUCTURED_FILE_FIELDS.expiryDate]: (0, exports.formatDate)(item.expiryDate),
        [_constants_1.dataManagementVariables.STRUCTURED_FILE_FIELDS.status]: item.status,
        [_constants_1.dataManagementVariables.STRUCTURED_FILE_FIELDS.batchId]: item.batchId,
        [_constants_1.dataManagementVariables.STRUCTURED_FILE_FIELDS.createdBy]: item.createdBy.name,
        [_constants_1.dataManagementVariables.STRUCTURED_FILE_FIELDS.createdAt]: (0, exports.formatDate)(item.createdAt),
    }));
    const fields = Object.keys(transformedData[0]);
    return { transformedData, fields };
};
exports.createTransformedDataAndFields = createTransformedDataAndFields;
/**
 * Adds header information to a PDF document.
 *
 * @param {PDFKit.PDFDocument} doc The PDF document to add the header to.
 * @param {PDFGenerationOptions} options The PDF generation options.
 * @returns {void}
 */
const addPDFHeaderInfo = (doc, options) => {
    doc.fontSize(20).text(options.title, { align: 'center' });
    if (options.subtitle) {
        doc.fontSize(12).text(options.subtitle, { align: 'center' });
    }
    doc.moveDown(4);
};
exports.addPDFHeaderInfo = addPDFHeaderInfo;
const drawTableRow = (doc, rowData, colWidths, isHeader) => {
    const startX = 50;
    let x = startX;
    const fontSize = isHeader ? 10 : 9;
    doc.fontSize(fontSize);
    if (isHeader) {
        doc.font('Helvetica-Bold');
    }
    else {
        doc.font('Helvetica');
    }
    rowData.forEach((cell, i) => {
        doc.text(cell, x, doc.y - 12, {
            width: colWidths[i],
            align: 'left',
        });
        x += colWidths[i] + 10;
    });
    doc.moveDown(2);
};
exports.drawTableRow = drawTableRow;
const addDataToPDF = (doc, data, _options) => {
    const tableHeaders = [
        _constants_1.dataManagementVariables.STRUCTURED_FILE_FIELDS.itemName,
        _constants_1.dataManagementVariables.STRUCTURED_FILE_FIELDS.category,
        _constants_1.dataManagementVariables.STRUCTURED_FILE_FIELDS.mfgDate,
        _constants_1.dataManagementVariables.STRUCTURED_FILE_FIELDS.expiryDate,
        _constants_1.dataManagementVariables.STRUCTURED_FILE_FIELDS.status,
    ];
    // Calculate column widths
    const pageWidth = doc.page.width - 100;
    const colWidths = [pageWidth * 0.25, pageWidth * 0.2, pageWidth * 0.15, pageWidth * 0.15, pageWidth * 0.15];
    (0, exports.drawTableRow)(doc, tableHeaders, colWidths, true);
    data.forEach((item) => {
        const row = [
            item.itemName,
            item.category,
            (0, exports.formatDate)(item.mfgDate),
            (0, exports.formatDate)(item.expiryDate),
            item.status,
        ];
        (0, exports.drawTableRow)(doc, row, colWidths, false);
    });
};
exports.addDataToPDF = addDataToPDF;
/**
 * Retrieves data items created by a specific user. The function takes in an
 * optional `filters` object that can be used to filter the data items based
 * on the following keys:
 * - "itemName"
 * - "category"
 * - "mfgDate"
 * - "expiryDate"
 * - "status"
 *
 * The function returns an array of objects containing the following keys:
 * - "id"
 * - "itemName"
 * - "category"
 * - "mfgDate"
 * - "expiryDate"
 * - "status"
 * - "companyName"
 * - "batchId"
 * - "createdBy" (an object containing the user's "name" and "email")
 * - "createdAt"
 *
 * @param {Types.ObjectId} userId - The ID of the user who created the data items.
 * @param {ExportFilters} [filters] - An optional object containing filters to apply to the data items.
 * @returns {Promise<any>} - A promise that resolves to an array of data items.
 */
const getDataItemsCreatedByUser = (userId, filters) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield _models_1.DataModel.find(Object.assign(Object.assign({}, filters), { isActive: true, createdBy: userId }))
            .select('-__v -isActive -lastUpdatedBy')
            .populate('createdBy', 'name email')
            .lean();
    }
    catch (error) {
        logger_1.logger.error(`Could not fetch data items: ${error}`);
        return [];
    }
});
exports.getDataItemsCreatedByUser = getDataItemsCreatedByUser;
/**
 * Deletes all data items and the corresponding batch associated with the given batch ID.
 *
 * @param {string} batchId - The ID of the batch whose data items and batch record are to be deleted.
 * @returns {Promise<void>} - A promise that resolves when the deletion is complete.
 * @throws Will log an error if the deletion fails.
 */
const deleteDataItemsAndBatch = (batchId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield _models_1.DataModel.deleteMany({ batchId: batchId });
        yield _models_1.BatchModel.findByIdAndDelete(batchId);
    }
    catch (error) {
        logger_1.logger.error(`Could not delete data items: ${error}`);
    }
});
exports.deleteDataItemsAndBatch = deleteDataItemsAndBatch;
/**
 * Deletes all data items and batches associated with a specific user.
 *
 * @param {Types.ObjectId} userId - The ID of the user whose data items and batches are to be deleted.
 * @returns {Promise<void>} - A promise that resolves when the deletion is complete.
 * @throws Will log an error if the deletion fails.
 */
const deleteDataItemsAndBatchesCreatedByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield _models_1.DataModel.deleteMany({ createdBy: userId });
        yield _models_1.BatchModel.deleteMany({ createdBy: userId });
    }
    catch (error) {
        logger_1.logger.error(`Could not delete data items: ${error}`);
    }
});
exports.deleteDataItemsAndBatchesCreatedByUser = deleteDataItemsAndBatchesCreatedByUser;
/**
 * Takes a query object containing filters and returns an object with the same properties but
 * with the values converted to their corresponding types (e.g. strings to dates).
 *
 * @param {ExportFilters} query - A query object containing filters to apply to the data items.
 * @returns {Promise<ExportFilters>} - A promise that resolves to an object containing the filters with their values converted.
 */
const buildFilters = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = {};
    if (query.startDate) {
        filters.startDate = new Date(query.startDate);
    }
    if (query.endDate) {
        filters.endDate = new Date(query.endDate);
    }
    if (query.category) {
        filters.category = query.category;
    }
    if (query.status) {
        filters.status = query.status;
    }
    if (query.companyName) {
        filters.companyName = query.companyName;
    }
    if (query.batchId) {
        filters.batchId = query.batchId;
    }
    return filters;
});
exports.buildFilters = buildFilters;
/**
 * Generates random data for a data management object based on the provided type.
 * @param {string} type - The type of data management object to generate data for.
 * @returns {Record<string, unknown>} - The random data for the data management object.
 * @throws {Error} If the type is not supported.
 */
const dataManagementRandomData = (type) => {
    switch (type) {
        case 'UploadFileResponse':
            return {
                batchId: { type: 'string', example: faker_1.faker.string.uuid() },
                totalProcessed: { type: 'integer', example: 0 },
                successful: { type: 'integer', example: 0 },
                failed: { type: 'integer', example: 0 },
                errors: { type: 'array', example: [] },
            };
        case 'GetBatchesResponse':
            return {
                id: { type: 'string', example: faker_1.faker.string.uuid() },
                uploadedBy: { type: 'string', example: faker_1.faker.string.uuid() },
                fileName: { type: 'string', example: faker_1.faker.string.uuid() },
                totalRecords: { type: 'integer', example: 0 },
                successfulRecords: { type: 'integer', example: 0 },
                failedRecords: { type: 'integer', example: 0 },
                status: { type: 'string', example: 'status' },
                uploadErrors: { type: 'array', example: [] },
                createdAt: { type: 'string', example: faker_1.faker.date.past() },
                updatedAt: { type: 'string', example: faker_1.faker.date.recent() },
                processingTime: { type: 'integer', example: 0 },
            };
        default:
            throw new Error(`Unsupported type: ${type}`);
    }
};
exports.dataManagementRandomData = dataManagementRandomData;
//# sourceMappingURL=dataManagement.handler.js.map