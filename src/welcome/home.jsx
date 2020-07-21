import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Run from '../assets/gifs/run.gif';

import './styles.css';

const Home = () => {
  return (
    <div className="wrapper-welcome">
      <div className="banner-welcome">
        <img height="100%" src={Run} alt="trabalho-promoton" />
      </div>
      <div className="welcome-texts">
        <h2>Celeridade nos Processos</h2>
        <p>
          O robô das promotorias tem como missão ajudar o trabalho do Promotor, tornando sua atuação
          ainda mais célere e capaz de atingir o maior impacto possível.
        </p>
      </div>
      <div className="btn-welcome">
        <div className="btn-previous">
          <Link to="./work">
            <button className="btn-next">Anterior</button>
          </Link>
        </div>
        <div className="btn-next-previous">
          <Link to="./perfomanceAnalysis">
            <button className="btn-next">próximo</button>
          </Link>
          <Link to="./welcome">
            <button className="btn-jumper">pular</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
