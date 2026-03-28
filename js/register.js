document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirm = document.getElementById("confirmPassword").value;
    let phone = document.getElementById("phone").value;
    let message = document.getElementById("message");

    let emailRegex = /^[^@]+@[^@]+\.[a-z]{2,}$/i;
    if (!emailRegex.test(email)) {
        message.textContent = "❌ Email invalide !";
        message.style.color = "red";
        return;
    }

    let phoneRegex = /^[0-9]{8}$/;
    if (phone !== "" && !phoneRegex.test(phone)) {
        message.textContent = "❌ Numéro de téléphone invalide !";
        message.style.color = "red";
        return;
    }

    let passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!passRegex.test(password)) {
        message.textContent = "❌ Le mot de passe doit contenir : 8 caractères, une majuscule, un chiffre et un symbole.";
        message.style.color = "red";
        return;
    }

    if (password !== confirm) {
        message.textContent = "❌ Les mots de passe ne correspondent pas.";
        message.style.color = "red";
        return;
    }

    message.textContent = "✔ Inscription réussie !";
    message.style.color = "green";
});
