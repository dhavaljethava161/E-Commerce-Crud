import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;
const wishlistSchema = mongoose.Schema({
  userId: String,
  product: [{
    productId: { type: ObjectId, ref: "Product" },
    userId: { type: ObjectId, ref: "User" }
  }],
  active: Boolean,
});

export default mongoose.model("Wishlist", wishlistSchema);
