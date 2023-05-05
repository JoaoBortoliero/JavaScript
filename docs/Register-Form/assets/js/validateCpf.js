// 063.018.959-59
/*
0x 6x 3x 0x 1x 8x 9x 5x 9x
10 9  8  7  6  5  4  3  2   
0  54 24 0  6  40 36 15 18 = 193

11 - (193 % 11) = 5

0x 6x 3x 0x 1x 8x 9x 5x 9x 5x
11 10 9  8  7  6  5  4  3  2
0  60 27 0  7  48 45 20 27 10 = 244

11 - (244 % 11) = 9
*/

class ValidateCPF {
  constructor(sentCPF ) {
    Object.defineProperty(this, 'cleanCPF', {
      writable: true,
      enumerable: true,
      configurable: true,
      value: sentCPF.replace(/\D+/g, '')
    });
  }

  isSequence() {
    return this.cleanCPF.charAt(0).repeat(11) === this.cleanCPF;
  }

  newCPF () {
    const CPFnoDigits = this.cleanCPF.slice(0, -2);
    const digit1 = ValidateCPF.generateDigit(CPFnoDigits);
    const digit2 = ValidateCPF.generateDigit(CPFnoDigits + digit1);
    this.newCPF = CPFnoDigits + digit1 + digit2;
  }

  static generateDigit(CPFnoDigits) {
    let total = 0;
    let reverse = CPFnoDigits.length + 1;

    for (const numericalString of CPFnoDigits) {
      total += reverse * Number(numericalString);
      reverse --;
    }

    const digit = 11 - (total % 11);
    return digit <= 9 ? String(digit) : '0';
  }

  validate() {
    if(!this.cleanCPF) return false;
    if(typeof this.cleanCPF !== 'string') return false;
    if(this.cleanCPF.length !== 11) return false;
    if(this.isSequence()) return false;
    this.newCPF();

    return this.newCPF === this.cleanCPF;
  }
}

// let validateCPF = new ValidateCPF('063.018.959-59');
// if (validateCPF.validate()) {
//   console.log('CPF válido');
// } else {
//   console.log('CPF válido');
// } 