import React from 'react';
import introductionWrapper from '../introduction.module.css';

function IntroductionProcessList() {
  return (
    <div className={introductionWrapper}>
      <h3>Lista de Processos</h3>
      <p>
        Nesta área o objetivo é te ajudar a lembrar o que aconteceu com os processos que estão no
        Judiciário, sem vista aberta recentemente. Além de te dar o número MPRJ do procedimento e o
        número externo, do CNJ, eu listo o último andamento dentro do MPRJ e os personagens do caso
        para te ajudar a lembrar do que se trata e poder pedir vista, se for o caso.
      </p>
    </div>
  );
}
export default IntroductionProcessList;
