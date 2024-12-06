# Base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm i

# # Pass the environment and copy the correct .env file
# ARG NODE_ENV=production
# COPY .env.${NODE_ENV} ./

# Copy the source code into the container
COPY . .

# Expose the port your app runs on
EXPOSE 3456

ENV NODE_ENV=production

# Command to start the app
CMD ["node", "index.js"]
