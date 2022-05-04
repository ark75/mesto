function enableValidation(args) {
  const form = document.querySelector(args.formSelector);
  const inputs = form.querySelectorAll(args.inputSelector);

  inputs.forEach(element => {
    element.addEventListener('input', (event) => handleFormInput(event, form, args));
  })

  form.addEventListener('submit', (event) => handleFormSubmit(event, form));
  toggleButton(form, args);
}

function toggleButton(form, config) {
  const button = form.querySelector(config.buttonSelector);
  button.disabled = !form.checkValidity();
  button.classList.toggle('popup__button_disabled', !form.checkValidity());
}

function handleFormSubmit(event) {
  event.preventDefault();
}

function handleFormInput(evt, form, config) {
  const input = evt.target;
  const errorNode = document.querySelector(`#${input.id}-error`);

  if (input.validity.valid) {
    errorNode.textContent = '';
  } else {
    errorNode.textContent = input.validationMessage;
  }
  toggleButton(form, config);
}
