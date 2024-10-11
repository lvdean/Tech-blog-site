document
  .querySelector(".signin-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    
    fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(function (response) {
        if (response.ok) {
          document.location.replace("/dashboard");
        } else {
          return response.json();
        }
      })
        .then(function (data) {
            showMessage(data.message, "error");
        })
      .catch(function (error) {
        showMessage(error.message, "error");
      });
  });