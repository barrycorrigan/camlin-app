# Stage 1: Build the app
FROM node:20 as build-stage

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Clean cache and install dependencies
RUN npm cache clean --force
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the app for production
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine as production-stage

# Copy the build output from the previous stage to the Nginx web root
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]