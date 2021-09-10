import React from 'react';
import Analise from '../../../assets/gifs/analise.gif';
import {Nav, createPath} from './Nav.jsx';
import {
    wrapperWelcome,
    bannerWelcome,
    welcomeTexts,
    paBtns,
    btnPrevious,
    btnStart, 
    prevDiv,
    alignmentWrapper
  } from './WelcomePages.module.css';

const Atuacao = ({history}) => {
  Nav(history, 4);

  return (
    <div className={alignmentWrapper}>
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
      <div className={paBtns}>
        <div className={prevDiv}>
          <a className={btnPrevious} onClick={()=>createPath(3, history)}>
            anterior
          </a>
        </div>
        <div>
          <a className={btnStart} onClick={()=>createPath(5, history)}>
            iniciar
          </a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Atuacao;
