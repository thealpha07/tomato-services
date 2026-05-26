# Security & Quality Changelog

This document logs all the security vulnerabilities and code quality issues fixed across the `tomato-services` project.

## Summary

| Service | Critical Fixes | High Fixes | Medium Fixes |
|---------|----------------|------------|--------------|
| API Gateway | 1 | 1 | 2 |
| Food Service | 1 | 0 | 4 |
| User Service | 2 | 0 | 2 |
| Cart Service | 0 | 0 | 3 |
| Order Service | 3 | 0 | 2 |

---

## Detailed Fixes

### 1. API Gateway (`node-services/api-gateway`)
| What | Why | How | Severity |
|------|-----|-----|----------|
| Hardcoded URLs | Hardcoding internal `localhost` IPs breaks in Docker/K8s environments | Replaced with environment variables (`process.env.FOOD_SERVICE_URL`, etc.) | MEDIUM |
| Wide-open CORS | Any malicious site could make requests to the backend APIs | Configured CORS whitelist via `ALLOWED_ORIGINS` env var | HIGH |
| Missing Healthcheck | Orchestrators (Docker/K8s) need to know if the gateway is up | Added `GET /health` endpoint | MEDIUM |
| No Global Error Handler | Uncaught errors from proxies would crash the app | Added an Express global error handler | MEDIUM |

### 2. Food Service (`node-services/food-service`)
| What | Why | How | Severity |
|------|-----|-----|----------|
| Exposed Credentials Logging | `process.env.MONGO_URL` was being printed to the console on startup, leaking the password | Removed the console log in `config/db.js` | CRITICAL |
| Unrestricted File Uploads | Users could upload malicious scripts (e.g. `.exe`, `.sh`) of any size, leading to RCE or DoS | Added `fileFilter` (image types only) and `limits` (5MB) to multer config | CRITICAL |
| Silent `fs.unlink` errors | If deleting an image failed, it was silently ignored | Added an error callback to `fs.unlink` to log the failure | MEDIUM |
| Unauthenticated Deletion | Any authenticated user could delete any food item | Added admin check: `if (req.body.userRole !== 'admin')` | CRITICAL |
| Improper Status Codes | Authentication and server errors returned HTTP 200 with `{success: false}` | Updated to HTTP 401, 403, and 500 appropriately | MEDIUM |

### 3. User Service (`node-services/user-service`)
| What | Why | How | Severity |
|------|-----|-----|----------|
| Non-expiring JWTs | Tokens had no expiration. If stolen, they could be used forever | Added `{ expiresIn: "7d" }` to `jwt.sign()` | CRITICAL |
| Password Hash Leak | The `/register` response returned the full user document, including the hashed password | Changed response to only return the role instead of the full user object | CRITICAL |
| Exposed Credentials Logging | `process.env.MONGO_URL` was printed to the console | Removed the console log in `config/db.js` | CRITICAL |
| Improper Status Codes | Errors returned HTTP 200 | Updated to HTTP 400 (Bad Request), 401 (Unauthorized), 409 (Conflict), and 500 | MEDIUM |

### 4. Cart Service (`node-services/cart-service`)
| What | Why | How | Severity |
|------|-----|-----|----------|
| Unbounded Cart Growth | Removing items decremented quantity to 0 but left the key in the database | Added logic to `delete cartData[itemId]` if quantity hits 0 | MEDIUM |
| Exposed Credentials Logging | `process.env.MONGO_URL` was printed to the console | Removed the console log in `config/db.js` | CRITICAL |
| Improper Status Codes | Errors returned HTTP 200 | Updated to HTTP 401 (Unauthorized) and 500 | MEDIUM |

### 5. Order Service (`node-services/order-service`)
| What | Why | How | Severity |
|------|-----|-----|----------|
| Unauthenticated Endpoints | `/verify`, `/list`, and `/status` endpoints lacked any authentication | Added `authMiddleware` to these routes in `orderRoute.js` | CRITICAL |
| Unauthenticated Status Change | Any user could update the delivery status of any order | Added admin role check to `updateStatus` and `listOrders` | CRITICAL |
| Exposed Credentials Logging | `process.env.MONGO_URL` was printed to the console | Removed the console log in `config/db.js` | CRITICAL |
| Improper Status Codes | Errors returned HTTP 200 | Updated to HTTP 401, 403, and 500 appropriately | MEDIUM |

### 6. Cross-Service
| What | Why | How | Severity |
|------|-----|-----|----------|
| Missing Environment Templates | Hard to know what environment variables to provide | Created `.env.example` in all services | MEDIUM |

> Note: All `.env` files that were previously committed to git should be removed from the repository history, and the actual secrets (MongoDB passwords, Stripe keys, JWT secret) MUST be rotated in production.
