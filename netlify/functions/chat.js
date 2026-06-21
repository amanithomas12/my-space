const https = require("https");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { messages } = JSON.parse(event.body);

  const payload = JSON.stringify({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    system: "You are Amani's personal assistant built into her dashboard. You help with tasks, study planning, meal ideas, content ideas, workout motivation, budgeting tips, and general advice. Keep responses concise and friendly.",
    messages,
  });

  return new Promise((resolve) => {
    const options = {
      hostname: "api.anthropic.com",
      path: "/v1/messages",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "Content-Length": Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          resolve({
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reply: parsed.content[0].text }),
          });
        } catch (e) {
          resolve({ statusCode: 500, body: JSON.stringify({ error: data }) });
        }
      });
    });

    req.on("error", (e) => {
      resolve({ statusCode: 500, body: JSON.stringify({ error: e.message }) });
    });

    req.write(payload);
    req.end();
  });
};
