# Use an Alpine-based image for a smaller footprint
FROM node:18.15.0-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for better cache on rebuilds
COPY package*.json ./

# Install production dependencies and clean cache to keep the image clean and small
RUN npm install --production && npm cache clean --force

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Specify the command to run your app using node directly
CMD ["node", "server.js"]
