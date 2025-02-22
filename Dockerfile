# Use an official Node.js image
FROM node:22

# Install Redis and Supervisor
RUN apt-get update && apt-get install -y redis-server supervisor

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install all dependencies (both prod and dev)
RUN npm install

# Copy the rest of the application files
COPY . .

# Build TypeScript project (creates `dist/` folder)
RUN npm run build

# Copy Supervisor configuration
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose the ports
EXPOSE 8000 6379

# Start all services using Supervisor
CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
