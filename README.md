# Factorial Recruitment Challenge 

We want a Frontend + Backend application that allows you to post and visualize metrics. Each metric will have: Timestamp, name, and value. The metrics will be shown in a timeline and must show averages per minute/hour/day The metrics will be persisted in the database.

## How to start the application

### Prerrequisites

- A MongoDB instance up and running. One is provided in `./backend/docker-compose.yaml`, but you will need Docker and docker-compose installed. Just open a terminal, and from inside the backend folder, run `docker-compose up`. It is also provided a WebUI for Mongo in the port 8081.
- Node v16 or greater installed in your computer.
- Generate your own `.env` file. You can just rename the `.env.example` provided in `/backend` folder.

### Starting the backend

- If its the first time you start the application, is recommended to seed the database with some data. For this, a couple utility scripts are provided, just navigate to `backend` folder and run `npm run db:seed`. This seeds includes some events data and a user with email **alvaro@test.com** and password **1234**.
- Start the backend service by running `npm run dev` (for starting the server in development mode) or `npm run build && npm run start`. This will start the server on your machine on the port specified in the `.env` file.

### Starting the frontend

- Start the frontend application by navigating to the `frontend` folder and running `npm run start`. This will start the application on port 3000.
- Navigate to `http://localhost:3000` and log in with the seeded user, or go to signup and create your own.

### Starting everything

- Another `docker-compose.yaml` file is provided at the root of the repository. Just run `docker-compose up` from the root of this project and it will lift up all required services: database on port 27017, backend on 4000 and frontend on 3000 and also the mongo admin on 8081. Beware, if its this first time you start the application, you will need to seed the database  for data to appear.
