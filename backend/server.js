import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import cron from "node-cron";

//import for Routes
import authRoutes from "./routes/authRoutes.js";
import schedRoutes from "./routes/schedRoutes.js";
import dentistRoutes from "./routes/dentistRoutes.js";
import MaintenanceRoutes from "./routes/maintenanceRoutes.js";

//import for utils
import { limiter } from "./utils.js/rateLimit.js";
import corsOptions from "./config/corsOptions.js";
import verifyJWT from "./middlewares/verifyJWT.js";
import { getUpcomingAppointments } from "./utils.js/appointmentUtils.js";
import sendEmail, { verifyEmailTransport } from "./utils.js/sendEmial.js";
import { emailReminder } from "./utils.js/constants.js";
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(limiter);

// Schedule reminder emails every day at midnight.
cron.schedule("0 0 * * *", async () => {
  console.log("running schedule");
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const appointments = await getUpcomingAppointments(tomorrow);

    for (const appointment of appointments) {
      const { email, appointment_date, time, firstname } = appointment;
      const subject = "Upcoming Appointment Reminder";
      const emailData = emailReminder(firstname, appointment_date, time);

      await sendEmail(email, subject, emailData);
    }
  } catch (error) {
    console.error("Error sending email notifications:", error);
  }
});

// Routes
app.use("/auth", authRoutes);
app.use(verifyJWT);
app.use("/book", schedRoutes);
app.use("/dentist", dentistRoutes);
app.use("/maintenance", MaintenanceRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  verifyEmailTransport();
});
