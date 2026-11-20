const API_URL = "http://localhost:3000/api";
const MATCH_ID = 1;

const messagesContainer = document.getElementById("messages");
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const chatTitle = document.getElementById("chatTitle");
const conversationList = document.querySelector(".conversation-list");

const token = localStorage.getItem("token");

async function loadMessages() {
  try {
    const response = await fetch(
      `${API_URL}/matches/${MATCH_ID}/messages`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Could not load messages.");
    }

    const messages = await response.json();
    displayMessages(messages);
  } catch (error) {
    messagesContainer.innerHTML = `<p>${error.message}</p>`;
  }
}

function displayMessages(messages) {
  messagesContainer.innerHTML = "";

  messages.forEach((message) => {
    const messageElement = document.createElement("p");

    messageElement.classList.add(
      message.sender === "You" ? "sent" : "received"
    );

    messageElement.textContent = message.text;
    messagesContainer.appendChild(messageElement);
  });

  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

async function sendMessage(event) {
  event.preventDefault();

  const messageText = messageInput.value.trim();

  if (!messageText) return;

  try {
    const response = await fetch(
      `${API_URL}/matches/${MATCH_ID}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: messageText }),
      }
    );

    if (!response.ok) {
      throw new Error("Could not send message.");
    }

    messageInput.value = "";
    await loadMessages();
  } catch (error) {
    alert(error.message);
  }
}

conversationList.innerHTML = `
  <h2>Conversations</h2>
  <button class="conversation active">🐶 Buddy's Owner</button>
`;

chatTitle.textContent = "Buddy's Owner";

messageForm.addEventListener("submit", sendMessage);

loadMessages();