"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchModel = exports.DataModel = void 0;
// Third-party modules
const mongoose_1 = __importStar(require("mongoose"));
//enums
const _enums_1 = require("@enums");
const DataItemSchema = new mongoose_1.Schema({
    itemName: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    mfgDate: {
        type: Date,
        required: true,
        index: true,
    },
    expiryDate: {
        type: Date,
        required: true,
        index: true,
    },
    status: {
        type: String,
        required: true,
        default: _enums_1.DataItemStatus.Available,
        enum: _enums_1.DataItemStatus,
        index: true,
    },
    companyName: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
        index: true,
    },
    lastUpdatedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
        index: true,
    },
    version: {
        type: Number,
        default: 1,
    },
    batchId: {
        type: String,
        required: true,
        index: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
DataItemSchema.set('toJSON', {
    transform: (_doc, ret) => {
        ret.id = ret._id;
        ret._id = undefined;
        return ret;
    },
});
// Indexes
DataItemSchema.index({
    itemName: 1,
    category: 1,
    companyName: 1,
    batchId: 1,
    createdBy: 1,
});
const DataBatchSchema = new mongoose_1.Schema({
    uploadedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    totalRecords: {
        type: Number,
        required: true,
    },
    successfulRecords: {
        type: Number,
        default: 0,
    },
    failedRecords: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: [
            _enums_1.DataBatchStatus.Processing,
            _enums_1.DataBatchStatus.Completed,
            _enums_1.DataBatchStatus.CompletedWithError,
            _enums_1.DataBatchStatus.Failed,
        ],
        default: _enums_1.DataBatchStatus.Processing,
        index: true,
    },
    uploadErrors: [
        {
            row: Number,
            messages: [String],
        },
    ],
    processingTime: Number,
}, {
    timestamps: true,
    versionKey: false,
});
DataBatchSchema.set('toJSON', {
    transform: (_doc, ret) => {
        ret.id = ret._id;
        ret._id = undefined;
        return ret;
    },
});
const DataModel = mongoose_1.default.model('dataItems', DataItemSchema);
exports.DataModel = DataModel;
const BatchModel = mongoose_1.default.model('dataBatches', DataBatchSchema);
exports.BatchModel = BatchModel;
//# sourceMappingURL=dataManagement.model.js.map