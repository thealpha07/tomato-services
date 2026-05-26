import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  cartData: { type: Object, default: {} }
}, { minimize: false });

const cartModel = mongoose.models.cart || mongoose.model("cart", cartSchema);

export default cartModel;