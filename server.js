// Local server for Money Diary. Start with:  npm start   then open http://localhost:3000
// Your phone can open the "Phone" address while both are on the same Wi-Fi.
import http from "node:http";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3000;
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json",
  ".webmanifest": "application/manifest+json", ".png": "image/png", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".txt": "text/plain" };

http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  const file = path.join(dir, url.pathname === "/" ? "index.html" : path.normalize(decodeURIComponent(url.pathname)).replace(/^([/\\])+/, ""));
  if (!file.startsWith(dir) || file.includes(`${path.sep}.`) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.statusCode = 404; return res.end("Not found");
  }
  res.setHeader("Content-Type", types[path.extname(file)] || "application/octet-stream");
  res.setHeader("Cache-Control", "no-cache");
  fs.createReadStream(file).pipe(res);
}).listen(PORT, "0.0.0.0", () => {
  const ips = Object.values(os.networkInterfaces()).flat().filter(i => i && i.family === "IPv4" && !i.internal).map(i => i.address);
  console.log(`\nMoney Diary is running`);
  console.log(`  Laptop:  http://localhost:${PORT}`);
  ips.forEach(ip => console.log(`  Phone (same Wi-Fi):  http://${ip}:${PORT}`));
  console.log(`  Stop with Ctrl+C\n`);
});
