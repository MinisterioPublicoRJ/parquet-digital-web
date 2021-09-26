import React from 'react';
import Chat from '../../../assets/gifs/chat.gif';
import {Link} from 'react-router-dom';
import {setHistory, Nav, setPath} from './Nav.jsx';
import {
    wrapperWelcome,
    bannerWelcome,
    welcomeTexts,
    allBtns,
    btnPrevious,
    btnNext,
    btnJumper,
    placeholderDiv,
    alignmentWrapper
  } from './WelcomePages.module.css';
  
const Work = ({history}) => {
  setHistory(history);
  Nav(history, 2);

  return (
    <div className={alignmentWrapper}>
    <div className={wrapperWelcome}>
      <div className={bannerWelcome}>
        <img height="100%" src={Chat} alt="trabalho-promoton" />
      </div>
      <div className={welcomeTexts}>
        <h2>Entendimento e Clareza</h2>
        <p>
        O robô auxilia o melhor entendimento da rotina de trabalho da Promotoria e otimiza
        a visualização das demandas com base em alertas, indicativos, metas e
        acompanhamento funcional.
        </p>
      </div>
      <div className={allBtns}>
          <Link to={setPath("previous")} className={btnPrevious}>
            anterior
          </Link>
        <div className={placeholderDiv}>
          <Link to={setPath("next")} className={btnNext}>
            próximo
          </Link>
          <Link to={setPath("dash")} className={btnJumper}>
            pular
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Work;
