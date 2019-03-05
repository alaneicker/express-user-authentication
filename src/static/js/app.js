const setLoadingBtn = (id) => {
  const btn = document.querySelector(id);
  btn.setAttribute('disabled', true);
  btn.innerHTML = `
    <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> ${btn.innerText}
  `;
};

const unsetLoadingButton = (id) => {
  const btn = document.querySelector(id);
  btn.removeAttribute('disabled');
  btn.innerHTML =  btn.innerText;
}

const setMessaging = (type, message) => {
  const messageContainer = document.querySelector('#messaging');

  const classes = {
    success: 'alert-success',
    error: 'alert-danger',
    warning: 'alert-warning',
    info: 'alert-info',
  };

  messageContainer.innerHTML = `
    <div id="messaging" class="alert ${classes[type]}" role="alert">
      ${message}
    </div>
  `;
}