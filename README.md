# Fullstack-React-Node-Test

## Project Description

This project is a full-stack application using React for the frontend, Node.js for the backend, and PostgreSQL as the database. The setup includes Docker for containerized deployment and Task for simplified task execution.

---

## Prerequisites

Before running the project, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/) (for containerized services)
- [Task](https://taskfile.dev/installation/) (for running predefined tasks)

---

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/KaterynaKisiv/Fullstack-React-Node-Test.git
cd project
```

### 2. Set Up Environment Variables
Create a .env file in the project root with the variables from the .env.sample

### 3. Build and Run the Project
Use task to build and start all services:

```sh
task run
```
This will:

- Build the backend and frontend Docker images if required.
- Start the database, backend, frontend, and Nginx services using Docker Compose.

Task helps automate and optimize the build process by rebuilding Docker images only if necessary changes were made to the relevant files. This avoids unnecessary rebuilds, saving time and resources.

Nginx acts as a reverse proxy, routing incoming requests to the correct services:
- Requests to /api/* go to the backend service.
- All other requests go to the frontend.

### 4. Access the Application

- Frontend: http://localhost
- Backend API: http://localhost/api
- Database: Available on localhost:5599 (PostgreSQL)