import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
import "dotenv/config";

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(",") 
  : ["http://localhost:5173", "http://localhost:5174"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

app.use((req, res, next) => {
  console.log(`Gateway received request: ${req.method} ${req.url}`);
  next();
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// ROUTE 1: The newly split Food Service
app.use(
  "/api/food",
  createProxyMiddleware({
    target: process.env.FOOD_SERVICE_URL || "http://localhost:4001",
    changeOrigin: true,
    pathRewrite: { "^/api/food": "" },
  })
);

// ROUTE 2: Image Routing
app.use(
  "/images",
  createProxyMiddleware({
    target: process.env.FOOD_SERVICE_URL || "http://localhost:4001",
    changeOrigin: true,
    pathRewrite: { "^/images": "" },
  })
);

// ROUTE 3: Unified User Service (Auth & Profiles)
app.use(
  "/api/user",
  createProxyMiddleware({
    target: process.env.USER_SERVICE_URL || "http://localhost:4003", 
    changeOrigin: true,
    pathRewrite: { "^/api/user": "" },
  })
);

// ROUTE 4: Cart Service
app.use(
  "/api/cart",
  createProxyMiddleware({
    target: process.env.CART_SERVICE_URL || "http://localhost:4005", 
    changeOrigin: true,
    pathRewrite: { "^/api/cart": "" },
  })
);

// ROUTE 5: Order Service
app.use(
  "/api/order",
  createProxyMiddleware({
    target: process.env.ORDER_SERVICE_URL || "http://localhost:4006", 
    changeOrigin: true,
    pathRewrite: { "^/api/order": "" },
  })
);

// ROUTE 6: Everything else goes to the dying Monolith
app.use(
  "/api",
  createProxyMiddleware({
    target: process.env.LEGACY_MONOLITH_URL || "http://localhost:4002",
    changeOrigin: true,
  })
);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Gateway Error:", err.message);
  res.json({ success: false, message: "API Gateway Error" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API Gateway running on Port ${PORT}`));