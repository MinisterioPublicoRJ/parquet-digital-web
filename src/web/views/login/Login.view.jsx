import React from 'react';
import '../../themes/index.css';
import { loginWrapper, loginInner, loginImageBanner, loginFormArea, loginInput, loginSubmitBtn, greetings } from './Login.module.css'
import { useAppContext } from '../../../core/app/App.context';
import LoginBanner from '../../assets/imgs/loginPageBanner.png';
import { LoginPromotron } from '../../assets';
import { useLoginContext } from '../../../core/login/Login.context';

const Login = () => {
  const { scaLoginFailed } = useAppContext();
  const { isLoading, setLoadingState, setUsername, setPassword, userExpired } = useLoginContext();

  const onSubmit = (e) => {
    e.preventDefault();
    setLoadingState(true);
    };

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
        <form className={loginFormArea} onSubmit={onSubmit}>
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
            onChange={({ target }) => setPassword(target.value)}
            required
          />
          <button className={loginSubmitBtn} disabled={isLoading} type="submit">
            {isLoading ? 'CARREGANDO' : 'ENTRAR'}
          </button>
          <div className={greetings}>
            {userExpired && <strong>Sua sessão expirou</strong>}
            {scaLoginFailed && <strong>Verifique se a senha ou usuário estão corretos!</strong>}
            {scaLoginFailed && <strong>Atenção: deve ser usada a senha do SCA/contracheque!</strong>}
{/*         {autoLoginFailed && <strong>Houve algum erro ao tentar acessar com as informações armazenadas no navegador.</strong>} */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
