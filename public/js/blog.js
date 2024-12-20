
console.log('deleting')
// delete blog posts
// document.addEventListener('DOMContentLoaded', () => {

const projectList = document.querySelector('.delete-btn');
if (projectList) {
  projectList.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.target.classList.contains('btn-danger')) {
      const id = event.target.getAttribute('data-id');
      try {
        const response = await fetch(`/api/blogs/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          console.log('Delete successful');
          document.location.replace('/dashboard');
        } else {
          alert('Failed to delete project');
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    }
  });
}
// });

// update blogs
const updateFormHandler = async (event) => {
  event.preventDefault();
  event.stopPropagation();

  const title = document.querySelector('#project-title').value.trim();
  const content = document.querySelector('#project-desc').value.trim();
  const id = event.target.getAttribute('data-id');

  if (title && content) {
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response)
    if (response.ok) {
      console.log('Update successful');
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update blog');
    }
  }
};


document
  .querySelector('#update')
  .addEventListener('click', updateFormHandler);
