"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPLOAD_FOLDER = exports.UPLOAD_DIR = exports.STRUCTURED_FILE_FIELDS = exports.PDF_GENERATION_OPTIONS = exports.PDF_ATTATCHMENT_NAME = exports.MULTER_ERROR_TYPES = exports.FILE_SIZE = exports.FILE_UPLOAD_LIMIT = exports.FILE_UPLOAD_FIELD = exports.FILE_FORMATS = exports.DEFAULT_STATUS = exports.DATAMANAGEMENT_MODULE_SWAGGER_OPERATIONS_PATH = exports.ATTATCHMENT_NAME = void 0;
exports.ATTATCHMENT_NAME = `Data_Export_${new Date().toISOString().split('T')[0]}.csv`;
exports.DATAMANAGEMENT_MODULE_SWAGGER_OPERATIONS_PATH = 'src/docs/dataManagement/operations.ts';
exports.DEFAULT_STATUS = 'available';
exports.FILE_FORMATS = ['csv']; //supported file formats
exports.FILE_UPLOAD_FIELD = 'csv_file'; //field name
exports.FILE_UPLOAD_LIMIT = 1; //maximum number of files
exports.FILE_SIZE = 50 * 1024 * 1024; //50 MB
//multer error types
exports.MULTER_ERROR_TYPES = {
    LIMIT_FILE_SIZE: 'LIMIT_FILE_SIZE',
    ENOENT: 'ENOENT',
    LIMIT_UNEXPECTED_FILE: 'LIMIT_UNEXPECTED_FILE',
};
exports.PDF_ATTATCHMENT_NAME = `Data_report_${new Date().toISOString().split('T')[0]}.pdf`;
//PDF report generation options
exports.PDF_GENERATION_OPTIONS = {
    title: 'Data Management Report',
    subtitle: `Generated on ${new Date().toLocaleDateString()}`,
    includeTotals: true,
};
//structured file fields
exports.STRUCTURED_FILE_FIELDS = {
    itemName: 'Item Name',
    category: 'Category',
    mfgDate: 'MFG Date',
    expiryDate: 'Expiry Date',
    status: 'Status',
    companyName: 'Company Name',
    batchId: 'Upload Batch',
    createdAt: 'Created At',
    createdBy: 'Created By',
};
exports.UPLOAD_DIR = 'uploads'; //upload directory
exports.UPLOAD_FOLDER = 'csvFiles'; //upload folder
//# sourceMappingURL=dataManagement.variables.js.map