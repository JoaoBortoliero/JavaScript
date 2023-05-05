const rand = (min, max) => Math.floor(Math.random() * (max - min) + min);
const maiuscula = () => String.fromCharCode(rand(65, 91));
const minuscula = () => String.fromCharCode(rand(97, 123));
const numero = () => String.fromCharCode(rand(48, 58));
const simbolos = 'Ç,.;/?}^{[+~ç!@]#$%&*()_=|';
const geraSimbolo = () => simbolos[rand(0, simbolos.length)];

export default function geraSenha(qtd, maiusculas, minusculas, numeros, simbolos) {
  const senha = [];
  qtd = Number(qtd);

  for(let i = 0 ; i < qtd; i++) {
    maiusculas && senha.push(maiuscula());
    minusculas && senha.push(minuscula());
    numeros && senha.push(numero());
    simbolos && senha.push(geraSimbolo());
  }

  return senha.join('').slice(0, qtd)
}