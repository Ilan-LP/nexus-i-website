import rateLimit from "express-rate-limit";

const DEFAULT_WINDOW_MS = 15 * 60 * 1000;
const DEFAULT_MAX = 10;

export const createSubmissionLimiter = () =>
  rateLimit({
    windowMs: Number(process.env.RATE_LIMIT_WINDOW) || DEFAULT_WINDOW_MS,
    max: Number(process.env.RATE_LIMIT_MAX) || DEFAULT_MAX,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: "Too many requests from this IP. Please retry later.",
    },
  });
