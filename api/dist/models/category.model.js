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
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const counter_model_1 = require("./counter.model");
const categorySchema = new mongoose_1.Schema({
    categoryId: { type: Number, unique: true },
    categoryName: { type: String, required: true },
    categoryType: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    status: { type: Number, required: true },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
});
categorySchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isNew) {
            const counter = yield counter_model_1.Counter.findByIdAndUpdate({ _id: 'categoryId' }, { $inc: { seq: 1 } }, { new: true, upsert: true });
            this.categoryId = counter.seq;
        }
        next();
    });
});
exports.Category = (0, mongoose_1.model)('Category', categorySchema);
//# sourceMappingURL=category.model.js.map