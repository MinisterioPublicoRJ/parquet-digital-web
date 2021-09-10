import React from 'react';
import Chat from '../../../assets/gifs/chat.gif';
import {Nav, createPath} from './Nav.jsx';
import {
    wrapperWelcome,
    bannerWelcome,
    welcomeTexts,
    allBtns,
    btnPrevious,
    btnNext,
    btnJumper,
    alignmentWrapper
  } from './WelcomePages.module.css';
  
const Work = ({history}) => {
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
        <a className={btnPrevious} onClick={()=>createPath(1, history)}>
            anterior
          </a>
        <div>
          <a className={btnNext} onClick={()=>createPath(3, history)}>
            próximo
          </a>
          <a className={btnJumper} onClick={()=>createPath(5, history)}>
            pular
          </a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Work;
