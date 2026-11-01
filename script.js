const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const messages = document.getElementById("messages");
const welcome = document.getElementById("welcome");
const newChatBtn = document.getElementById("newChatBtn");

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
  document.getElementById("chatContent").scrollTop = document.getElementById("chatContent").scrollHeight;
}

function getReply(message) {
  const text = message.toLowerCase();
  if (/(hello|hi|hey|salam|assalam)/.test(text)) return "Hey! 👋 I'm SaDiii AI, your demo assistant. What would you like to explore today?";
  if (/(python|javascript|c\+\+|html|css|coding|programming)/.test(text)) return "Great topic! 💻 A good way to improve is to build small projects, practise problem-solving, and read code written by others. Tell me your current level and I can suggest a learning path.";
  if (/(artificial intelligence|\bai\b|machine learning| ml )/.test(text)) return "Artificial Intelligence is a field of computer science focused on building systems that can perform tasks that usually require human intelligence, such as understanding language, recognizing patterns, and making predictions. 🤖";
  if (/(project|idea)/.test(text)) return "Here are 3 beginner-friendly ideas:\n1. Personal portfolio website\n2. Smart expense tracker\n3. Quiz app with a score system\n\nChoose one and I can help you plan its features!";
  if (/(thank|thanks|shukriya)/.test(text)) return "You're welcome! 😊 Keep learning and keep building.";
  if (/(who are you|your name)/.test(text)) return "I'm SaDiii AI, a simple chatbot demo made with HTML, CSS, and JavaScript. I'm here to demonstrate how a chat interface works!";
  if (/(help|what can you do)/.test(text)) return "I can respond to a few common topics in this demo, including programming, AI, and project ideas. Try one of the suggestion cards above!";
  return "That's an interesting question! I'm currently a frontend demo, so my replies come from simple JavaScript rules rather than a live AI model. You can connect an AI API later to make me much smarter. ✨";
}

function sendMessage(value) {
  const message = value.trim();
  if (!message) return;
  addMessage(message, "user");
  userInput.value = "";
  userInput.style.height = "auto";

  const typing = document.createElement("div");
  typing.className = "typing";
  typing.textContent = "✦ SaDiii AI is thinking...";
  messages.appendChild(typing);
  document.getElementById("chatContent").scrollTop = document.getElementById("chatContent").scrollHeight;

  window.setTimeout(() => {
    typing.remove();
    addMessage(getReply(message), "bot");
  }, 550);
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
  userInput.value = "";
  userInput.focus();
});
