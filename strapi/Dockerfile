# Use Node 18 LTS
FROM node:18

# Set working directory
WORKDIR /srv/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Build Strapi (for production)
RUN npm run build

# Expose Strapi port
EXPOSE 1337

# Start Strapi
CMD ["npm", "run", "develop"]
