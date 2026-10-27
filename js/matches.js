const matchesContainer = document.getElementById("matchesContainer");

const likedDogs = JSON.parse(localStorage.getItem("likedDogs")) || [];

function displayMatches() {
    matchesContainer.innerHTML = "";

    if (likedDogs.length === 0) {
        matchesContainer.innerHTML = "<p>You haven't liked any dogs yet.</p>";
        return;
    }

    likedDogs.forEach(dog => {
        matchesContainer.innerHTML += `
            <div class="card dog-card">
                <h2>🐶 ${dog.name}</h2>
                <p><strong>Breed:</strong> ${dog.breed}</p>
                <p><strong>Age:</strong> ${dog.age}</p>
                <p><strong>Location:</strong> ${dog.location}</p>
                <button onclick="removeMatch('${dog.name}')">💔 Remove</button>
            </div>
        `;
    });
}

function removeMatch(name) {
    const updatedDogs = likedDogs.filter(dog => dog.name !== name);

    localStorage.setItem("likedDogs", JSON.stringify(updatedDogs));

    location.reload();
}

displayMatches();