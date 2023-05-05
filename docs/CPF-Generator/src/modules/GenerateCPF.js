import ValidateCPF from "./ValidateCPF";

export default class GenerateCPF {
  rand(min = 100000000, max = 999999999) {
    return String(Math.floor(Math.random() * (max - min) + min));
  }

  formatted(cpf) {
    return (
      cpf.slice(0, 3) + '.' +
      cpf.slice(3, 6) + '.' +
      cpf.slice(6, 9) + '-' +
      cpf.slice(9, 11)
    );
  }

  generatedNewCPF() {
    const CPFNoDigit = this.rand();
    const digit1 = ValidateCPF.generateDigit(CPFNoDigit);
    const digit2 = ValidateCPF.generateDigit(CPFNoDigit + digit1);
    const newCPF = CPFNoDigit + digit1 + digit2;
    return this.formatted(newCPF);
  }
}