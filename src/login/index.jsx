import React, { useState } from 'react';

import './styles.css';
import { useAuth } from '../app/authContext';
import boxLogin from '../assets/imgs/box_login.png';
// import Api from '../api';
import { LoginPromotron } from '../assets';
// import { Spinner } from '../components/layoutPieces';

const Login = () => {
  const { scaLogin, userError, user } = useAuth();
  const [username, setUsername] = useState('');
  const [secret, setSecret] = useState('');
  const [loading, setLoading] = useState(false);

  // const handleChange = event => {
  // setLogin({ ...login, [event.target.username]: event.target.value });
  // console.log(login);
  // };

  async function handleSubmit(e) {
    e.preventDefault();
    scaLogin(username, secret);
    // const [msgErro, setmsgErro] = useState();lt();
    // try {
    //   console.log(user, login);
    //   const userLogin = await Api.loginUser(user);
    //   localStorage.getItem('token', JSON.stringify(user));
    //   Api.defaults.headers.Authorization = `Bearer ${user}`;
    //   console.log(userLogin);
    //   setLogin(userLogin);
    //   setmsgErro('sucesso');
    // } catch (e) {
    //   console.log(e);
    //   setloginError(true);
    //   setmsgErro('erro');
    // }
    // return [login, loginError];
  }

  {
    /* if (!loading) {
    return <Spinner size="large" />;
  } */
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
            placeholder="Usuário"
            type="text"
            onChange={({ target }) => setUsername(target.value)}
            required
          />
          <input
            className="Login-input"
            placeholder="Senha"
            type="password"
            onChange={({ target }) => setSecret(target.value)}
            required
          />
          <button type="submit">ENTRAR</button>
        </form>
        <div className="saudacoes">
          {/* msgErro === 'sucesso' && <strong>Você está conectado!</strong> */}
          {/* msgErro === 'erro' && <strong>Verifique se a senha ou usuário estão corretos!</strong> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
