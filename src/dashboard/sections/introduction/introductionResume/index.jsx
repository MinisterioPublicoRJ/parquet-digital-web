import React from 'react';

import '../styles.css';

function IntroductionResume({ onToggle }) {
  // return (
  //   <div className="introduction-wrapper">
  //     <div className="introduction-resume">
  //       <h3>Resumo do dia</h3>
  //       <p>
  //         Espaço do painel que você encontra todo o movimento dos processos da sua Promotoria.
  //         Separados em Vistas Abertas, PIC, Inquéritos, AISP e sinalizamos também a quantidade de
  //         finalizados nos últimos 30 dias.
  //       </p>
  //       <p>
  //         Logo abaixo é possível ainda filtrar as vistas pela vida do processo na sua mesa.Por
  //         último a lista dos processos propriamente dita.
  //       </p>
  //     </div>
  //     <div className="btns-introduction">
  //       <button type="button" aria-label="Fechar" onClick={onToggle} className="btn-leave">
  //         Sair
  //       </button>
  //       <button type="button" className="btn-introduction-next">
  //         Próximo
  //       </button>
  //     </div>
  //   </div>
  // );
  return (
    <>
      <h3>Resumo do dia</h3>
      <p>
        Espaço do painel que você encontra todo o movimento dos processos da sua Promotoria.
        Separados em Vistas Abertas, PIC, Inquéritos, AISP e sinalizamos também a quantidade de
        finalizados nos últimos 30 dias.
      </p>
      <p>
        Logo abaixo é possível ainda filtrar as vistas pela vida do processo na sua mesa.Por último
        a lista dos processos propriamente dita.
      </p>
    </>
  );
}
export default IntroductionResume;
