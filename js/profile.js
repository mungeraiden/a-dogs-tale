const dogForm = document.getElementById('dogForm');
const profileOutput = document.getElementById('profileOutput');

dogForm.addEventListener('submit', function(event) {
    
    event.preventDefault();

    const name = document.getElementById('name').value;
    const breed = document.getElementById('breed').value;
    const age = document.getElementById('age').value;
    const location = document.getElementById('location').value;
    const bio = document.getElementById('bio').value;

    profileOutput.innerHTML = `
        <h2>${name}'s Profile</h2>
        <p><strong>Breed:</strong> ${breed}</p>
        <p><strong>Age:</strong> ${age}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Bio:</strong> ${bio}</p>
    `;
});