import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import orderRouter from "./routes/orderRoute.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 4006;

app.use(express.json());
app.use(cors());

connectDB();

// Gateway strips "/api/order", so we catch it at the root
app.use("/", orderRouter);

app.get("/", (req, res) => {
  res.send("Order Service API Working");
});

app.listen(port, () => {
  console.log(`Order Service started on port: ${port}`);
});