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

function ValidateCPF(sentCPF) {
  Object.defineProperty(this, 'CPFClean', {
    enumerable: true,
    get: function() {
      return sentCPF.replace(/\D+/g, '');
    }
  });
}

ValidateCPF.prototype.validate = function() {
  if (typeof this.CPFClean === 'undefined') return false;
  if (this.CPFClean.length !== 11) return false;
  if (this.isSequence()) return false;
  const CPFPartial = this.CPFClean.slice(0, -2);
  const digit1 = this.createDigit(CPFPartial);
  const digit2 = this.createDigit(CPFPartial + digit1);
  const CPFValidated = CPFPartial + digit1 + digit2;
  return CPFValidated === this.CPFClean;
};

ValidateCPF.prototype.createDigit = function(CPFPartial) {
  const CPFArray = Array.from(CPFPartial);
  let regressive = CPFArray.length + 1;
  const total = CPFArray.reduce((ac, val) => {
    ac += (regressive * Number(val));
    regressive--;
    return ac;
  }, 0);
  const digit = 11 - (total % 11);
  return digit > 9 ? '0' : String(digit);
};

ValidateCPF.prototype.isSequence = function() {
  return this.CPFClean[0].repeat(this.CPFClean.length) === this.CPFClean;
}

const CPF = new ValidateCPF('115.696.489-05');

if (CPF.validate()) {
  console.log('CPF válido!');
} else {
  console.log('CPF inválido!');
}