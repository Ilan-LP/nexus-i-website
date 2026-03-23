import nodemailer from "nodemailer";
import logger from "../utils/logger.js";

const REQUIRED_ENV = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "SMTP_FROM",
  "CONTACT_EMAIL",
];

function assertEnv() {
  const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing SMTP env vars: ${missing.join(", ")}`);
  }
}

function createTransporter() {
  assertEnv();

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

let transporter;

function getTransporter() {
  if (!transporter) {
    transporter = createTransporter();
  }
  return transporter;
}

export async function sendContactEmail(payload) {
  const subject = `Nexus-I Contact | ${payload.name}`;

  const text = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    "",
    payload.message,
  ].join("\n");

  try {
    await getTransporter().sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      replyTo: payload.email,
      subject,
      text,
    });
  } catch (error) {
    logger.error({ err: error, type: "contact_email" }, "Failed to send contact email");
    throw error;
  }
}

export async function sendMeetingEmail(payload) {
  const subject = `Nexus-I Meeting Request | ${payload.name}`;

  const text = [
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Preferred time: ${payload.preferredTime}`,
  ].join("\n");

  try {
    await getTransporter().sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      subject,
      text,
    });
  } catch (error) {
    logger.error({ err: error, type: "meeting_email" }, "Failed to send meeting email");
    throw error;
  }
}
