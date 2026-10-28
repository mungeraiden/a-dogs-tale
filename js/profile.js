const dogForm = document.getElementById("dogForm");
const profileOutput = document.getElementById("profileOutput");

let editingProfile = false;

dogForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const breed = document.getElementById("breed").value;
  const age = document.getElementById("age").value;
  const location = document.getElementById("location").value;
  const bio = document.getElementById("bio").value;

  profileOutput.innerHTML = `
        <div class="card dog-card">
            <h2>🐶 ${name}'s Profile</h2>

            <p><strong>Breed:</strong> ${breed}</p>
            <p><strong>Age:</strong> ${age}</p>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Bio:</strong> ${bio}</p>

            <button type="button" id="editProfile">Edit Profile</button>
        </div>
    `;

  dogForm.reset();

  if (editingProfile) {
    editingProfile = false;
    dogForm.querySelector('button[type="submit"]').textContent =
      "Create Profile";
  }
});

profileOutput.addEventListener("click", function (event) {
  if (event.target.id === "editProfile") {
    const profile = event.target.parentElement;

    const name = profile
      .querySelector("h2")
      .textContent.replace("🐶 ", "")
      .replace("'s Profile", "");

    const breed = profile
      .querySelectorAll("p")[0]
      .textContent.replace("Breed:", "")
      .trim();

    const age = profile
      .querySelectorAll("p")[1]
      .textContent.replace("Age:", "")
      .trim();

    const location = profile
      .querySelectorAll("p")[2]
      .textContent.replace("Location:", "")
      .trim();

    const bio = profile
      .querySelectorAll("p")[3]
      .textContent.replace("Bio:", "")
      .trim();

    document.getElementById("name").value = name;
    document.getElementById("breed").value = breed;
    document.getElementById("age").value = age;
    document.getElementById("location").value = location;
    document.getElementById("bio").value = bio;

    dogForm.querySelector('button[type="submit"]').textContent = "Save Changes";

    editingProfile = true;

    dogForm.scrollIntoView({ behavior: "smooth" });
  }
});
