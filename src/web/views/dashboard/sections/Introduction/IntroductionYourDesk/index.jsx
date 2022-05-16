import React from 'react';
import {introductionWrapper} from '../introduction.module.css';

function IntroductionYourDesk() {
  return (
    <div className={introductionWrapper}>
      <h3>Sua mesa</h3>
      <p>
        Aqui você encontra o movimento dos processos da sua Promotoria. Os quadrados brancos são
        botões clicáveis, onde você pode verificar informações diferentes, como detalhamentos de
        investigações e processos judiciais, além de comparativos com outras promotorias que
        trabalham acervos similares. O botão verde, não clicável, traz a quantidade de documentos
        finalizados nos últimos 30 dias.
      </p>
      <p>
        Logo abaixo, é possível ainda filtrar as vistas pelo tempo de abertura da vista do processo
        na sua mesa e, por último, eu te trago a lista dos procedimentos com vista aberta e
        informações complementares.
      </p>
    </div>
  );
}
export default IntroductionYourDesk;
