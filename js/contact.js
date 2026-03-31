const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");

function setError(input, message) {
  const formGroup = input.parentElement;
  const errorElement = formGroup.querySelector(".error-message");
  errorElement.textContent = message;
  input.classList.add("input-error");
}

function clearError(input) {
  const formGroup = input.parentElement;
  const errorElement = formGroup.querySelector(".error-message");
  errorElement.textContent = "";
  input.classList.remove("input-error");
}

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email.trim());
}

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;
  formSuccess.textContent = "";

  // Clear old errors
  [nameInput, emailInput, subjectInput, messageInput].forEach(clearError);

  // Name
  if (nameInput.value.trim() === "") {
    setError(nameInput, "Veuillez entrer votre nom complet.");
    isValid = false;
  }

  // Email
  if (emailInput.value.trim() === "") {
    setError(emailInput, "Veuillez entrer votre adresse email.");
    isValid = false;
  } else if (!isValidEmail(emailInput.value)) {
    setError(emailInput, "Veuillez entrer une adresse email valide.");
    isValid = false;
  }

  // Subject
  if (subjectInput.value.trim() === "") {
    setError(subjectInput, "Veuillez entrer un sujet.");
    isValid = false;
  }

  // Message
  if (messageInput.value.trim() === "") {
    setError(messageInput, "Veuillez écrire votre message.");
    isValid = false;
  } else if (messageInput.value.trim().length < 10) {
    setError(messageInput, "Le message doit contenir au moins 10 caractères.");
    isValid = false;
  }

  if (isValid) {
    formSuccess.textContent = "Votre message a été envoyé avec succès !";
    contactForm.reset();
  }
});