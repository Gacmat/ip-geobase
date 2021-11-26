# IP database web application
Fullstack Developer test task

 1. Backend - Express.js
 2. Database - MongoDB
 3. Frontend - ReactApp

To run this application you need installed Docker and Docker-Compose

1. open terminal
2. Download github repo: git clone http://github/com/Gacmat/IP-database-Web-Application.git
3. cd IP-database-Web-Application
4. build images for backend and frontend
4.5 if you have installed any Make you can just write 'make' to create images.
5. docker build -t api-server ./server/
6. docker build -t react-app ./client/
7. docker-compose up

Front is serve on PORT = 3000
Back is serve on PORT = 8080
Mongo is serve on PORT = 27017
