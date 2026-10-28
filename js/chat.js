const messagesContainer = document.getElementById("messages");
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const chatTitle = document.getElementById("chatTitle");
const conversationList = document.querySelector(".conversation-list");

let currentConversation = 0;

// Load dogs the user has liked.
const likedDogs = JSON.parse(localStorage.getItem("likedDogs")) || [];

// Create a conversation for each liked dog.
const conversations = likedDogs.map((dog) => ({
  name: dog.name + "'s Owner",
  messages: [
    {
      text: `Hi! Thanks for checking out ${dog.name}!`,
      type: "received",
    },
    {
      text: `${dog.name} is a ${dog.breed || "lovely dog"}${dog.age ? ", " + dog.age + " years old" : ""}${dog.location ? " from " + dog.location : ""}.`,
      type: "received",
    },
    {
      text: `I'd love to tell you more about ${dog.name}!`,
      type: "received",
    },
  ],
}));

function displayConversations() {
  conversationList.innerHTML = "<h2>Conversations</h2>";

  if (conversations.length === 0) {
    conversationList.innerHTML += "<p>Like a dog to start a conversation!</p>";
    chatTitle.textContent = "No conversations yet";
    messagesContainer.innerHTML = "";
    return;
  }

  conversations.forEach((conversation, index) => {
    const button = document.createElement("button");
    button.className = "conversation";
    button.textContent = "🐶 " + conversation.name;
    button.addEventListener("click", () => selectConversation(index));

    conversationList.appendChild(button);
  });

  selectConversation(0);
}

function selectConversation(index) {
  currentConversation = index;

  document.querySelectorAll(".conversation").forEach((button, i) => {
    button.classList.toggle("active", i === index);
  });

  chatTitle.textContent = conversations[index].name;
  displayMessages();
}

function displayMessages() {
  messagesContainer.innerHTML = "";

  conversations[currentConversation].messages.forEach((message) => {
    const messageElement = document.createElement("p");
    messageElement.classList.add(message.type);
    messageElement.textContent = message.text;

    messagesContainer.appendChild(messageElement);
  });

  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

messageForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const messageText = messageInput.value.trim();

  if (!messageText || conversations.length === 0) return;

  conversations[currentConversation].messages.push({
    text: messageText,
    type: "sent",
  });

  messageInput.value = "";
  displayMessages();
});

displayConversations();
