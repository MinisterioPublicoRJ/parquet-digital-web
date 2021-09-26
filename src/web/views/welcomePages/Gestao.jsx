import React from 'react';
import Trabalho from '../../../assets/gifs/trabalho.gif';
import {Link} from 'react-router-dom';
import {setHistory, Nav, setPath} from './Nav.jsx';
import {
  wrapperWelcome,
  bannerWelcome,
  welcomeTexts,
  welcomeBtns,
  btnNext,
  btnJumper,
  alignmentWrapper
} from './WelcomePages.module.css';

const Gestao = ({history}) => {
  setHistory(history);
  Nav();
  console.log(history.location.pathname);

  return (
    <div className={alignmentWrapper}>
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
      <div className={welcomeBtns}>
          <Link to={setPath("next")} className={btnNext}>
            próximo
          </Link>
          <Link to={setPath("dash")} className={btnJumper}>
            pular
          </Link>
      </div>
    </div>
    </div>
  );
};

export default Gestao;
