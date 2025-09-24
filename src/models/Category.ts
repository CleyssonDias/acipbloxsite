import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  img: string;
  des: string;
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  des: { type: String, required: true },
});

export default mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);
