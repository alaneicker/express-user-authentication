const setLoadingBtn = (id, text) => {
  const btn = document.querySelector(id);
  btn.setAttribute('disabled', true);
  btn.innerHTML = `
    <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> ${text}
  `;
};

const unsetLoadingButton = (id, text) => {
  const btn = document.querySelector(id);
  btn.removeAttribute('disabled');
  btn.innerHTML = text;
}