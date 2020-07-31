import React from 'react';

import './styles.css';
import '../styles.css';

function IntroductionResume() {
  return (
    <div className="introduction-wrapper">
      <div className="introduction-resume">
        <h3>Resumo do dia</h3>
        <p>Aqui você verá as atualizações do dia na sua Promotoria, trazemos várias informações baseado em uma rotina de atualização do robô. Ele busca o desempenho do trabalho realizado nos últimos 30 dias bem como verifica o volume de entrada de processos e traz uma classificação baseado nesta frequência.</p>
      </div>
      <div className="btns-introduction">
        <button className="btn-leave">Sair</button>
        <button className="btn-introduction-next">Próximo</button>
      </div>
    </div>
  );
}
export default IntroductionResume;
