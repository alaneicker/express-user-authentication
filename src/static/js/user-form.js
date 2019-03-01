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

// Edit / Delete User
const actionBtn = document.querySelectorAll('.action-btn');

Array.prototype.forEach.call(actionBtn, btn => {
  btn.addEventListener('click', e => {
    const userId = e.target.getAttribute('data-user-id');
    const action = e.target.getAttribute('data-action');

    if (action === 'edit') {
      // Show edit user modal
    }

    if (action === 'delete') {
      // Show delete user modal
    }
  });
})