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