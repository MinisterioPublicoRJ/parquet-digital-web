import React from 'react';
import { Link } from 'react-router-dom';
import Trabalho from '../../../assets/gifs/trabalho.gif';

import './styles.css';

const Welcome = () => {
  return (
    <div className="wrapper-welcome">
      <div className="banner-welcome">
        <img height="100%" src={Trabalho} alt="trabalho-promoton" />
      </div>
      <div className="welcome-texts">
        <h2>Gestão Turbinada</h2>
        <p>
          Afim de subsidiar o máximo desempenho da sua Promotoria e facilitar o seu trabalho, o robô
          fornece uma ajuda estratégica na observação e gestão do seu acervo e resolução dos seus
          processos.
        </p>
      </div>
      <div className="btns-welcome">
        <Link to="./work">
          <button type="button" className="btn-next">
            próximo
          </button>
        </Link>
        <Link to="./dashboard">
          <button type="button" className="btn-jumper">
            pular
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
