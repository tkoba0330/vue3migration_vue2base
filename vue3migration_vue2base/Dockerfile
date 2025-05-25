FROM node:18-alpine

WORKDIR /app

# Copy package.json and potentially package-lock.json
# Using *.json to be flexible, though only package.json exists now.
COPY package*.json ./

# Install dependencies
# Using npm install as devDependencies are needed for `npm run dev`
# and package-lock.json might not exist yet.
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to run the Nuxt development server
CMD ["npm", "run", "dev"]
