import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, "..", "");
  const frontendPort = Number(env.FRONTEND_PORT);
  const backendPort = Number(env.BACKEND_PORT);
  const proxyTarget =
    env.VITE_PROXY_TARGET || (Number.isInteger(backendPort) ? `http://localhost:${backendPort}` : undefined);

  return {
    envDir: "..",
    plugins: [react()],
    test: {
      environment: "jsdom",
      setupFiles: "./src/test/setup.js",
      globals: true,
    },
    server: {
      ...(Number.isInteger(frontendPort) ? { port: frontendPort } : {}),
      ...(proxyTarget
        ? {
            proxy: {
              "/api": {
                target: proxyTarget,
                changeOrigin: true,
              },
            },
          }
        : {}),
    },
  };
});
