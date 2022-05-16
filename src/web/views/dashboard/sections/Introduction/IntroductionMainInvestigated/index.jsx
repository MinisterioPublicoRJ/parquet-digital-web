import React from 'react';
import {introductionWrapper} from '../introduction.module.css';

function IntroductionMainInvestigated() {
  return (
    <div className={introductionWrapper}>
      <h3>Principais investigados</h3>
      <p>
        A lista de principais investigados te traz quais, dentre os seus investigados, têm maior
        histórico de procedimentos no MPRJ. Isso pode lhe ajudar a identificar se algum fato similar
        já foi investigado e por quem, de modo a facilitar a descoberta de informações relevantes
        para a resolução do caso. Se você quiser dar maior atenção a um investigado, você pode
        escolher e pinçar, deixando-o sempre no topo da lista. Para desativar, basta clicar
        novamente no alfinete. Já se o que você quer é não ver mais um nome, basta apertar na
        lixeira e deletar, assim ele some da lista.
      </p>
    </div>
  );
}
export default IntroductionMainInvestigated;
