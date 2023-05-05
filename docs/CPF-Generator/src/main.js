import GenerateCPF from './modules/GenerateCPF';

import './assets/style/style.css';

(function() {
  const generate = new GenerateCPF();
  const CPFGenerated = document.querySelector('.cpf-generated');
  CPFGenerated.innerHTML = generate.generatedNewCPF();
})();