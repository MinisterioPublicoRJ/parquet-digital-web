import React from 'react';
import { Link } from 'react-router-dom';
import Chat from '../../../assets/gifs/chat.gif';
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
  
const Work = () => {
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
        <Link to="./welcome">
          <button type="button" className={btnPrevious}>
            anterior
          </button>
        </Link>
        <div>
          <Link to="./home">
            <button type="button" className={btnNext}>
              próximo
            </button>
          </Link>
          <Link to="./dashboard">
            <button type="button" className={btnJumper}>
              pular
            </button>
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Work;
