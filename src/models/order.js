import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;
const orderSchema = mongoose.Schema(
  {
    userId: ObjectId,
    items: [
      { productId: { type: ObjectId, ref: "Product" }, quantity: Number },
    ],
    shippingOrder: String,
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
