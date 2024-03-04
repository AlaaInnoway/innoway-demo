# Use the official Nginx image as the base image
FROM nginx:latest

# Copy the built React app from your local machine to the Nginx image
COPY build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
