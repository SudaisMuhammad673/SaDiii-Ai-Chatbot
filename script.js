const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const messages = document.getElementById("messages");
const welcome = document.getElementById("welcome");
const newChatBtn = document.getElementById("newChatBtn");

let conversation = [];

function addMessage(text, sender) {
  welcome.style.display = "none";
  const row = document.createElement("div");
  row.className = `message ${sender}`;
  const avatar = document.createElement("div");
  avatar.className = "message-avatar";
  avatar.textContent = sender === "user" ? "You" : "✦";
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;
  row.append(avatar, bubble);
  messages.appendChild(row);
  const chatContent = document.getElementById("chatContent");
  chatContent.scrollTop = chatContent.scrollHeight;
}

async function sendMessage(value) {
  const message = value.trim();
  if (!message) return;

  addMessage(message, "user");
  conversation.push({ role: "user", content: message });
  userInput.value = "";
  userInput.style.height = "auto";
  userInput.disabled = true;

  const typing = document.createElement("div");
  typing.className = "typing";
  typing.textContent = "✦ SaDiii AI is thinking...";
  messages.appendChild(typing);
  document.getElementById("chatContent").scrollTop = document.getElementById("chatContent").scrollHeight;

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: conversation.slice(-12) })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "The AI service could not complete your request.");
    }

    const reply = data.reply || "I couldn't generate a response. Please try again.";
    conversation.push({ role: "model", content: reply });
    typing.remove();
    addMessage(reply, "bot");
  } catch (error) {
    typing.remove();
    addMessage(`Sorry, I couldn't connect to SaDiii AI right now. ${error.message}`, "bot");
  } finally {
    userInput.disabled = false;
    userInput.focus();
  }
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage(userInput.value);
});

userInput.addEventListener("input", () => {
  userInput.style.height = "auto";
  userInput.style.height = `${Math.min(userInput.scrollHeight, 120)}px`;
});

document.querySelectorAll(".suggestion").forEach((button) => {
  button.addEventListener("click", () => sendMessage(button.dataset.prompt));
});

newChatBtn.addEventListener("click", () => {
  messages.innerHTML = "";
  welcome.style.display = "block";
  conversation = [];
  userInput.value = "";
  userInput.focus();
});
