FROM node:17.9.0
WORKDIR /server
COPY package.json .
RUN npm install
COPY . .
CMD npm start