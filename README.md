# IP database web application
Fullstack Developer test task

 1. Backend - Express.js
 2. Database - MongoDB
 3. Frontend - ReactApp

To run this application you need installed Docker and Docker-Compose

1. open terminal
2. Download github repo:
<pre>
git clone https://github/com/Gacmat/IP-database-Web-Application.git
</pre>
3. build images for backend and frontend (if you have installed any Make you can just write 'make' to create images.)
<pre>
cd IP-database-Web-Application
docker build -t api-server ./server/
docker build -t react-app ./client/
docker-compose up
</pre>

Front is serve on PORT = 3000
Back is serve on PORT = 8080
Mongo is serve on PORT = 27017
