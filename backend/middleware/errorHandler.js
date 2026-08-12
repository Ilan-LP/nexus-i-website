import logger from "../utils/logger.js";

export function errorHandler(error, req, res, next) {
  const status = Number(error?.status) || 500;

  // Only surface the actual error message for explicit 4xx errors set by
  // our own controllers/middleware. Anything else (bugs, library errors,
  // 5xx) gets a generic message so we never leak internal details to the
  // client, even if a future code path forgets to set a safe message.
  const isClientError = status >= 400 && status < 500;
  const message = isClientError && error?.message ? error.message : "Internal server error.";

  logger.error(
    {
      err: error,
      method: req.method,
      path: req.originalUrl,
      ip: req.ip,
    },
    "Request failed"
  );

  if (res.headersSent) {
    return next(error);
  }

  return res.status(status).json({
    success: false,
    message,
  });
}
