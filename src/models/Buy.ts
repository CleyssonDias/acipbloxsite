import mongoose, { Schema, Document } from "mongoose";

export interface IBuy extends Document {
  userid: mongoose.Types.ObjectId;
  itemid: mongoose.Types.ObjectId;
  paymentId?: string;
  status?: string;
  mercadoPago?: any;
}

const BuySchema: Schema = new Schema({
  userid: { type: Schema.Types.ObjectId, ref: "User", required: true },
  itemid: { type: Schema.Types.ObjectId, ref: "Item", required: true },
  paymentId: { type: String },
  status: { type: String },
  mercadoPago: { type: Schema.Types.Mixed },
}, { timestamps: true });

export default mongoose.models.Buy || mongoose.model<IBuy>("Buy", BuySchema);
