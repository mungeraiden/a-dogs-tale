const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (!response.ok) {
            loginMessage.textContent = result.message || "Login failed.";
            return;
        }

        localStorage.setItem("token", result.token);

        loginMessage.textContent = "Login successful!";

        window.location.href = "browse.html";

    } catch (error) {
        loginMessage.textContent = "Unable to connect to the server.";
        console.error(error);
    }
});