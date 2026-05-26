FROM node:20-alpine

WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy application source
COPY . .

# Create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# For food-service only: ensure uploads directory exists and is writable
RUN mkdir -p uploads && chown -R appuser:appgroup uploads

USER appuser

EXPOSE 4001

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4001/ || exit 1

CMD ["node", "server.js"]