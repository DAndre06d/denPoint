# Den.Point Scheduling System

## Overview

Den.Point is a comprehensive scheduling system for dental appointments. The project includes both a backend API for managing appointments and user authentication, as well as a frontend interface for user interaction. The system is designed to be deployed on AWS using Kubernetes and utilizes AWS RDS for MySQL database management.

## Backend Service

### Overview

The backend service is built using Node.js with Express and MySQL. It provides APIs for user authentication, scheduling appointments, managing dentists, and handling maintenance tasks. Key features include JWT authentication, rate limiting, scheduled email reminders, and email notifications using Nodemailer.

### Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **MySQL (AWS RDS)**: Relational database management system.
- **bcrypt**: Library for hashing passwords.
- **jsonwebtoken**: Library for creating and verifying JSON Web Tokens.
- **node-cron**: Library for scheduling tasks.
- **nodemailer**: Library for sending emails.
- **dotenv**: Module for loading environment variables.

### Configuration

#### Environment Variables

The application relies on environment variables defined in a `.env` file. Essential variables include:

- `SMTP_PASS`: SMTP server password.
- `SMTP_EMAIL`: SMTP user email.
- `DB_HOST`: Database host.
- `DB_PASSWORD`: Database password.
- `DB_USER`: Database user.
- `DB_DATABASE`: Database name.
- `PORT`: Port number for the server.
- `ACCESS_TOKEN_SECRET`: Secret key for signing JWT tokens.

#### Middleware

- **Cookie Parser**: Parses cookies attached to the client request object.
- **CORS**: Enables Cross-Origin Resource Sharing.
- **Rate Limiter**: Restricts the number of requests a user can make to the server.

#### Routes

**Authentication Routes (/auth)**

- `POST /register`: Registers a new user.
  - Request Body: `email`, `password`, `fName`, `lName`, `phoneNumber`
  - Responses: `201` (User created), `400` (Validation errors), `409` (Email exists)

- `POST /login`: Logs in a user.
  - Request Body: `email`, `password`
  - Responses: `200` (Login successful), `401` (Incorrect username/password), `404` (User not found), `422` (Validation errors)

**Appointment Routes (/book)**

- `POST /createAppointment`: Creates a new appointment.
  - Request Body: `userId`, `denID`, `date`, `status`, `time`, `concern`, `typeOfService`
  - Responses: `200` (Created successfully), `400` (Validation errors), `409` (Conflict), `422` (Missing fields)

- `GET /getAppointments`: Retrieves a list of appointments.
  - Query Params: `userId`, `denId`, `page`, `limit`
  - Responses: `200` (Success), `400` (Validation errors), `403` (Unauthorized), `500` (Internal server error)

- `POST /updateAppointment`: Updates an existing appointment.
  - Request Body: `userId`, `appointId`, `date`, `time`, `concern`, `denID`, `typeOfService`
  - Responses: `200` (Updated successfully), `400` (Validation errors), `403` (Unauthorized), `404` (Not found), `422` (No fields to update)

- `POST /deleteAppointment`: Deletes an appointment.
  - Request Body: `userId`, `appointId`
  - Responses: `200` (Deleted successfully), `400` (Validation errors), `403` (Unauthorized), `404` (Not found)

**Dentist Routes (/dentist)**

- `GET /getDentists`: Retrieves a list of dentists based on specialty or time.
  - Query Params: `time`, `specialty`
  - Responses: `200` (Success), `404` (Invalid query)

- `GET /getDentistAvailableTime`: Retrieves available times for a specific dentist.
  - Query Params: `denId`, `date`
  - Responses: `200` (Success), `400` (Missing `denId`)

**Maintenance Routes (/maintenance)**

- `POST /changePassword`: Changes the user's password.
  - Request Body: `oldPassword`, `newPassword`
  - Responses: `200` (Updated successfully), `400` (Validation errors), `401` (Incorrect old password), `404` (User not found)

### Utilities

- **Rate Limiting** (`utils/rateLimit.js`): Limits the number of requests to the API to prevent abuse.
- **Email Scheduling** (`utils/appointmentUtils.js`): Sends email reminders for upcoming appointments (Cron Expression: `0 0 * * *` - daily at midnight).
- **Authentication Utilities** (`utils/authUtils.js`): Functions for comparing hashed passwords, updating user passwords, and fetching user details.
- **Appointment Utilities** (`utils/appointmentUtils.js`): Functions for checking appointment existence, dentist availability, and managing appointments.

### Error Handling

- `500 Internal Server Error`: Generic error message for unexpected conditions.
- `400 Bad Request`: Invalid input from the client.
- `401 Unauthorized`: Authentication issues.
- `403 Forbidden`: Authorization issues.
- `404 Not Found`: Requested resource does not exist.

### Error Codes and Responses

- `400`: "Invalid query" / "Please enter all the required information."
- `401`: "Incorrect username or password."
- `403`: "Unauthorized access" / "You do not have permission to make changes to this appointment."
- `404`: "User not found." / "Appointment not found."
- `409`: "An appointment already exists for this date and time."

### Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. **Navigate to the project directory:**

    ```bash
    cd <project-directory>
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Create a `.env` file:**

    Copy the `.env.example` file to `.env` and update with appropriate values:

    ```env
    PORT=3000
    ACCESS_TOKEN_SECRET=your_jwt_secret
    SMTP_PASS=your_smtp_password
    SMTP_EMAIL=your_smtp_email
    DB_HOST=your_db_host
    DB_PASSWORD=your_db_password
    DB_USER=your_db_user
    DB_DATABASE=your_db_name
    ```

5. **Start the server:**

    ```bash
    npm start
    ```

## Frontend Service

### Technologies Used

- **React:** JavaScript library for building user interfaces.
- **Chakra UI:** Component library for React, providing accessible and reusable components.
- **Redux Toolkit:** For global state management.
- **react-router-dom:** For routing and navigation.
- **Vite:** Fast build tool for modern web development.

### Components and Features

- **SignIn Page:** Allows users to log in with their credentials.
- **SignUp Page:** Allows new users to register for an account.
- **About Page:** Provides information about the service.
- **Services Page:** Lists available services and related information.
- **Booking Page:** Enables users to book appointments and view available times.
- **UserDashboard:** Allows users to update or cancel their appointments and view their schedule.

### Custom Hooks

- **useInput:** Custom hook for managing form inputs using `useReducer`.
- **useHttp:** Custom hook for handling HTTP requests.

### Styling and Layout

- **Chakra UI:** Used for layout and styling of components.
- **Responsive Design:** Ensures the application is usable on various screen sizes.
- **Custom Styling:** Includes custom styling for components and pages.

### Installation and Running

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    ```

2. **Navigate to the project directory:**

    ```bash
    cd <project-directory>
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Start the development server:**

    ```bash
    npm run dev
    ```

5. **Navigate to `http://localhost:3000` in your browser to view the application.**

### Build for Production

To build for production:

```bash
npm run build
```

### Here is the Required video(uploaded in google drive):
https://drive.google.com/file/d/1cVMMM2fYWXv0KWHo3c7Y84KatrlhS_oX/view?usp=sharing

### Link for the deployed frontend (note this is still not connected to a server):
https://den-point.vercel.app/



