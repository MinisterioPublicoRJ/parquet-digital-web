import React from 'react';
import PromotronIntroduction from '../../../../assets/gifs/chat.gif';

import {
  introOuter,
  introductionTexts,
  introductionIntro,
  promotronIcon,
  introductionInfo,
  introductionSubtitle,
  highlighted
} from './introduction.module.css';

function Introduction() {
  return (
    <div className={introOuter}>
      <div className={introductionIntro}>
        <div className={introductionTexts}>
          <span>Informações importantes</span>
          <h2>PARQUET DIGITAL</h2>
          <p className={introductionSubtitle}>
            O que esperar da ferramenta ? O que ela pode entregar que outras ferramentas não
            entregam ? Algumas das respostas você encontra aqui
          </p>
        </div>
        <div className={promotronIcon}>
          <img src={PromotronIntroduction} alt="robô-promoton" />
        </div>
      </div>
      <div className={introductionInfo}>
        <p>
          O Parquet Digital é uma ferramenta que visa proporcionar uma visão ampla do acervo de cada Promotoria de Justiça. A ferramenta apresenta informações sobre as vistas abertas, movimentações do acervo judicial ou extrajudicial e outras análises que auxiliem na atividade fim do(a) Promotor(a), como alertas sobre prescrições e outros pontos de atenção.
        </p>
        <p>
          Importante destacar que o <span className={highlighted}>Parquet Digital utiliza dados do sistema Módulo 
          Gestão de Processos (MGP/MPRJ), mas não é um espelho dos relatórios gerados por esse sistema, uma vez que
          contém regras de negócio e modelos estatísticos de contagem que podem se diferenciar dos relatórios extraídos do MGP.
          </span>
        </p>
        <p>
        Em caso de dúvidas, foi disponibilizada na ferramenta um Manual de uso que trata das potencialidades do Parquet Digital; bem como uma Nota Metodológica, na qual podem ser consultados os códigos dos documentos e as principais classificações utilizadas do MGP para a disposição dos números apresentados. Caso as dúvidas persistam, elas também podem ser encaminhadas para a equipe técnica por meio do email
        <strong> gadg.atendimento@mprj.mp.br</strong>
        </p>
        <p>
          <strong>Boa navegação!</strong>
        </p>
      </div>
    </div>
  );
}

export default Introduction;
