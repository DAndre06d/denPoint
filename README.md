# Backend Service for Scheduling System

## Overview

This backend service is built using Node.js with Express and MySQL. It provides an API for user authentication, scheduling appointments, managing dentists, and handling maintenance tasks. The application utilizes JWT for authentication, rate limiting, and scheduled tasks for email reminders.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **MySQL**: Relational database management system.
- **bcrypt**: Library for hashing passwords.
- **jsonwebtoken**: Library for creating and verifying JSON Web Tokens.
- **node-cron**: Library for scheduling tasks.
- **dotenv**: Module for loading environment variables.

## Configuration

### Environment Variables

The application relies on environment variables defined in a `.env` file. Essential variables include:

- `PORT`: Port number on which the server will run.
- `ACCESS_TOKEN_SECRET`: Secret key for signing JWT tokens.

### Middleware

- **Cookie Parser**: Parses cookies attached to the client request object.
- **CORS**: Enables Cross-Origin Resource Sharing.
- **Rate Limiter**: Restricts the number of requests a user can make to the server.

## Routes

### Authentication Routes (`/auth`)

- **POST `/register`**: Registers a new user.
  - **Request Body**: `email`, `password`, `fName`, `lName`, `phoneNumber`
  - **Responses**: 
    - `201`: User created successfully.
    - `400`: Validation errors.
    - `409`: Email already exists.

- **POST `/login`**: Logs in a user.
  - **Request Body**: `email`, `password`
  - **Responses**:
    - `200`: Login successful with a JWT in cookies.
    - `401`: Incorrect username or password.
    - `404`: User not found.
    - `422`: Validation errors.

### Appointment Routes (`/book`)

- **POST `/createAppointment`**: Creates a new appointment.
  - **Request Body**: `userId`, `denID`, `date`, `status`, `time`, `concern`, `typeOfService`
  - **Responses**:
    - `200`: Appointment created successfully.
    - `400`: Validation errors.
    - `409`: Conflicts with existing appointments.
    - `422`: Missing required fields.

- **GET `/getAppointments`**: Retrieves a list of appointments.
  - **Query Params**: `userId`, `denId`, `page`, `limit`
  - **Responses**:
    - `200`: Successfully retrieved appointments.
    - `400`: Validation errors.
    - `403`: Unauthorized access.
    - `500`: Internal server error.

- **POST `/updateAppointment`**: Updates an existing appointment.
  - **Request Body**: `userId`, `appointId`, `date`, `time`, `concern`, `denID`, `typeOfService`
  - **Responses**:
    - `200`: Appointment updated successfully.
    - `400`: Validation errors.
    - `403`: Unauthorized access.
    - `404`: Appointment not found.
    - `422`: No fields to update.

- **POST `/deleteAppointment`**: Deletes an appointment.
  - **Request Body**: `userId`, `appointId`
  - **Responses**:
    - `200`: Appointment deleted successfully.
    - `400`: Validation errors.
    - `403`: Unauthorized access.
    - `404`: Appointment not found.

### Dentist Routes (`/dentist`)

- **GET `/getDentists`**: Retrieves a list of dentists based on specialty or time.
  - **Query Params**: `time`, `specialty`
  - **Responses**:
    - `200`: Successfully retrieved dentists.
    - `404`: Invalid query.

- **GET `/getDentistAvailableTime`**: Retrieves available times for a specific dentist.
  - **Query Params**: `denId`, `date`
  - **Responses**:
    - `200`: Successfully retrieved available times.
    - `400`: Missing `denId`.

### Maintenance Routes (`/maintenance`)

- **POST `/changePassword`**: Changes the user's password.
  - **Request Body**: `oldPassword`, `newPassword`
  - **Responses**:
    - `200`: Password updated successfully.
    - `400`: Validation errors.
    - `401`: Incorrect old password.
    - `404`: User not found.

## Utilities

### Rate Limiting

- **File**: `utils/rateLimit.js`
- **Purpose**: Limits the number of requests to the API to prevent abuse.

### Email Scheduling

- **File**: `utils/appointmentUtils.js`
- **Purpose**: Scheduled task to send email reminders for upcoming appointments.
- **Cron Expression**: `0 0 * * *` (runs daily at midnight)

### Authentication Utilities

- **File**: `utils/authUtils.js`
- **Purpose**: Contains functions for comparing hashed passwords, updating user passwords, and fetching user details.

### Appointment Utilities

- **File**: `utils/appointmentUtils.js`
- **Purpose**: Functions for checking appointment existence, dentist availability, and managing appointments.

## Error Handling

- **500 Internal Server Error**: Generic error message for unexpected conditions.
- **400 Bad Request**: Invalid input from the client.
- **401 Unauthorized**: Authentication issues.
- **403 Forbidden**: Authorization issues.
- **404 Not Found**: Requested resource does not exist.

## Error Codes and Responses

- **400**: "Invalid query" / "Please enter all the required information."
- **401**: "Incorrect username or password."
- **403**: "Unauthorized access" / "You do not have permission to make changes to this appointment."
- **404**: "User not found." / "Appointment not found."
- **409**: "An appointment already exists for this date and time."

## Installation

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    ```

2. **Navigate to the project directory**:
    ```bash
    cd <project-directory>
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Create a `.env` file**:
    Copy the `.env.example` file to `.env` and update with appropriate values:
    ```env
    PORT=3000
    ACCESS_TOKEN_SECRET=your_jwt_secret
    ```

5. **Start the server**:
    ```bash
    npm start
    ```

---
