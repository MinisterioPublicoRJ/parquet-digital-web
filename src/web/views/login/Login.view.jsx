import React, { useState, useEffect } from 'react';
import { loginWrapper, loginInner, loginImageBanner, loginFormArea, loginInput, loginSubmitBtn } from './Login.module.css'
import { useAppContext } from '../../../core/app/App.context';
import LoginBanner from '../../assets/images/loginPageBanner.png';
import { LoginPromotron } from '../../../assets';

const Login = ({ setUsername, setSecret, isLoading }) => {
  // const { scaLogin, scaUserError, userExpired } = useAppContext();
  const [username, setUsername] = useState('');
  const [secret, setSecret] = useState('');
  const [isLoading, setLoadingState] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoadingState(true);
    // scaLogin(username, secret);
  }

  return (
    <div className={loginWrapper}>
      <div className={loginInner}>
        <div className={loginImageBanner}>
          <img
            height="100%"
            width="100%"
            src={LoginBanner}
            alt="PARQUET DIGITAL - MPRJ Em Mapas. Painel multitarefas criado para auxiliar a gestão, o entendimento do dia-a-dia com base
            em evidências e uma análise apurada da sua Promotoria."
          />
        </div>
        <form className={loginFormArea} onSubmit={handleSubmit}>
          <LoginPromotron height={150} />
          <input
            className={loginInput}
            placeholder="Usuário"
            type="text"
            onChange={({ target }) => setUsername(target.value)}
            required
          />
          <input
            className={loginInput}
            placeholder="Senha"
            type="password"
            onChange={({ target }) => setSecret(target.value)}
            required
          />
          <button className={loginSubmitBtn} disabled={isLoading} type="submit">
            {isLoading ? 'CARREGANDO' : 'ENTRAR'}
          </button>
          <div className="greetings">
            {/*scaUserError && <strong>Verifique se a senha ou usuário estão corretos!</strong>}
            {userExpired && <strong>Sua sessão expirou</strong>*/}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
