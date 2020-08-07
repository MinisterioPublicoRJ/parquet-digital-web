import React, { useState, useEffect } from 'react';
import './styles.css';
import { useAuth } from '../app/authContext';
import boxLogin from '../assets/imgs/box_login.png';
import { LoginPromotron } from '../assets';

const Login = () => {
  const { scaLogin, scaUserError } = useAuth();
  const [username, setUsername] = useState('');
  const [secret, setSecret] = useState('');
  const [isLoading, setLoadingState] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoadingState(true);
    scaLogin(username, secret);
  }

  useEffect(() => {
    if(scaUserError) {
      setLoadingState(false);
    }
  },[scaUserError])

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
          <button className="btn-login" disabled={isLoading} type="submit" >
            {isLoading? "CARREGANDO" : "ENTRAR"}
          </button>
          <div className="greetings">
            {scaUserError && <strong>Verifique se a senha ou usuário estão corretos!</strong>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
