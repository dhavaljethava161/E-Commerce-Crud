import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: String,
    brand: String,
    description: String,
    price: Number,
    gender: { type: String, enum: ["male", "female", "kids"], },
    images: [String],
    thumbnail: String,
    discount: Number,
    size: { type: [String], default: [40, 42, 44, 46] },
    color: { type: [String], default: ["black", "white", "red"] },
    category: [String],
    isAvailable: { type: Boolean, default: true, },
    availableStock: Number,
    rating: { type: Number, default: 0 },
    totalSoldUnit: { type: Number, default: 0 },
  },
  { timestamps: true }
);
export default mongoose.model("Product", productSchema);
