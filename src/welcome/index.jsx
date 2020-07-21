import React, { useState } from 'react';
import { SectionTitle } from '../components/layoutPieces';
import boxLogin from '../assets/imgs/box_login.png';

import './styles.css';

const Welcome = () => {
  return (
    <div className="wrapper-welcome">
       <div className="Login-banner">
          <img
            height="100%"
            width="100%"
            src={boxLogin}
          />
        </div>
      <SectionTitle value="Gestão Turbinada" glueToTop />
      <p>
        Afim de subsidiar o máximo desempenho da sua Promotoria e facilitar o seu trabalho, o robô
        fornece uma ajuda estratégica na observação e gestão do seu acervo e resolução dos seus
        processos.
      </p>
    </div>
  );
};

export default Welcome;
