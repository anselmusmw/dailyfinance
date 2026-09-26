// Serverless function: writes the report conclusion with Claude.
// Works on Vercel (as /api/conclusion) and in the local server (server.js).
// Your API key stays here on the server. It is never sent to the browser.

const MODEL = process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001";
const MAX_BODY = 40_000; // bytes

function send(res, status, obj) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(obj));
}

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;          // Vercel already parsed it
  if (typeof req.body === "string") return JSON.parse(req.body);
  let raw = "";
  for await (const chunk of req) { raw += chunk; if (raw.length > MAX_BODY) throw new Error("too_large"); }
  return JSON.parse(raw || "{}");
}

function buildPrompt(data) {
  return `You are a calm, friendly personal finance coach writing the conclusion of a personal "Money Diary" report.
Here is the person's data as JSON (amounts are in Indonesian Rupiah):
${JSON.stringify(data)}

Write the conclusion. Rules:
- Base every statement strictly on the numbers given. Do not invent facts.
- Format money like "Rp 1.250.000" (dots as thousand separators).
- Warm, encouraging, honest tone. Plain English. No emojis, no special symbols, no markdown.
- Do not recommend specific investment products, stocks or funds.
- Keep it short: headline max 10 words; summary 2-3 sentences; exactly 3 highlights and 3 suggestions, each one sentence.

Respond with ONLY a JSON object, no other text:
{"headline": "...", "summary": "...", "highlights": ["...","...","..."], "suggestions": ["...","...","..."]}`;
}

export default async function handler(req, res) {
  const key = process.env.ANTHROPIC_API_KEY;

  // The app calls GET first to see whether AI is switched on.
  if (req.method === "GET") return send(res, 200, { ok: true, ai: Boolean(key) });
  if (req.method !== "POST") return send(res, 405, { error: "method_not_allowed" });
  if (!key) return send(res, 503, { error: "no_api_key" });

  let body;
  try { body = await readBody(req); } catch { return send(res, 400, { error: "bad_request" }); }
  if (!body || typeof body.data !== "object") return send(res, 400, { error: "bad_request" });
  if (JSON.stringify(body.data).length > MAX_BODY) return send(res, 413, { error: "too_large" });

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({ model: MODEL, max_tokens: 800, messages: [{ role: "user", content: buildPrompt(body.data) }] }),
    });
    const out = await r.json();
    if (!r.ok) return send(res, 502, { error: "claude_error", detail: out?.error?.message || r.status });
    const text = (out.content || []).filter(b => b.type === "text").map(b => b.text).join("");
    const json = JSON.parse(text.replace(/```json|```/g, "").trim());
    return send(res, 200, json);
  } catch (e) {
    return send(res, 502, { error: "claude_unavailable" });
  }
}
