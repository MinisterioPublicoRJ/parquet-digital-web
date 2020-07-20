import React, { useState, useEffect } from 'react';

import './styles.css';
import { useAuth } from '../app/authContext';
import boxLogin from '../assets/imgs/box_login.png';
import Api from '../api';
import { LoginPromotron } from '../assets';
//import { Spinner } from '../components/layoutPieces';

const Login = () => {
  const { user } = useAuth();
  const [login, setLogin] = useState([{ username: '', password: '' }]);
  const [loginError, setloginError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [msgErro, setmsgErro] = useState();

  const handleChange = event => {
    setLogin({ ...login, [event.target.username]: event.target.value });
    console.log(login);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const userLogin = await Api.loginUser(user);
      localStorage.setItem('token', JSON.stringify(user));
      Api.defaults.headers.Authorization = `Bearer ${user}`;
      console.log(userLogin);
      setLogin(userLogin);
      setmsgErro('sucesso');
    } catch (e) {
      console.log(e);
      setloginError(true);
      setmsgErro('erro');
    }
    return [login, loginError];
  }

  {/*if (!loading) {
    return <Spinner size="large" />;
  }*/}

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
            placeholder="Usuário"
            type="text"
            value={login.username}
            onChange={handleChange}
            required
          />
          <input
            className="Login-input"
            placeholder="Senha"
            type="password"
            value={login.password}
            onChange={handleChange}
            required
          />
          <button type="submit">ENTRAR</button>
        </form>
        <div className="saudacoes">
          {msgErro === 'sucesso' && <strong>Você está conectado!</strong>}
          {msgErro === 'erro' && <strong>Verifique se a senha ou usuário estão corretos!</strong>}
        </div>
      </div>
    </div>
  );
};

export default Login;
