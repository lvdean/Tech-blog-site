const newFormHandler = async (event) => {
    event.preventDefault(); // Prevent form refresh

    // Use event.currentTarget to get the form element directly
    const formElement = event.currentTarget; 
    const blogId = formElement.getAttribute("data-id"); // Get the data-id from the form

    const commentTextarea = document.querySelector('#add-comment');
    const comments = commentTextarea.value.trim();

    console.log(`Comment: "${comments}"`); // Debug comment content
    console.log(`Blog ID: ${blogId}`); // Debug blog ID
    if (!blogId) {
        console.error("Blog ID is not found!"); // Log error if blogId is empty
        showMessage("Blog ID is not found."); // Display a user-friendly error
        return; // Exit if blog ID is not found
    }
    if (comments.length === 0) {
        showMessage("Comment cannot be empty.");
        return; // Stop further execution
    }

    const submitButton = document.querySelector('#comment');
    submitButton.disabled = true; // Disable the button during submission

    try {
        const response = await fetch(`/api/blogs/${blogId}/comments`, {
            method: 'POST',
            body: JSON.stringify({ commentText: comments, blog_id: blogId }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            commentTextarea.value = ''; // Clear the textarea
            document.location.replace("/"); // Redirect to homepage
        } else {
            const data = await response.json();
            showMessage(data.message || "Error occurred");
        }
    } catch (error) {
        console.error("Network error:", error);
        showMessage("Failed to submit comment. Please try again.");
    } finally {
        submitButton.disabled = false; // Re-enable button
    }
};

// Attach the event listener to the form element
document
  .querySelector('.comment-input')
  .addEventListener('submit', newFormHandler);
