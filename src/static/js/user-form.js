const formToJSON = elements => [].reduce.call(elements, (data, element) => {
  if (element.name) {
    data[element.name] = element.value;
  }

  return data;
}, {});

togglePassword = e => {
  const passwordInput = document.querySelector('#password');
  passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
};

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
          location.href = '/account/dashboard?update=success';
        } else {
          setMessaging('error', 'Error saving user.');
        }
      })
      .catch(err => {
        console.log(err);
        setMessaging('error', 'Error saving user.');
      });    
  }

  form.classList.add('was-validated');
});