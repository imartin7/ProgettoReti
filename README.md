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

### Docker
I have used docker to automate the process.

## Project start-up
1. Clone the repository
2. Compile the docker-rebuild file that raises the server, client, nginx and mysql.

---- Remarks just in case: Probably you need to compile that commands:
      --> If you have problems with the port 3306: 
        sudo netstat -p -nlp | grep 3306
        sudo kill XXXXX
      --> In the route ../client/ : 
        npm run build

## Github
I have used Github to store the project.

## Requirements
1, 2 and 3 : Firebase and Google Oauth
4 : Login Oauth
6 : Docker
7 and 8 : Github and README
9: Csrf is used with Google authentication, the password is also stored with an encryption system and also use of environment variables included in .env files that aren't uploaded to the repository via .gitignore to maintain the security and integrity of the project.


Author: Inés Martín Mateos
Subject: Reti di Calcolatori
