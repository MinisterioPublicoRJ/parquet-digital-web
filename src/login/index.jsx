import React, { useState, useEffect } from 'react';

import './styles.css';
import Api from '../api';
import { getUser } from '../user';

const Login = () => {
  const [login, setLogin] = useState([{ name: '', email: '' }]);

  const handleChange = event => {
    setLogin({ ...login, [event.target.name]: event.target.value });
    console.log(login);
  };

  return (
    <div className="wrapper">
      <div className="Login-container">
        <div className="Login-banner">
          {/*<img
            height="100%"
            width="100%"
            src={require('../assets/svg/home.gif')}
            alt="robô-promoton"
          />*/}
        </div>
        <form className="Login-form">
          <div className="Login-inputs">
            <input
              className="Login-input"
              placeholder="Usuário"
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
            <button type="submit">Entrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
