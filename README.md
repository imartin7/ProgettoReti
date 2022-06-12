# Todays RRR

## Introduction
Todays RRR is a new social network that combines the possibility of uploading images in a feed with sharing conversations with people in real time.

## Architecture
The application combines a client developed in nextjs with a nodejs server.

## Technologies

### Nextjs / React
The frontend is developed with React through the Nextjs framework, to get a faster client side. With this framework we have taken advantage of some libraries such as Redux for data management in store format, Lodash to speed up development, nookies for saving cookies, and finally, next-auth, library which allows us to implement an Oauth system.

### Oauth
In the application it will be possible to access with a valid google account using Oauth, for this purpose the relevant google keys have been saved in a .env which is accessed through the dotenv library. 

### Expressjs
The server is mounted with Expressjs because it allows to link very easily the database and the endpoints of the api to which the calls are made to perform the corresponding actions.

### Mysql + Firebase
The database is managed by MySQL and Firebase is also used to store the images that are uploaded to the application. In the mysql database we will be able to find the routes to the images in firebase which we will be able to recover from the frontend.

## Project start-up
1. Clone the repository
2. Start Database
  2.1. Execute the following command:
  ```docker run -p 3306:3306 --name nodejs-mysql -e MYSQL_ROOT_PASSWORD=<pass> -e MYSQL_DATABASE=todays-rrr -d mysql:5.7```
  The password is sent by mail to the teacher.

  2.2. Execute the commands:
  ```sudo docker container ls -la; sudo docker start <id>```

  2.3. Launch the sql script:
  ```mysql -u root -p todays-rrr < ./client/sql/create_db.sql```
3. From /client execute npm install
4. From /server execute npm install
5. From /client/ execute npm run dev
6. From /server/ execute node index.js

## Github
I have used Github to store the project.

## Requirements
1, 2 and 3 : Firebase and Google Oauth
4 : Login Oauth
6 : Docker
7 : Github and README
