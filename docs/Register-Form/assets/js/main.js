class ValidateForm {
  constructor() {
    this.form = document.querySelector('.form');
    this.events();
  }

  events() {
    this.form.addEventListener('submit', (e) => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const validFields = this.checkFields();
    const validPassword = this.checkPassword();

    if(this.validFields && this.validPassword) {
      alert('Form sent successfully.');
      this.form.submit();
    }
  }

  checkPassword() {
    let valid = true;

    const password = this.form.querySelector('.password');
    const repeatPassword = this.form.querySelector('.repeat-password');

    if(password.value !== repeatPassword.value) {
      this.setError(password, 'Passwords must be the same.');
      this.setError(repeatPassword, 'Passwords must be the same.');
    }

    if(password.value.length < 6 || password.value.length > 12) {
      valid = false;
      this.setError(password, 'Password must contain between 6 and 12 characters.')
    }

    return valid;
  }

  checkFields() {
    let valid = true;

    for(let errorText of this.form.querySelectorAll('.error-text')) {
      errorText.remove();
    }

    for(let field of this.form.querySelectorAll('.validate')) {
      const label = field.previousElementSibling.innerText;
  
      if(!field.value) {
        this.setError(field, `Field "${label}" cannot be empty.`);
        valid = false;
      }

      if(field.classList.contains('cpf')) {
        if(!this.valdiateCPF(field)) valid = false;
      }

      if(field.classList.contains('user')) {
        if(!this.validateUser(field)) valid = false;
      }
    }

    return valid;
  }

  validateUser(field) {
    const user = field.value;
    let valid = true;

    if(user.length < 3 || user.length > 12) {
      this.setError(field, 'User must contain between 3 and 12 characters.');
      valid = false;
    }
    
    if(!user.match(/^[a-zA-Z0-9]+/g)) {
      this.setError(field, 'Username must only contain letters and numbers.');
      valid = false;
    }
    return valid;
  }

  valdiateCPF(field) {
    const cpf = new ValidateCPF(field.value);

    if(!cpf.validate()) {
      this.setError(field, 'Invalid CPF.');
      return false;
    }

    return true;
  }

  setError(field, message) {
    const div = document.createElement('div');
    div.innerHTML = message;
    div.classList.add('error-text');
    field.insertAdjacentElement('afterend', div);
  }
}

const valdiate = new ValidateForm();