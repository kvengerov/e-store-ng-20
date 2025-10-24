# Multi-stage build for Angular application
# Stage 1: Build stage
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY ../package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY .. .

# Build application for production
RUN npm run build

# Stage 2: Production stage
FROM nginx:alpine AS production

# Copy built application from build stage
COPY --from=build /app/dist/e-store-ng-20 /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
