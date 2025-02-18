# Use an official Node.js image
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Copy Prisma schema before installing dependencies
COPY prisma ./prisma

# Install dependencies
RUN npm install --omit=dev --ignore-scripts

# Copy the rest of the application files
COPY . .

# Build TypeScript project (creates `dist/` folder)
RUN npm run build

# Generate Prisma client
RUN npx prisma generate

# Expose the port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
