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

### 4. Migrations
#### To generate new migration based on changes in entities:

```sh
MIGRATION_NAME=<your_migration_name> task generate-migration
```

This will generate new migration in the migrations folder with the name, passed to the MIGRATION_NAME variable

#### To run migrations:

```sh
task run-migrations
```

### 5. Access the Application

- Frontend: http://localhost
- Backend API: http://localhost/api
- Database: Available on localhost:5599 (PostgreSQL)


## API Endpoints Documentation

### 1. **Get Tasks**

- **Endpoint**: `/tasks`
- **Method**: `GET`
- **Description**: Retrieves a list of all tasks.
- **Request**:
    - No request body or query parameters are needed.
- **Response**:
    - **Status Code**: `200 OK`
    - **Response Body**:
      ```json
      [
        {
          "id": 1,
          "createdAt": "2025-03-16T18:01:23.734Z",
          "updatedAt": "2025-03-16T18:18:10.666Z",
          "title": "Sample Task",
          "description": "Description of task",
          "status": "TO_DO"
        },
        {
          "id": 2,
          "createdAt": "2025-03-16T18:01:23.734Z",
          "updatedAt": "2025-03-16T18:18:10.666Z",
          "title": "Another Task",
          "description": "Description of another task",
          "status": "IN_PROGRESS"
        }
      ]
      ```

---

### 2. **Delete Task by ID**

- **Endpoint**: `/tasks/:taskId`
- **Method**: `DELETE`
- **Description**: Deletes a task by its ID.
- **Request**:
    - **URL Parameters**:
        - `taskId` (required): The ID of the task to delete.
- **Response**:
    - **Status Code**: `200 OK`
        - **Response Body**:
          ```text
          "Successfully deleted"
          ```
    - **Status Code**: `400 Bad Request`
        - **Response Body**:
          ```text
          "Task with given id {taskId} was not deleted"
          ```

---

### 3. **Edit Task by ID**

- **Endpoint**: `/tasks/:taskId`
- **Method**: `PUT`
- **Description**: Updates a task by its ID.
- **Request**:
    - **URL Parameters**:
        - `taskId` (required): The ID of the task to update.
    - **Request Body**:
        - Example:
          ```json
          {
            "title": "Updated Task Name",
            "description": "Updated Task Description",
            "status": "IN_PROGRESS"
          }
          ```
    - **Schema Validation**:
      - `title` (string)
      - `description` (string)
      - `status` (`TO_DO` / `IN_PROGRESS` / `DONE`)
- **Response**:
    - **Status Code**: `200 OK`
        - **Response Body**:
          ```text
          "Successfully updated"
          ```
    - **Status Code**: `400 Bad Request`
        - **Response Body**:
            - If the request body fails validation:
            ```json
            {
              "formErrors": [],
              "fieldErrors": {
                "status": [
                  "Invalid enum value. Expected 'TO_DO' | 'IN_PROGRESS' | 'DONE', received 'TO_hhDO'"
                ]
              }
            }
            ```
            - If task wasn't updated:
          ```text
          "Task with given id {taskId} was not updated"
          ```
---

### 4. **Create Task**

- **Endpoint**: `/tasks`
- **Method**: `POST`
- **Description**: Creates a new task.
- **Request**:
    - **Request Body**:
        - Example:
          ```json
          {
            "title": "New Task",
            "description": "Task description",
            "status": "TO_DO"
          }
          ```
    - **Schema Validation**:
      - `title` (string)
      - `description` (string)
      - `status` (`TO_DO` / `IN_PROGRESS` / `DONE`)
- **Response**:
    - **Status Code**: `200 OK`
        - **Response Body**:
          ```json
          {
            "id": 1,
            "createdAt": "2025-03-16T18:01:23.734Z",
            "updatedAt": "2025-03-16T18:18:10.666Z",
            "title": "New Task",
            "description": "Task description",
            "status": "TO_DO"
          }
          ```

    - **Status Code**: `400 Bad Request`
        - If the request body fails validation:
            ```json
            {
              "formErrors": [],
              "fieldErrors": {
                "status": [
                  "Invalid enum value. Expected 'TO_DO' | 'IN_PROGRESS' | 'DONE', received 'TO_hhDO'"
                ]
              }
            }
            ```
---
