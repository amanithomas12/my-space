exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { messages } = JSON.parse(event.body);

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: "You are Amani's personal assistant built into her dashboard. You help with tasks, study planning, meal ideas, content ideas, workout motivation, budgeting tips, and general advice. Keep responses concise and friendly.",
      messages,
    }),
  });

  const data = await response.json();

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reply: data.content[0].text }),
  };
};
