# Use an official Node.js runtime as the base image
FROM node:16

# Create and set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Create the directory to be used by the app
RUN mkdir -p /app/user

# Expose port 9000 (same as used by your app)
EXPOSE 9000

# Start the application
CMD ["npm", "start"]
