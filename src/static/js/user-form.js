document.querySelector('#btn-show-password').addEventListener('click', e => {
  const passwordInput = document.querySelector('#password');
  passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
});

document.querySelector('#user-form').addEventListener('submit', e => {
  const form = e.target;
  const formType = e.target.getAttribute('data-form');
  
  e.preventDefault();

  if (form.checkValidity() === true) {
    if (formType === 'add-user' ) {
      setLoadingBtn('#submit-btn', 'Adding user...');
    } else {
      setLoadingBtn('#submit-btn', 'Updating user...');
    }
  }

  form.classList.add('was-validated');
});