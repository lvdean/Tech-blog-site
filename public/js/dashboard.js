console.log('dashboard.js loaded');
const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#project-title').value.trim();
    const content = document.querySelector('#project-desc').value.trim();
  
    if (title && content) {
      const response = await fetch(`/api/blogs`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create project');
      }
    }
  };
  
  
  document
    .querySelector('.new-project-form')
    .addEventListener('submit', newFormHandler);
  
