# Use an official Node.js image
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install all dependencies (both prod and dev)
RUN npm install

# Copy the rest of the application files
COPY . .

# Run Prisma migrations and generate client after install
RUN npm run deploy && npm run generate

# Build TypeScript project (creates `dist/` folder)
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
