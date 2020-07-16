import React, { useState, useEffect } from 'react';

import './styles.css';
import { useAuth } from '../app/authContext';
import Api from '../api';
import { LoginPromotron } from '../assets';

const Login = () => {
  const { user } = useAuth();
  const [login, setLogin] = useState([{ matricula: '', senha: '' }]);
  const [loginError, setloginError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleChange = event => {
    setLogin({ ...login, [event.target.matricula]: event.target.value });
  };

  function handleSubmit(event) {
    event.preventDefault();
  }

  {/*if (loading) {
    return <h1>Carregando!!!</h1>;
  }*/}

  return (
    <div className="wrapper">
      <div className="wrapper-login">
        <div className="Login-intro-container" />
        <div className="Login-container">
          <div className="Login-banner">
            <LoginPromotron />
          </div>
          <form className="Login-form" onSubmit={handleSubmit}>
            <div className="Login-inputs">
              <input
                className="Login-input"
                placeholder="Matrícula MPRJ"
                type="text"
                value={login.matricula}
                onChange={handleChange}
                required
              />
              <input
                className="Login-input"
                placeholder="Senha"
                type="password"
                value={login.senha}
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
