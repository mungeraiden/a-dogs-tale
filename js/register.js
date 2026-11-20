const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");

registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        registerMessage.textContent = "Passwords do not match.";
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (!response.ok) {
            registerMessage.textContent = result.message;
            return;
        }

        registerMessage.textContent = "Account created! Redirecting to login...";

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);

    } catch (error) {
        registerMessage.textContent = "Unable to connect to the server.";
        console.error(error);
    }
});