const API_URL = "http://localhost:3000/api";

const dogs = [
  {
    id: 1,
    name: "Bella",
    breed: "Golden Retriever",
    age: 3,
    location: "Spokane",
  },
  {
    id: 2,
    name: "Max",
    breed: "Husky",
    age: 2,
    location: "Seattle",
  },
  {
    id: 3,
    name: "Luna",
    breed: "Labrador",
    age: 4,
    location: "Boise",
  },
  {
    id: 4,
    name: "Charlie",
    breed: "German Shepherd",
    age: 5,
    location: "Portland",
  },
];

console.log("browse.js loaded");

const dogsContainer = document.getElementById("dogsContainer");
const breedFilter = document.getElementById("breedFilter");

function getToken() {
  return localStorage.getItem("token");
}

function displayDogs(dogsToDisplay) {
  dogsContainer.innerHTML = "";

  dogsToDisplay.forEach((dog) => {
    dogsContainer.innerHTML += `
      <div class="card dog-card">
        <h2>🐶 ${dog.name}</h2>
        <p><strong>Breed:</strong> ${dog.breed}</p>
        <p><strong>Age:</strong> ${dog.age}</p>
        <p><strong>Location:</strong> ${dog.location}</p>

        <button onclick="likeDog(${dog.id})">❤️ Like</button>
        <button onclick="passDog(${dog.id})">❌ Pass</button>
      </div>
    `;
  });
}

displayDogs(dogs);

breedFilter.addEventListener("change", function () {
  const selectedBreed = breedFilter.value;

  if (selectedBreed === "all") {
    displayDogs(dogs);
    return;
  }

  const filteredDogs = dogs.filter((dog) => dog.breed === selectedBreed);

  displayDogs(filteredDogs);
});

async function likeDog(id) {
  const dog = dogs.find((dog) => dog.id === id);

  try {
    console.log("Token:", getToken());
    const response = await fetch(`${API_URL}/interactions/${id}/like`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.message);
      return;
    }

    alert(result.message);
    removeDog(dog.name);
  } catch (error) {
    console.error("Error liking dog:", error);
    alert("Could not connect to the server.");
  }
}

async function passDog(id) {
  const dog = dogs.find((dog) => dog.id === id);

  try {
    console.log("Token:", getToken());
    const response = await fetch(`${API_URL}/interactions/${id}/pass`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.message);
      return;
    }

    alert("You passed on " + dog.name + ".");
    removeDog(dog.name);
  } catch (error) {
    console.error("Error passing dog:", error);
    alert("Could not connect to the server.");
  }
}

function removeDog(name) {
  const dogIndex = dogs.findIndex((dog) => dog.name === name);

  if (dogIndex !== -1) {
    dogs.splice(dogIndex, 1);
    displayDogs(dogs);
  }
}