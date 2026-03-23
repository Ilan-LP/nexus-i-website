import { sendContactEmail, sendMeetingEmail } from "../services/emailService.js";

export async function submitContact(req, res, next) {
  try {
    await sendContactEmail(req.cleanedPayload);
    return res.status(200).json({ success: true });
  } catch (error) {
    error.status = 500;
    error.message = "Unable to process contact request.";
    return next(error);
  }
}

export async function submitMeeting(req, res, next) {
  try {
    await sendMeetingEmail(req.cleanedPayload);
    return res.status(200).json({ success: true });
  } catch (error) {
    error.status = 500;
    error.message = "Unable to process meeting request.";
    return next(error);
  }
}

export function healthCheck(req, res) {
  return res.status(200).json({
    status: "ok",
    success: true,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
}
