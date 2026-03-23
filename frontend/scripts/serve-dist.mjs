import { createServer } from "node:http";
import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..", "..");

const rootEnvPath = path.join(projectRoot, ".env");
const workspaceEnvPath = path.join(projectRoot, "frontend", ".env");

if (existsSync(rootEnvPath)) {
  dotenv.config({ path: rootEnvPath });
}

if (existsSync(workspaceEnvPath)) {
  dotenv.config({ path: workspaceEnvPath });
}

const port = Number(process.env.FRONTEND_PORT || process.env.PORT);
const host = process.env.FRONTEND_HOST || "0.0.0.0";
const distPath = path.join(projectRoot, "frontend", "dist");

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

    tester.listen(value, host);
  });
}

function sendFile(res, filePath, contentType) {
  res.writeHead(200, {
    "Content-Type": contentType,
    "Cache-Control": contentType.includes("text/html") ? "no-cache" : "public, max-age=31536000, immutable",
  });
  createReadStream(filePath).pipe(res);
}

function getContentType(filePath) {
  if (filePath.endsWith(".html")) return "text/html; charset=utf-8";
  if (filePath.endsWith(".js")) return "application/javascript; charset=utf-8";
  if (filePath.endsWith(".css")) return "text/css; charset=utf-8";
  if (filePath.endsWith(".json")) return "application/json; charset=utf-8";
  if (filePath.endsWith(".svg")) return "image/svg+xml";
  if (filePath.endsWith(".png")) return "image/png";
  if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) return "image/jpeg";
  if (filePath.endsWith(".webp")) return "image/webp";
  if (filePath.endsWith(".ico")) return "image/x-icon";
  if (filePath.endsWith(".txt")) return "text/plain; charset=utf-8";
  if (filePath.endsWith(".xml")) return "application/xml; charset=utf-8";
  return "application/octet-stream";
}

async function run() {
  if (!isValidPort(port)) {
    console.error("[frontend] Missing or invalid FRONTEND_PORT/PORT environment variable.");
    process.exit(1);
  }

  if (!existsSync(distPath)) {
    console.error("[frontend] Build folder not found. Run npm run build --workspace frontend first.");
    process.exit(1);
  }

  await assertPortAvailable(port);

  const indexFile = path.join(distPath, "index.html");
  const server = createServer(async (req, res) => {
    try {
      const requestUrl = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
      const safePath = path.normalize(decodeURIComponent(requestUrl.pathname)).replace(/^([.][.][/\\])+/, "");
      const absolutePath = path.join(distPath, safePath);

      if (!absolutePath.startsWith(distPath)) {
        res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Forbidden");
        return;
      }

      if (existsSync(absolutePath) && (await stat(absolutePath)).isFile()) {
        sendFile(res, absolutePath, getContentType(absolutePath));
        return;
      }

      sendFile(res, indexFile, "text/html; charset=utf-8");
    } catch (error) {
      console.error("[frontend] Request error", error);
      res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ success: false, message: "Internal Server Error" }));
    }
  });

  server.on("error", (error) => {
    console.error("[frontend] Server error", error);
    process.exit(1);
  });

  server.listen(port, host, () => {
    console.info(`[frontend] Static server started on http://${host}:${port}`);
  });
}

run().catch((error) => {
  console.error("[frontend] Failed to start", error);
  process.exit(1);
});
