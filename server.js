// Local server for running Money Diary on your laptop (and phone on the same Wi-Fi).
// Start it with:  npm start   then open http://localhost:3000
import http from "node:http";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));

// Load .env (ANTHROPIC_API_KEY=...) without extra packages
const envFile = path.join(dir, ".env");
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
const { default: conclusion } = await import("./api/conclusion.js");

const PORT = Number(process.env.PORT) || 3000;
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".svg": "image/svg+xml", ".ico": "image/x-icon" };

http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (url.pathname === "/api/conclusion") return conclusion(req, res);
  const file = path.join(dir, url.pathname === "/" ? "index.html" : path.normalize(url.pathname).replace(/^([/\\])+/, ""));
  if (!file.startsWith(dir) || file.includes(`${path.sep}.`) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.statusCode = 404; return res.end("Not found");
  }
  res.setHeader("Content-Type", types[path.extname(file)] || "application/octet-stream");
  fs.createReadStream(file).pipe(res);
}).listen(PORT, "0.0.0.0", () => {
  const ips = Object.values(os.networkInterfaces()).flat().filter(i => i && i.family === "IPv4" && !i.internal).map(i => i.address);
  console.log(`\nMoney Diary is running`);
  console.log(`  Laptop:  http://localhost:${PORT}`);
  ips.forEach(ip => console.log(`  Phone (same Wi-Fi):  http://${ip}:${PORT}`));
  console.log(`  AI conclusion: ${process.env.ANTHROPIC_API_KEY ? "ON" : "OFF (add ANTHROPIC_API_KEY to .env)"}\n`);
});
