import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Gestao from '../../../../assets/gifs/trabalho.gif';
import Entendimento from '../../../../assets/gifs/chat.gif';
import Celeridade from '../../../../assets/gifs/run.gif';
import Analise from '../../../../assets/gifs/analise.gif';
import {
  welcomeWrapper,
  welcomeTitle,
  welcomeDescription,
  welcomeTextAndButtons,
  welcomeButtonsNormal,
  welcomePreviousButton,
  welcomeNextButton,
  welcomeSkipButton,
  welcomeStartButton,
} from './Welcome.module.css';

export default function Welcome() {
  const [curPage, setCurPage] = useState(0);

  useEffect(onMount, [curPage]);
  function onMount() {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  };

  function onKeyDown({key}) {
    if (key === "ArrowRight" && curPage<4) setCurPage(curPage+1);
    if (key === "ArrowLeft" && curPage>0) setCurPage(curPage-1);
    if (key === "Escape") setCurPage(4);
    if (key ==="Enter" && curPage === 3) setCurPage(4);
  }

  const imgNames = [Gestao, Entendimento, Celeridade, Analise]
  const titles = ["Gestão Turbinada", "Entendimento e Clareza", "Celeridade nos Processos", "Análise da Atuação"]
  // Using \n and 'white-space: pre-wrap;' to keep original text formatting while using variables
  const descriptions = [
    "Afim de subsidiar o máximo desempenho da sua Promotoria e facilitar o seu trabalho,\no robô fornece uma ajuda estratégica na observação e gestão do seu acervo e\nresolução dos seus processos.",
    "O robô auxilia o melhor entendimento da rotina de trabalho da Promotoria e otimiza\na visualização das demandas com base em alertas, indicativos, metas e\nacompanhamento funcional.",
    "O robô das promotorias tem como missão ajudar o trabalho do Promotor, tornando\nsua atuação ainda mais célere e capaz de atingir o maior impacto possível.",
    "Por meio de uma visualização saudável o robô apresenta processos analíticos e\nmétodos estatísticos de performance entre órgãos de mesma atuação, estabelecendo\níndices e métricas importantes."
  ]

  function handleClick(val) {
    if(val === 'forw') setCurPage(curPage+1);
    else if(val === 'prev') setCurPage(curPage-1);
    else if(val === 'dash') setCurPage(4);
  }

  return (
    <div className={welcomeWrapper}>
      {curPage===4 ? <Redirect to="/dashboard" />: null}
      <img height="100%" src={imgNames[curPage]} alt="trabalho-promoton" />
      <div className={welcomeTextAndButtons}>
        <h2 className={welcomeTitle}>{titles[curPage]}</h2>
        <p className={welcomeDescription}>{descriptions[curPage]}</p>
        <div className={welcomeButtonsNormal}>
          {curPage!==0 ? <button className={welcomePreviousButton} type='button' onClick={() => handleClick('prev')}>anterior</button> : null}
          {curPage===3 ? <button className={welcomeStartButton} type='button' onClick={() => handleClick('dash')}>iniciar</button> : null}
          {curPage!==3 ? <button className={welcomeNextButton} type='button' onClick={() => handleClick('forw')}>próximo</button> : null}
          {curPage!==3 ? <button className={welcomeSkipButton} type='button' onClick={() => handleClick('dash')}>pular</button> : null}
        </div>
       </div>
    </div>
  );
}