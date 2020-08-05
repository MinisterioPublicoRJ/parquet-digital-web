import React from 'react';

import '../styles.css';

function IntroductionPerfomanceRadar({ onToggle }) {
  return (
    <div className="introduction-wrapper">
      <div className="introduction-resume">
        <h3>Radar De Perfomance</h3>
        <p>
          Neste gráfico estamos analisando o perfil da sua Promotoria e geramos para você uma
          identidade que é possível a partir de agora, como base em evidências, ser comparada com o
          perfil do MP.
        </p>
        <p>
          Será possível entender também como a sua Promotoria se coloca diante das Promotorias
          colegas de mesmas atribuição. É super simples e tentamos trazer para você uma visualização
          lúdica da sua atuação. Para saber mais sobre os termos e cálculos utilizados para compor
          estar visualização disponibilizamos uma explicação detalhada de cada item no Glossário.
        </p>
        <p>
          Para saber mais sobre os termos e cálculos utilizados para compor estar visualização
          disponibilizamos uma explicação detalhada de cada item no Glossário.
        </p>
        <div className="btns-introduction">
          <button type="button" aria-label="Fechar" onClick={onToggle} className="btn-leave">
            Sair
          </button>
          <button type="button" className="btn-introduction-preavious">
            Anterior
          </button>
          <button type="button" className="btn-introduction-next">
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}
export default IntroductionPerfomanceRadar;
