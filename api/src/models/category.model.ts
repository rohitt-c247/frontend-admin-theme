import { Schema, model } from 'mongoose';
import { Counter } from './counter.model';

const categorySchema = new Schema({
  categoryId: { type: String, unique: true },
  categoryName: { type: String, required: true },
  categoryType: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  status: { type: Number, required: true },
});

categorySchema.pre('save', async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'categoryId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.categoryId = counter.seq.toString();
  }
  next();
});

export const Category = model('Category', categorySchema);