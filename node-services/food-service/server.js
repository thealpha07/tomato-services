import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";

const app = express();
const port = process.env.PORT || 4001;

// Middlewares
app.use(express.json());
app.use(cors());

// DB connection
connectDB();

// API Endpoints
// Gateway strips "/api/food", so we catch "/add", "/list", "/remove" right at the root!
app.use("/", foodRouter); 

// Gateway strips "/images", so we catch the raw filename (e.g., "/12345food.jpg") at the root!
app.use("/", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Food Service API Working");
});

app.listen(port, () => {
  console.log(`Food Service started on port: ${port}`);
});