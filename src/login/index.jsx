import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';
import { useAuth } from '../app/authContext';
import boxLogin from '../assets/imgs/box_login.png';
import { LoginPromotron } from '../assets';

const Login = ( { user } ) => {
  const history = useHistory();
  const { scaLogin, userError } = useAuth();
  const [username, setUsername] = useState('');
  const [secret, setSecret] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    scaLogin(username, secret);
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
          <button className='btn-login' onClick={() => history.push('/dashboard')} type="submit">ENTRAR</button>
          <div className="greetings">
            {userError === 'worked' && <strong>Você está conectado!</strong>}
            {userError === 'failed' && (
              <strong>Verifique se a senha ou usuário estão corretos!</strong>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
