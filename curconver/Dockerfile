# Select node version
FROM node:16-alpine3.11 as build
# Set working directory
WORKDIR /app
# Change environment and copy the package.json file + it's lock file
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/
COPY ./package-lock.json /app/
# Install the dependencies
RUN npm install
# Install the necessary scripts
RUN npm install react-scripts@4.0.3 -g
# Copy the app folder
COPY . /app
# Create the production build
RUN npm run build

# Create a NGINX instance and perform the neccessary configurations
FROM nginx:1.17.8-alpine 
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
# Expose the port
EXPOSE 3000
# Serve the production build 
CMD ["nginx", "-g", "daemon off;"]