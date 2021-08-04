
import React from 'react';
import { Link } from 'react-router-dom';
import Analise from '../../../assets/gifs/analise.gif';
import {
    wrapperWelcome,
    bannerWelcome,
    welcomeTexts,
    allBtns,
    btnPrevious,
    btnStart
  } from './WelcomePages.module.css';

const PerformanceAnalysis = () => {
  return (
    <div className={wrapperWelcome}>
      <div className={bannerWelcome}>
        <img height="100%" src={Analise} alt="trabalho-promoton" />
      </div>
      <div className={welcomeTexts}>
        <h2>Análise da Atuação</h2>
        <p>
          Por meio de uma visualização saudável o robô apresenta processos analíticos e métodos
          estatísticos de performance entre órgãos de mesma atuação, estabelecendo índices e
          métricas importantes.
        </p>
      </div>
      <div className={allBtns}>
        <Link to="./home">
          <button type="button" className={btnPrevious}>
            anterior
          </button>
        </Link>
        <div className="btns">
          <Link to="./dashboard">
            <button type="button" className={btnStart}>
              pular
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalysis;
