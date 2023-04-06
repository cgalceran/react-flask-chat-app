# React, Flask API, SocketIO, PostgreSQL and Docker

Link to the App: [Link](https://chatapp-vrrb.onrender.com)

## Summary

This React, Flask API and PostgreSQL project is a Chat app where you can register as an user, log in and start chatting with your friend in a common room. It was made with ViteJS React 18 as the frontend and Flask as an internal API for backend, PostgreSQL as a DB and Websockets to push messages to users. The styling was made in TaildwindCSS and deployed as a Web Service and a separate DB on render.com

![screely-1680744242174](https://user-images.githubusercontent.com/11094871/230249259-18d13977-142f-4b70-8c8b-947f0caf7de8.png)

### Tech Used

ViteJS React 18, JavaScript, Axios, Flask, Python, SQLalchemy for ORM, SocketIO, Docker and TaildwindCSS.

How to use this app locally, make sure you have Docker installed on your computer.
 - from the root folder, run this command to create the postgreSQL database:
```
docker compose up -d flask_db
```
then build the app with this command:
```
docker-compose build
```
then create the container to run the app:
```
docker compose up -d flask_app
```

if you see an error you can rerun the previous command and rebuild with the --build tag



# Author

Made with ♥ by Carlos Galceran | [Github](https://github.com/cgalceran) | [LinkedIn](https://www.linkedin.com/in/cgalceran/)
