// form to json
const formToJSON = elements => [].reduce.call(elements, (data, element) => {
  if (element.name) {
    data[element.name] = element.value;
  }

  return data;
}, {});

// Toggle password visibility
document.querySelector('#btn-show-password').addEventListener('click', e => {
  const passwordInput = document.querySelector('#password');
  passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
});

// Validate user form
document.querySelector('#user-form').addEventListener('submit', e => {
  const form = e.target;
  const formType = e.target.getAttribute('data-form');
  const formData = formToJSON(form.elements);
  const userId = document.querySelector('#user-id').value;
  const method = formType === 'add' ? 'post' : 'put';
  const url = formType === 'add'
    ? `http://localhost:9000/user/create`
    : `http://localhost:9000/user/update/${userId}`;

  e.preventDefault();

  if (form.checkValidity() === true) {
    setLoadingBtn('#submit-btn');

    axios[method](url, formData)
      .then(res => {
        if (res.data.stmt.changes > 0) {
          location.href = '/account/dashboard';
        } else {
          // show flash error message
        }
      })
      .catch(err => {
        console.log(err);
        // show flash error message
      });    
  }

  form.classList.add('was-validated');
});

// Delete User
Array.prototype.forEach.call(document.querySelectorAll('.delete-btn'), btn => {
  btn.addEventListener('click', e => {
    const userId = e.target.getAttribute('data-user-id');

    // POST to /user/delete/:id
  });
})