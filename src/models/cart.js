import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;
const cartSchema = mongoose.Schema(
  {
    userId: { type: ObjectId, ref: "User" },
    items: [{ productId: { type: ObjectId, ref: "Product" }, quantity: Number, },],
  },
  { timestamps: true }
);
export default mongoose.model("Cart", cartSchema);
