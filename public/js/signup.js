function togglePassword() {
    const passwordField = document.getElementById('password-signup');
    const toggleButton = document.getElementById('toggle-password');
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      toggleButton.innerText = 'Hide';
    } else {
      passwordField.type = 'password';
        toggleButton.innerText = 'Show';
    }
  }
  
document
  .querySelector(".signup-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;

    try {
      const response = await fetch("api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });
      
      console.log({ email, password, name });
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        const data = await response.json();
        showMessage(data.message || "Sign-up failed", "error");
      }
    } catch (error) {
      showMessage(error.message || "An error occurred", "error");
    }
      
});

  