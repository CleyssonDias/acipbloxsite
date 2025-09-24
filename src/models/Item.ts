import mongoose, { Schema, Document } from "mongoose";

export interface IItem extends Document {
  name: string;
  value: number;
  stock: number;
  img: string;
  des: string;
  categoryId: mongoose.Types.ObjectId;
}

const ItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  stock: { type: Number, required: true },
  img: { type: String, required: true },
  des: { type: String, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
});

export default mongoose.models.Item || mongoose.model<IItem>("Item", ItemSchema);
