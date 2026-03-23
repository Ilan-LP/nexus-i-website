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
      env_file: ".env",
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
      env_file: ".env",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
