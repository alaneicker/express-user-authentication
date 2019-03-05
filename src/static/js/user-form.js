class UserForm {
  constructor() {
    this.bindEventListeners();
  }
  bindEventListeners() {
    document.querySelector('#user-form').addEventListener(
      'submit', 
      this.submitUserForm
    );
    document.querySelector('[data-toggle-password]').addEventListener(
      'click', 
      this.togglePassword
    );
  }
  togglePassword(e) {
    const input = document.querySelector(e.currentTarget.getAttribute('data-toggle-password'));
    input.type = input.type === 'password' ? 'text' : 'password';
  }
  submitUserForm(e) {
    const form = e.target;
    const formType = e.target.getAttribute('data-form');
    const formData = UserForm.formToJSON(form.elements);
    const userId = document.querySelector('#user-id').value;
    const method = formType === 'add' ? 'post' : 'put';
    const url = formType === 'add' ? `/user/create` : `/user/update/${userId}`;

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
  }
  static formToJSON(elements) {
    return [].reduce.call(elements, (data, element) => {
      if (element.name) {
        data[element.name] = element.value;
      }
      return data;
    }, {});
  }
}