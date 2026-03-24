const form   = document.getElementById("contactForm");
const button = document.querySelector(".send-btn");

/* ── VALIDATION ── */
function validate(id, message) {
  const input = document.getElementById(id);
  const error = input.nextElementSibling;

  if (input.value.trim() === "") {
    error.textContent  = message;
    input.style.borderColor = "var(--red)";
    return false;
  }

  error.textContent       = "";
  input.style.borderColor = "rgba(0,0,0,0.12)";
  return true;
}

function validateEmail(id) {
  const input = document.getElementById(id);
  const error = input.nextElementSibling;

  if (input.value.trim() !== "" && !input.value.includes("@")) {
    error.textContent       = "Please enter a valid email address";
    input.style.borderColor = "var(--red)";
    return false;
  }

  return true;
}

/* ── REAL-TIME RESET ── */
document.querySelectorAll(".input, .message-input").forEach(input => {
  input.addEventListener("input", () => {
    input.style.borderColor = "rgba(0,0,0,0.12)";
    if (input.nextElementSibling) {
      input.nextElementSibling.textContent = "";
    }
  });
});

/* ── SUBMIT ── */
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isValid = [
    validate("fname",   "First name is required"),
    validate("lname",   "Last name is required"),
    validate("email",   "Email is required"),
    validate("phone",   "Phone number is required"),
    validate("cat",     "Please select an inquiry category"),
    validate("org",     "Organization is required"),
    validate("message", "Please leave us a message"),
    validateEmail("email"),
  ].every(Boolean);

  if (isValid) {
    button.disabled     = true;
    button.textContent  = "Sending...";
    sendMail();
  }
});

/* ── SEND EMAIL ── */
function sendMail() {
  const params = {
    name:    document.getElementById("fname").value.trim() + " " + document.getElementById("lname").value.trim(),
    email:   document.getElementById("email").value.trim(),
    phone:   document.getElementById("phone").value.trim(),
    cat:     document.getElementById("cat").value,
    org:     document.getElementById("org").value.trim(),
    message: document.getElementById("message").value.trim(),
  };

  emailjs.send("service_exc592c", "template_fg053rc", params)
    .then(() => {
      showAlert("Your message has been sent. We will be in touch shortly.");
      form.reset();
      button.disabled    = false;
      button.textContent = "Send Message \u00a0→";
    })
    .catch((error) => {
      showAlert("Something went wrong. Please try again or reach us directly.");
      console.error("EmailJS error:", error);
      button.disabled    = false;
      button.textContent = "Send Message \u00a0→";
    });
}

/* ── ALERT ── */
function showAlert(message) {
  document.getElementById("alertMessage").textContent = message;
  document.getElementById("customAlert").style.display = "flex";
}

function closeAlert() {
  document.getElementById("customAlert").style.display = "none";
}