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
exports.s3Storage = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const envVar_1 = __importDefault(require("@config/envVar"));
const _constants_1 = require("@constants");
const multer_1 = __importDefault(require("multer"));
// Initialize AWS S3CLIENT
const s3Config = new client_s3_1.S3Client({
    region: envVar_1.default.AWS_REGION,
    credentials: {
        accessKeyId: envVar_1.default.AWS_ACCESS_KEY_ID,
        secretAccessKey: envVar_1.default.AWS_SECRET_ACCESS_KEY,
    },
});
/**
 * S3 storage configuration.
 */
exports.s3Storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        // File upload path
        cb(null, 's3'); // Dummy destination, as we'll handle S3 directly in filename
    },
    filename: (_req, file, cb) => __awaiter(void 0, void 0, void 0, function* () {
        //Upload file name
        const fileName = `${Date.now().toString()}-${file.originalname}`;
        // Upload to S3
        const params = {
            Bucket: envVar_1.default.BUCKET_NAME,
            Key: fileName,
            Body: file.buffer,
        };
        try {
            yield s3Config.send(new client_s3_1.PutObjectCommand(params));
            cb(null, fileName);
        }
        catch (_err) {
            cb(new Error(_constants_1.fileHandlerMessages.S3_UPLOAD_ERROR), '');
        }
    }),
});
//# sourceMappingURL=s3File.handler.js.map