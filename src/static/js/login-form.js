class Loginform {
  constructor() {
    this.bindEventListeners();
    this.setSavedLogin();
  }
  bindEventListeners() {
    document.querySelector('#login-form').addEventListener(
      'submit', 
      this.loginUser
    );
  }
  setSavedLogin() {
    const storedUsername = localStorage.getItem('storedUsername');
    const loginForm = document.querySelector('#login-form');

    if (storedUsername) {
      loginForm.querySelector('#username').value = storedUsername;
    }
  }
  loginUser(e) {
    const form = e.target;
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const remember = document.querySelector('#remember');

    e.preventDefault();

    if (form.checkValidity() === true) {

      if (remember.checked === true) {
        localStorage.setItem('storedUsername', username);
      }

      setLoadingBtn('#login-btn');

      axios.post('/user/authenticate', { username, password })
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
  }
}