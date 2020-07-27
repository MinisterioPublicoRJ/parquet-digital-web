import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Chat from '../../../../assets/gifs/chat.gif';

import '../styles.css';

const Work = () => {
  return (
    <div className="wrapper-welcome">
      <div className="banner-welcome">
        <img height="100%" src={Chat} alt="trabalho-promoton" />
      </div>
      <div className="welcome-texts">
        <h2>Entendimento e Clareza</h2>
        <p>
          Afim de subsidiar o máximo desempenho da sua Promotoria e facilitar o seu trabalho, o robô
          fornece uma ajuda estratégica na observação e gestão do seu acervo e resolução dos seus
          processos.
        </p>
      </div>
      <div className="all-btns">
        <Link to="./welcome">
          <button className="btn-previous">anterior</button>
        </Link>
        <div className="btns">
          <Link to="./home">
            <button className="btn-next">próximo</button>
          </Link>
          <Link to="./dashboard">
            <button className="btn-jumper">pular</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Work;
