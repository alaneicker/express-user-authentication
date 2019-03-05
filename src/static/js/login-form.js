const storedUsername = localStorage.getItem('storedUsername');

if (storedUsername) {
  document.querySelector('#username').value = storedUsername;
}

document.querySelector('#login-form').addEventListener('submit', e => {
  const form = document.querySelector('#login-form');
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const remember = document.querySelector('#remember');

  e.preventDefault();

  if (form.checkValidity() === true) {

    if (remember.checked === true) {
      localStorage.setItem('storedUsername', username);
    }

    setLoadingBtn('#login-btn');

    axios.post('http://localhost:9000/user/authenticate', { username, password })
    .then(res => {
      const { auth, token } = res.data;

      if (auth === true) {
        location.href = '/account/dashboard';
      } else {
        unsetLoadingButton('#login-btn');
        setMessaging('error', 'The username or password is invalid')
      }
    })
    .catch(err => {
      console.log(err);
      unsetLoadingButton('#login-btn');
    });
  }

  form.classList.add('was-validated');
});