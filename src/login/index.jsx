import React, { useState, useEffect } from 'react';

import './styles.css';
import Api from '../api';
import { getUser } from '../user';
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
        <div className="Login-banner">
          <img
            height="100%"
            width="100%"
            src={require('../assets/imgs/box_login.png')}
            alt="PARQUET DIGITAL - MPRJ Em Mapas. Painel multitarefas criado para auxiliar a gestão, o entendimento do dia-a-dia com base
            em evidências e uma análise apurada da sua Promotoria."
          />
        </div>
        <form className="Login-form">
          <LoginPromotron height={150} />
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
          <button type="submit">ENTRAR</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
