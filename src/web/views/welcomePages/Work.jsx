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
    btnJumper
  } from './WelcomePages.module.css';
  
const Work = () => {
  return (
    <div className={wrapperWelcome}>
      <div className={bannerWelcome}>
        <img height="100%" src={Chat} alt="trabalho-promoton" />
      </div>
      <div className={welcomeTexts}>
        <h2>Entendimento e Clareza</h2>
        <p>
          Afim de subsidiar o máximo desempenho da sua Promotoria e facilitar o seu trabalho, o robô
          fornece uma ajuda estratégica na observação e gestão do seu acervo e resolução dos seus
          processos.
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
  );
};

export default Work;
