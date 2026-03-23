import logger from "../utils/logger.js";

export function errorHandler(error, req, res, next) {
  const status = Number(error?.status) || 500;
  const message = error?.message || "Internal server error.";

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
