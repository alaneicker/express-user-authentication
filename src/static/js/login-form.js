const storedUsername = localStorage.getItem('storedUsername');

if (storedUsername) {
  document.querySelector('#username').value = storedUsername;
}

document.querySelector('#login-form').addEventListener('submit', e => {
  const form = e.target;
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const remember = document.querySelector('#remember');

  e.preventDefault();

  if (form.checkValidity() === true) {

    if (remember.checked === true) {
      localStorage.setItem('storedUsername', username);
    }

    setLoadingBtn('#login-btn', 'Logging In...');

    axios.post('http://localhost:9000/user/authenticate', { username, password })
    .then(res => {
      const { auth, token } = res.data;

      if (auth === true) {
        location.href = '/account/dashboard';
      } else {
        unsetLoadingButton('#login-btn', 'Log In');
        document.querySelector('#auth-error').classList.remove('d-none');
      }
    })
    .catch(err => {
      console.log(err);
      unsetLoadingButton('#login-btn', 'Log In');
    });
  }

  form.classList.add('was-validated');
});