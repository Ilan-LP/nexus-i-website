const path = require("node:path");

const envFilePath = path.resolve(__dirname, ".env");

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
      env_file: envFilePath,
      env: {
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
      env_file: envFilePath,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
