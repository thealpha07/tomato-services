import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Cart DB Connected"))
    .catch((err) => console.error("DB Connection Error:", err.message));
};