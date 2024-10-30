function showMessage(message, type = 'success') {
  const messageContainer = document.createElement('div');
  messageContainer.className = type === 'error' ? 'error-message' : 'success-message';
  messageContainer.innerText = message;

  document.body.appendChild(messageContainer);

  // Optional: Automatically remove the message after a few seconds
  setTimeout(() => {
      messageContainer.remove();
  }, 3000); // Adjust the timeout duration as needed
}

//sign in
document
  .querySelector(".signin-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
  
 try{
    const response = await fetch("/api/users/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
        if (response.ok) {
          document.location.replace("/dashboard");
        } else {
          const data = await response.json();
          showMessage(data.message || "Sign-in failed", "error");
        }
      } catch (error) {
        showMessage(error.message || "An error occurred", "error");
      }
        
  });

  // sign up 

  document
  .querySelector(".signup-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });
console.log(response)
      if (response.ok) {
        showMessage("Sign-up successful! Redirecting...", "success");
        setTimeout(() => document.location.replace("/"), 1000); // Optional: Small delay for user feedback
      } else {
        const data = await response.json();
        showMessage(data.message || "Sign-up failed", "error");
      }
    } catch (error) {
      showMessage(error.message || "An error occurred", "error");
    }
  });


// const loginFormHandler = async (event) => {
//   event.preventDefault();

//   // Collect values from the login form
//   const email = document.querySelector('#email-login').value.trim();
//   const password = document.querySelector('#password-login').value.trim();

//   if (email && password) {
//     // Send a POST request to the API endpoint
//     const response = await fetch('/api/users/signin', {
//       method: 'POST',
//       body: JSON.stringify({ email, password }),
//       headers: { 'Content-Type': 'application/json' },
//     });

//     if (response.ok) {
//       // If successful, redirect the browser to the profile page
//       document.location.replace('/dashboard');
//     } else {
//       alert(response.statusText);
//     }
//   }
// };

// const signupFormHandler = async (event) => {
//   event.preventDefault();

//   const name = document.querySelector('#name-signup').value.trim();
//   const email = document.querySelector('#email-signup').value.trim();
//   const password = document.querySelector('#password-signup').value.trim();

//   if (name && email && password) {
//     const response = await fetch('/api/users', {
//       method: 'POST',
//       body: JSON.stringify({ name, email, password }),
//       headers: { 'Content-Type': 'application/json' },
//     });

//     if (response.ok) {
//       document.location.replace('/profile');
//     } else {
//       alert(response.statusText);
//     }
//   }
// };

// document
//   .querySelector('.login-form')
//   .addEventListener('submit', loginFormHandler);

// document
//   .querySelector('.signup-form')
//   .addEventListener('submit', signupFormHandler);

  // Assume you have a function to check if the user is logged in
  const isLoggedIn = () => {
      // Implement your logic to check if the user is logged in
      return Boolean(localStorage.getItem('user')); // Example using local storage
  };

  document.querySelectorAll('.blog-link').forEach(link => {
      link.addEventListener('click', function(event) {
          event.preventDefault(); // Prevent the default anchor behavior
          const blogId = this.getAttribute('data-id'); // Get the blog ID
          
          if (isLoggedIn()) {
              window.location.href = `/comment/${blogId}`; // Redirect to comment page
          } else {
              window.location.href = '/signin'; // Redirect to login page
          }
      });
  });
