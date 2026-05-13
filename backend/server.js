import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import userModel from "./models/userModel.js";

// app config
const app = express();
const port =process.env.PORT || 4000;

//middlewares
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`Monolith received request: ${req.method} ${req.url}`);
  next();
});

// DB connection
connectDB().then(async () => {
    // --- DIAGNOSTIC SCRIPT ---
    console.log("--- FETCHING ALL USERS FROM DATABASE ---");
    const allUsers = await userModel.find({});
    console.log(allUsers);
    console.log("----------------------------------------");
});

// DB connection
//connectDB();

// api endpoints
//app.use("/api/food", foodRouter); -- moved it to food-service
//app.use("/images", express.static("uploads"));
app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server Started on port: ${port}`);
});
