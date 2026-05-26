import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import cartRouter from "./routes/cartRoute.js";

const app = express();
const port = process.env.PORT || 4005;

app.use(express.json());
app.use(cors());

connectDB();

// Gateway strips "/api/cart", so we catch the raw routes at the root
app.use("/", cartRouter);

app.get("/", (req, res) => {
  res.send("Cart Service API Working");
});

app.listen(port, () => {
  console.log(`Cart Service started on port: ${port}`);
});