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
          O Parquet Digital é uma ferramenta que visa proporcionar uma visão ampla do acervo de cada
          Promotoria de Justiça, bem como informações sobre movimentações, seja do acervo judicial
          ou extrajudicial, prescrições e outros alertas que ajudam na atividade final do(a)
          Promotor(a).
        </p>
        <p>
          Importante destacar que <span className={highlighted}>o Parquet Digital traz dados do sistema Módulo Gestão de Processos
          (MGP), mas não é um espelho integral do sistema, já que contém regras de negócio e modelos
          estatísticos de contagem que podem se diferenciar dos relatórios emitidos pelo MGP.</span>
        </p>
        <p>
          Tanto no manual de uso, quanto na nota metodológica do Parquet Digital, podem ser
          consultados os códigos dos documentos e as classificações utilizadas do MGP para a
          disposição dos números apresentados na ferramenta. Sugerimos, em caso de dúvidas, recorrer
          ao manual de uso. Caso as dúvidas persistam, elas também podem ser sanadas por meio do
          email <strong>gadg.atendimento@mprj.mp.br</strong>
        </p>
        <p>
          <strong>Boa navegação!</strong>
        </p>
      </div>
    </div>
  );
}

export default Introduction;
