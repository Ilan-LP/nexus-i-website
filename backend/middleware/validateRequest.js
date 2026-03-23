const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[+()\d\s.-]{6,30}$/;

const LIMITS = {
  name: 120,
  email: 254,
  phone: 30,
  preferredTime: 120,
  message: 5000,
};

function sanitize(value) {
  return typeof value === "string" ? value.trim() : "";
}

function exceedsMaxLength(value, max) {
  return value.length > max;
}

function isHoneypotTriggered(value) {
  return Boolean(value);
}

export function validateContactRequest(req, res, next) {
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ success: false, message: "Invalid contact payload." });
  }

  const name = sanitize(req.body.name);
  const email = sanitize(req.body.email);
  const message = sanitize(req.body.message);
  const website = sanitize(req.body.website);

  if (isHoneypotTriggered(website)) {
    return res.status(200).json({ success: true });
  }

  if (
    !name ||
    !email ||
    !message ||
    !emailRegex.test(email) ||
    exceedsMaxLength(name, LIMITS.name) ||
    exceedsMaxLength(email, LIMITS.email) ||
    exceedsMaxLength(message, LIMITS.message)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid contact payload.",
    });
  }

  req.cleanedPayload = { name, email, message, website };
  next();
}

export function validateMeetingRequest(req, res, next) {
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ success: false, message: "Invalid meeting payload." });
  }

  const name = sanitize(req.body.name);
  const phone = sanitize(req.body.phone);
  const preferredTime = sanitize(req.body.preferredTime);
  const website = sanitize(req.body.website);

  if (isHoneypotTriggered(website)) {
    return res.status(200).json({ success: true });
  }

  if (
    !name ||
    !phone ||
    !preferredTime ||
    !phoneRegex.test(phone) ||
    exceedsMaxLength(name, LIMITS.name) ||
    exceedsMaxLength(phone, LIMITS.phone) ||
    exceedsMaxLength(preferredTime, LIMITS.preferredTime)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid meeting payload.",
    });
  }

  req.cleanedPayload = { name, phone, preferredTime, website };
  next();
}
