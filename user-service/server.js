import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 4003;

app.use(express.json());
app.use(cors());

connectDB();

// Gateway strips "/api/user", so we catch the raw routes here
app.use("/", userRouter);

app.get("/", (req, res) => {
  res.send("User Service API Working");
});

app.listen(port, () => {
  console.log(`User Service started on port: ${port}`);
});