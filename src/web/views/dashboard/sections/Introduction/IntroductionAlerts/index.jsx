import React from 'react';
import {introductionWrapper} from '../introduction.module.css';
 
function IntroductionAlerts() {
  return (
    <div className={introductionWrapper}>
      <h3>Alertas</h3>
      <p>
        Na área da Central de Alertas eu tento te ajudar a gerenciar seu acervo, indicando quais
        procedimentos podem exigir uma atenção mais imediata, seja porque tem algum problema de
        acordo com os avisos no banco de dados, ou porque se referem a algum fato externo que me
        chamou a atenção.
      </p>
      <p>
        Importante: aqui, alguns alertas são interativos e vão te dar opções diferentes de curso de
        ação. Em alguns casos, eu até minuto a peça de resolução do problema para adiantar o
        trabalho da Promotoria, basta você pedir.
      </p>
    </div>
  );
}
export default IntroductionAlerts;
