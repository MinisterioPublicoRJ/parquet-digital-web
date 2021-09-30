import React from 'react';
import Analise from '../../../assets/gifs/analise.gif';
import {Link} from 'react-router-dom';
import {Nav, getPath} from './Nav.jsx';
import {
    wrapperWelcome,
    bannerWelcome,
    welcomeTexts,
    paBtns,
    btnPrevious,
    btnStart, 
    prevDiv,
    startDiv,
    alignmentWrapper
  } from './WelcomePages.module.css';

const Atuacao = ({history}) => {
  Nav(history);

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
          <Link to={getPath(history, "previous")} className={btnPrevious}>
            anterior
          </Link>
        </div>
        <div className={startDiv}>
          <Link to={getPath(history, "dash")} className={btnStart}>
            iniciar
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Atuacao;
