async function editFormHandler(event) {
  event.preventDefault();

  const post_title = document
    .querySelector('input[name="edit-post-title"]')
    .value.trim();
  const post_content = document
    .querySelector('textarea[name="edit-post-content"]')
    .value.trim();
  const source = document
    .querySelector('input[name="edit-source"]')
    .value.trim();
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      post_title,
      post_content,
      source
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector('.edit-post-form')
  .addEventListener('submit', editFormHandler);
