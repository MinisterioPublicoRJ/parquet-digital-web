import React from 'react';
import { Link } from 'react-router-dom';
import Trabalho from '../../../assets/gifs/trabalho.gif';
import {
  wrapperWelcome,
  bannerWelcome,
  welcomeTexts,
  btnsWelcome,
  btnNext,
  btnJumper
  
} from './WelcomePages.module.css';

const Welcome = () => {
  return (
    <div className={wrapperWelcome}>
      <div className={bannerWelcome}>
        <img height="100%" src={Trabalho} alt="trabalho-promoton" />
      </div>
      <div className={welcomeTexts}>
        <h2>Gestão Turbinada</h2>
        <p>
          Afim de subsidiar o máximo desempenho da sua Promotoria e facilitar o seu trabalho, o robô
          fornece uma ajuda estratégica na observação e gestão do seu acervo e resolução dos seus
          processos.
        </p>
      </div>
      <div className={btnsWelcome}>
        <Link to="./work">
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
  );
};

export default Welcome;
