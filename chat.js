// ── AI CHAT ASSISTANT ──────────────────────────────────────────────────────

const chatHTML = `
<div id="chat-bubble" onclick="toggleChat()">✦</div>
<div id="chat-panel">
  <div id="chat-header">
    <span>Amani's Assistant</span>
    <span onclick="toggleChat()" style="cursor:pointer;opacity:0.5;">✕</span>
  </div>
  <div id="chat-messages"></div>
  <div id="chat-input-area">
    <input type="text" id="chat-input" placeholder="Ask me anything..." />
    <button onclick="sendMessage()">↑</button>
  </div>
</div>
`;

document.body.insertAdjacentHTML("beforeend", chatHTML);

let chatHistory = [];
let chatOpen = false;

function toggleChat() {
  chatOpen = !chatOpen;
  document.getElementById("chat-panel").style.display = chatOpen ? "flex" : "none";
  if (chatOpen) document.getElementById("chat-input").focus();
}

function appendMessage(role, text) {
  const messages = document.getElementById("chat-messages");
  const div = document.createElement("div");
  div.className = "chat-msg " + (role === "user" ? "chat-user" : "chat-ai");
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById("chat-input");
  const text = input.value.trim();
  if (!text) return;

  input.value = "";
  appendMessage("user", text);
  chatHistory.push({ role: "user", content: text });

  const typing = document.createElement("div");
  typing.className = "chat-msg chat-ai";
  typing.id = "chat-typing";
  typing.textContent = "...";
  document.getElementById("chat-messages").appendChild(typing);

  try {
    const res = await fetch("/.netlify/functions/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: chatHistory }),
    });
    const data = await res.json();
    document.getElementById("chat-typing")?.remove();
    appendMessage("assistant", data.reply);
    chatHistory.push({ role: "assistant", content: data.reply });
  } catch {
    document.getElementById("chat-typing")?.remove();
    appendMessage("assistant", "Something went wrong. Try again.");
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && chatOpen) sendMessage();
});
