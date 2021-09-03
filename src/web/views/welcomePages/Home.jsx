import React from 'react';
import { Link } from 'react-router-dom';
import Run from '../../../assets/gifs/run.gif';
import {
    wrapperWelcome,
    bannerWelcome,
    welcomeTexts,
    allBtns,
    divMainPrevious,
    btnPrevious,
    btns,
    btnNext,
    btnJumper,
    alignmentWrapper
} from './WelcomePages.module.css';
  
const Home = () => {
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
        <div className={divMainPrevious}>
          <Link to="./work">
            <button type="button" className={btnPrevious}>
              anterior
            </button>
          </Link>
        </div>
        <div>
          <Link to="./perfomanceAnalysis">
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

export default Home;
