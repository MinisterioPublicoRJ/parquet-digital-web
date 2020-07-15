import React, { useState, useEffect } from 'react';

import './styles.css';
//import { useAuth } from '../../../app/authContext';

import Api from '../api';
import { LoginPromotron } from '../assets';

const Login = () => {
  const [login, setLogin] = useState([{ name: '', email: '' }]);

  const handleChange = event => {
    setLogin({ ...login, [event.target.name]: event.target.value });
    console.log(login);
  };

  return (
    <div className="wrapper">
      <div className="wrapper-login">
        <div className="Login-intro-container">
          {/*
          * @Todo substituir img de background e colocar o texto com formatação adequada
          *
          <h1>PARQUET DIGITAL</h1>
          <p>
            Painel multitarefas criado para auxiliar a gestão, o entendimento do dia-a-dia com base
            em evidências e uma análise apurada da sua Promotoria.
          </p>
          <img
            height="100%"
            width="100%"
            src={require('../assets/imgs/mprj-em-mapas.png')}
            alt="MPRJ Em Mapas"
          />
          */}
        </div>
        <div className="Login-container">
          <div className="Login-banner">
            {/*
            * GIF
            * <img
            height="100%"
            width="100%"
            src={require('../assets/gifs/promotron.gif')}
            alt="robô-promoton"
          /> */}
            <LoginPromotron />
          </div>
          <form className="Login-form">
            <div className="Login-inputs">
              <input
                className="Login-input"
                placeholder="Matrícula MPRJ"
                type="text"
                value={login.name}
                onChange={handleChange}
                required
              />
              <input
                className="Login-input"
                placeholder="Senha"
                type="password"
                value={login.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="Login-container-button">
              <button type="submit">ENTRAR</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
