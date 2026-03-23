import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import path from "path";
import fs from "fs";
import net from "net";
import { errorHandler } from "./middleware/errorHandler.js";
import contactRoutes from "./routes/contactRoutes.js";
import logger from "./utils/logger.js";


const app = express();
const port = Number(process.env.BACKEND_PORT || process.env.PORT);

function isValidPort(value) {
  return Number.isInteger(value) && value > 0 && value <= 65535;
}

async function assertPortAvailable(value) {
  await new Promise((resolve, reject) => {
    const tester = net.createServer();

    tester.once("error", (error) => {
      if (error.code === "EADDRINUSE") {
        reject(new Error(`Port ${value} is already in use`));
        return;
      }

      reject(error);
    });

    tester.once("listening", () => {
      tester.close(resolve);
    });

    tester.listen(value, "0.0.0.0");
  });
}

function getAllowedOrigins() {
  const fallback = [];
  const frontendPort = process.env.FRONTEND_PORT;

  if (process.env.FRONTEND_ORIGIN) {
    fallback.push(process.env.FRONTEND_ORIGIN);
  }

  if (frontendPort) {
    fallback.push(`http://localhost:${frontendPort}`);
  }

  const configured = process.env.CORS_ALLOWED_ORIGINS || process.env.FRONTEND_ORIGIN;

  if (!configured) {
    return fallback;
  }

  return configured
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

const allowedOrigins = getAllowedOrigins();

// Ensure correct client IP handling behind common production reverse proxies.
app.set("trust proxy", 1);

app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use(helmet());
app.use(express.json({ limit: "250kb" }));

// Optionally serve a built frontend from ../frontend/dist when SERVE_FRONTEND is set.
const distPath = path.join(process.cwd(), "frontend", "dist");
const serveFrontend = process.env.SERVE_FRONTEND === "true" || process.env.SERVE_FRONTEND === "1";

if (serveFrontend && fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// Keep current /api routes while preparing /api/v1 adoption.
app.use("/api", contactRoutes);
app.use("/api/v1", contactRoutes);

if (serveFrontend && fs.existsSync(distPath)) {
  // Fallback to index.html for client-side routing
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  if (!isValidPort(port)) {
    logger.fatal(
      {
        backendPort: process.env.BACKEND_PORT,
        legacyPort: process.env.PORT,
      },
      "Invalid or missing BACKEND_PORT/PORT environment variable"
    );
    process.exit(1);
  }

  assertPortAvailable(port)
    .then(() => {
      app.listen(port, () => {
        logger.info(
          {
            port,
            allowedOrigins,
          },
          "API server started"
        );
      });
    })
    .catch((error) => {
      logger.fatal({ err: error, port }, "API server failed to bind port");
      process.exit(1);
    });
}

process.on("unhandledRejection", (error) => {
  logger.error({ err: error }, "Unhandled promise rejection");
});

process.on("uncaughtException", (error) => {
  logger.fatal({ err: error }, "Uncaught exception");
  process.exit(1);
});

export default app;
