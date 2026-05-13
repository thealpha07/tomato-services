import mongoose from "mongoose";

export const connectDB = async () => {
  console.log("Attempting to connect to:", process.env.MONGO_URL); 
    
  await mongoose
    .connect(
      process.env.MONGO_URL
    )
    .then(() =>console.log("DB Connected"));
};
