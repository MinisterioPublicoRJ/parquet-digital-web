import React, { useState } from 'react';

import './styles.css';
import { useAuth } from '../app/authContext';
import boxLogin from '../assets/imgs/box_login.png';
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

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const userLogin = await Api.loginUser(user);
      console.log(userLogin);
      setLogin(userLogin);
    } catch (e) {
      console.log(e);
      setloginError(true);
    }
  }

  if (!loading) {
    return <h1>Carregando!!!</h1>;
  }

  return (
    <div className="wrapper">
      <div className="wrapper-login">
        <div className="Login-banner">
          <img
            height="100%"
            width="100%"
            src={boxLogin}
            alt="PARQUET DIGITAL - MPRJ Em Mapas. Painel multitarefas criado para auxiliar a gestão, o entendimento do dia-a-dia com base
            em evidências e uma análise apurada da sua Promotoria."
          />
        </div>
        <form className="Login-form" onSubmit={handleSubmit}>
          <LoginPromotron height={150} />
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
          <button type="submit">ENTRAR</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
