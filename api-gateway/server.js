import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
app.use(cors());

app.use((req, res, next) => {
  console.log(`Gateway received request: ${req.method} ${req.url}`);
  next();
});

// ROUTE 1: The newly split Food Service
app.use(
  "/api/food",
  createProxyMiddleware({
    target: "http://localhost:4001", // Points to the new microservice
    changeOrigin: true,
  })
);

// ROUTE 2: Image Routing
app.use(
  "/images",
  createProxyMiddleware({
    target: "http://localhost:4001", // Images live in the Food Service now!
    changeOrigin: true,
  })
);

// ROUTE 3: Everything else goes to the dying Monolith
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:4002", // Points to the old backend
    changeOrigin: true,
  })
);

app.listen(4000, () => console.log("API Gateway running on Port 4000"));