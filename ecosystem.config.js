const path = require("node:path");
const fs = require("node:fs");

const envFilePath = path.resolve(__dirname, ".env");
const backendEnvFilePath = path.resolve(__dirname, "backend", ".env");
const frontendEnvFilePath = path.resolve(__dirname, "frontend", ".env");

function resolveEnvFile(preferredPath) {
  if (fs.existsSync(envFilePath)) {
    return envFilePath;
  }

  return preferredPath;
}

module.exports = {
  apps: [
    {
      name: "nexus-i-backend",
      script: "backend/server.js",
      cwd: ".",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      watch: false,
      max_restarts: 10,
      exp_backoff_restart_delay: 200,
      env_file: resolveEnvFile(backendEnvFilePath),
      env: {
        NODE_ENV: "production",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "nexus-i-frontend",
      script: "frontend/scripts/serve-dist.mjs",
      cwd: ".",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      watch: false,
      max_restarts: 10,
      exp_backoff_restart_delay: 200,
      env_file: resolveEnvFile(frontendEnvFilePath),
      env: {
        NODE_ENV: "production",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
