import React, { useState, useEffect } from 'react';

import './styles.css';
import Api from '../../api';
import { getUser } from '../../user';

const Login = () => {
  // eslint-disable-next-line no-shadow
  const [login, setLogin] = useState([]);
  const [loading, setLoading] = useState(true);


  return (
    <div className="wrapper">
    <div className="Login-container">
      <div className="Login-banner">
        <img height="100%" width="100%" src={require('../../assets/svg/home.gif')} alt="robô-promoton" />
      </div>
      <form className="Login-form">
        <div className="Login-inputs">
          <input
            className="Login-input"
            placeholder="Usuário"
            type="text"
            //value=''
            //required
          />
          <input
            className="Login-input"
            placeholder="Senha"
            type="password"
            //value=''
            required
          />
        </div>
        <div className="Login-container-button">
          <button type="submit">
              Entrar
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default Login;
