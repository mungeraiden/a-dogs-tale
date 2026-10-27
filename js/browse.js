const dogs = [
    {
        name: "Bella",
        breed: "Golden Retriever",
        age: 3,
        location: "Spokane"
    },
    {
        name: "Max",
        breed: "Husky",
        age: 2,
        location: "Seattle"
    },
    {
        name: "Luna",
        breed: "Labrador",
        age: 4,
        location: "Boise"
    },
    {
        name: "Charlie",
        breed: "German Shepherd",
        age: 5,
        location: "Portland"
    }
];
console.log("browse.js loaded");

const dogsContainer = document.getElementById("dogsContainer");
const breedFilter = document.getElementById("breedFilter");

function displayDogs(dogsToDisplay) {

    dogsContainer.innerHTML = "";

    dogsToDisplay.forEach(dog => {

        dogsContainer.innerHTML += `
            <div class="card dog-card">
                <h2>🐶 ${dog.name}</h2>

                <p><strong>Breed:</strong> ${dog.breed}</p>
                <p><strong>Age:</strong> ${dog.age}</p>
                <p><strong>Location:</strong> ${dog.location}</p>

                <button onclick="likeDog('${dog.name}')">❤️ Like</button>
                <button onclick="passDog('${dog.name}')">❌ Pass</button>

            </div>
        `;
    });
}

displayDogs(dogs);

breedFilter.addEventListener("change", function() {

    const selectedBreed = breedFilter.value;

    if (selectedBreed === "all") {
        displayDogs(dogs);
        return;
    }

    const filteredDogs = dogs.filter(
        dog => dog.breed === selectedBreed
    );

    displayDogs(filteredDogs);
});

function likeDog(name) {
    alert("You liked " + name + "!");
}

function passDog(name) {
    alert("You passed on " + name + ".");
}