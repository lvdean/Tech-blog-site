document
  .querySelector(".signup-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;

    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .then(function (response) {
        if (response.ok) {
          console.log("success");
          document.location.replace("/signin");
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