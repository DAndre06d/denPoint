import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpUser = process.env.SMTP_EMAIL;
const smtpPass = process.env.SMTP_PASS;
const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;

const isEmailConfigured = Boolean(smtpUser && smtpPass);

const transporter = isEmailConfigured
  ? nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })
  : null;

export const verifyEmailTransport = async () => {
  if (!transporter) {
    console.warn("SMTP is not configured. Email reminders are disabled.");
    return false;
  }

  try {
    await transporter.verify();
    console.log("SMTP transporter is ready.");
    return true;
  } catch (error) {
    console.error("SMTP verification failed:", error.message);
    return false;
  }
};

const sendEmail = async (to, subject, text) => {
  if (!transporter) {
    console.warn(`Skipping email to ${to}. SMTP is not configured.`);
    return;
  }

  const mailOptions = {
    from: smtpUser,
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}:`, info.response);
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error.message);
    throw error;
  }
};

export default sendEmail;
