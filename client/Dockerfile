# Stage 1
FROM node:17.9.0 as build-stage
WORKDIR /client
COPY package.json .
RUN npm install
COPY . .
ARG REACT_APP_BASE_API_URL
ENV REACT_APP_BASE_API_URL=$REACT_APP_BASE_API_URL
RUN npm run build
# Stage 2
FROM nginx:1.17.0-alpine
COPY --from=build-stage /client/build /usr/share/nginx/html
EXPOSE $REACT_DOCKER_PORT
CMD nginx -g 'daemon off;'