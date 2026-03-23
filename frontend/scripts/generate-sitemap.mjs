import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const baseUrl = process.env.VITE_SITE_URL || process.env.SITE_URL || "https://nexus-i.fr";
const lastmod = new Date().toISOString();

const routes = [
  "/",
  "/services",
  "/projects",
  "/about",
  "/contact",
  "/legal-notice",
  "/privacy-policy",
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
  .map(
    (route) =>
      `  <url>\n    <loc>${baseUrl}${route}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${route === "/" ? "1.0" : "0.8"}</priority>\n  </url>`
  )
  .join("\n")}\n</urlset>\n`;

const distPath = resolve("dist", "sitemap.xml");
const publicPath = resolve("public", "sitemap.xml");

await mkdir(resolve("dist"), { recursive: true });
await writeFile(distPath, sitemap, "utf8");
await writeFile(publicPath, sitemap, "utf8");
