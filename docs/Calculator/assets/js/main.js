function Calculator() {
  this.display = document.querySelector('.display');

  this.start = () => {
    this.clickButtons();
    this.keyEnter();
  };

  this.clickButtons = () => {
    document.addEventListener('click', (e) => {
      const el = e.target;
      if(el.classList.contains('btn-num')) this.addForDisplay(el.innerText);
      if(el.classList.contains('btn-clear')) this.clearDisplay();
      if(el.classList.contains('btn-del')) this.deleteOne();
      if(el.classList.contains('btn-eq')) this.performAccount();
    })
  };
  
  this.addForDisplay = (value) => {
    this.display.value += value;
    this.display.focus();
  };

  this.performAccount = () => {
    try {
      const account = eval(this.display.value);
      if(Number.isNaN(account) || typeof account !== 'number') {
        alert('Conta inválida!');
        return;
      }
      this.display.value = account;
    } catch (e) {
      alert('Conta inválida');
      this.clearDisplay();
      return;
    }
  };

  this.keyEnter = () => {
    document.addEventListener('keyup', (e) => {
      if(e.keyCode === 13) {
        this.performAccount();
      }
    });
  };
  
  this.clearDisplay = () => this.display.value = '';
  
  this.deleteOne = () => this.display.value = this.display.value.slice(0, -1);
};

const calculator = new Calculator();
calculator.start();