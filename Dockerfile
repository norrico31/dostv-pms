# Build Stage
FROM node:lts-alpine AS build-stage
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm install

# Copy source files and build the project
COPY . .
RUN npm run build

# Production Stage
FROM nginx:stable-alpine AS production-stage

# Copy built files from the build stage to nginx html directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Remove default nginx configuration and replace it with custom config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d


# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]