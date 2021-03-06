async function newFormHandler(event) {
  event.preventDefault();

  const post_title = document
    .querySelector('input[name="new-post-title"]')
    .value.trim();
  const post_content = document
    .querySelector('textarea[name="new-post-body"]')
    .value.trim();
  // const source = document.querySelector('input[name="source"]').value.trim();

  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      post_title,
      post_content
      // source
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);
