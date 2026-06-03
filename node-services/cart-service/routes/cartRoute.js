import express from "express";
import { addToCart, removeFromCart, getCart, clearCart } from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.post("/get", authMiddleware, getCart);
cartRouter.post("/clear", authMiddleware, clearCart);

// Internal route for server-to-server cart clearing (used by order-service)
cartRouter.post("/internal/clear", (req, res, next) => {
  const serviceSecret = req.headers["x-service-secret"];
  if (serviceSecret !== process.env.JWT_SECRET) {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }
  next();
}, clearCart);

export default cartRouter;