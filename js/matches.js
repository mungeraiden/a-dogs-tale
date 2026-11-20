const API_URL = "http://localhost:3000/api";
const matchesContainer = document.getElementById("matchesContainer");

async function displayMatches() {
  matchesContainer.innerHTML = "";

  try {
    const response = await fetch(`${API_URL}/matches`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Could not retrieve matches.");
    }

    const matches = await response.json();

    if (matches.length === 0) {
      matchesContainer.innerHTML = "<p>You don't have any matches yet.</p>";
      return;
    }

    matches.forEach((match) => {
      matchesContainer.innerHTML += `
        <div class="card dog-card">
          <h2>🐶 ${match.name}</h2>
          <p><strong>Breed:</strong> ${match.breed}</p>
          <p><strong>Messages:</strong> ${match.messages.length}</p>
          <a href="chat.html">Open Conversation</a>
        </div>
      `;
    });
  } catch (error) {
    matchesContainer.innerHTML = `<p>${error.message}</p>`;
  }
}

displayMatches();