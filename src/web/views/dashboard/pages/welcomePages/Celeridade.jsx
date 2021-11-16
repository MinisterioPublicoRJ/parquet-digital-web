import React from 'react';
import Run from '../../../../assets/gifs/run.gif';
import {Link} from 'react-router-dom';
import {Nav, getPath} from './Nav.jsx';
import {
    wrapperWelcome,
    bannerWelcome,
    welcomeTexts,
    allBtns,
    placeholderDiv,
    btnPrevious,
    btnNext,
    btnJumper,
    alignmentWrapper
} from './WelcomePages.module.css';

const Celeridade = ({history}) => {
  Nav(history);

  return (
    <div className={alignmentWrapper}>
    <div className={wrapperWelcome}>
      <div className={bannerWelcome}>
        <img height="100%" src={Run} alt="trabalho-promoton" />
      </div>
      <div className={welcomeTexts}>
        <h2>Celeridade nos Processos</h2>
        <p>
          O robô das promotorias tem como missão ajudar o trabalho do Promotor, tornando sua atuação
          ainda mais célere e capaz de atingir o maior impacto possível.
        </p>
      </div>
      <div className={allBtns}>
        <Link to={getPath(history, "previous")} className={btnPrevious}>
            anterior
          </Link>
        <div className={placeholderDiv}>
          <Link to={getPath(history, "next")} className={btnNext}>
            próximo
          </Link>
          <Link to={getPath(history, "dash")} className={btnJumper}>
            pular
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Celeridade;