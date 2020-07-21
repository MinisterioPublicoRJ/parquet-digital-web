import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Analise from '../assets/gifs/analise.gif';

import './styles.css';

const PerformanceAnalysis = () => {
  return (
    <div className="wrapper-welcome">
      <div className="banner-welcome">
        <img height="100%" src={Analise} alt="trabalho-promoton" />
      </div>
      <div className="welcome-texts">
        <h2>Análise da Atuação</h2>
        <p>
          Por meio de uma visualização saudável o robô apresenta processos analíticos e métodos
          estatísticos de performance entre órgãos de mesma atuação, estabelecendo índices e
          métricas importantes.
        </p>
      </div>
      <div className="btn-welcome">
        <div className="btn-previous">
          <Link to="./home">
            <button className="btn-next">Anterior</button>
          </Link>
        </div>
        <div className="btn-next-previous">
          <Link to="./home">
            <button className="btn-start">iniciar</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalysis;
