import React from 'react';
import '../../themes/index.css';
import {
  loginWrapper,
  loginInner,
  loginFormArea,
  loginInfoArea,
  loginInfoAreaText,
  loginParquetHeader,
  loginInput,
  loginSubmitBtn,
  greetings,
  loginTip,
  loginInnerLogoFooter,
  loginFooter,
} from './Login.module.css';
import { useAppContext } from '../../../core/app/App.context';
import { useLoginContext } from '../../../core/login/Login.context';

import { ParquetDigitalLogo, LoginPromotron } from '../../assets/svg';
import GADGLogo from '../../assets/imgs/gadg_logo.png';
import GADGLogoColorfull from '../../assets/imgs/gadg_logo_colorfull.png';

function Login() {
  const { scaLoginFailed, userExpired } = useAppContext();
  const { isLoading, setLoadingState, setUsername, setPassword } = useLoginContext();

  const onSubmit = (e) => {
    e.preventDefault();
    setLoadingState(true);
  };

  return (
    <div className={loginWrapper}>
      <div className={loginInner}>
        <form className={loginFormArea} onSubmit={onSubmit}>
          <div className={loginParquetHeader}>
            <ParquetDigitalLogo width="200" height="150" />
          </div>

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
            {isLoading ? 'CARREGANDO...' : 'ENTRAR'}
          </button>

          <div className={greetings}>
            {userExpired && <strong>Sua sessão expirou</strong>}
            {scaLoginFailed && <strong>Verifique se a senha e usuário estão corretos</strong>}
            {scaLoginFailed && <strong>e se a sua Promotoria está contemplada.</strong>}
            {scaLoginFailed && <strong>Em caso de dúvidas, leia as orientações.</strong>}
            {/*         {autoLoginFailed && <strong>Houve algum erro ao tentar acessar com as informações armazenadas no navegador.</strong>} */}
          </div>

          <p className={loginTip}>Para acessar use o login e senha do SCA MPRJ</p>
        </form>

        <div className={loginInfoArea}>
          <p className={loginInfoAreaText}>
            O Parquet Digital encontra-se em período de expansão. Para saber se sua promotoria está
            contemplada <a href="/">clique aqui</a>.
          </p>
          <LoginPromotron />
        </div>

        <div className={loginInnerLogoFooter}>
          <img src={GADGLogo} alt="Logo GADG" />
        </div>
      </div>

      <div className={loginFooter}>
        <p>
          Qualquer dúvida ou problema contatar: <strong>gadg.atendimento@mprj.mp.br</strong>
        </p>
        <img src={GADGLogoColorfull} alt="GADG Logo" />
      </div>
    </div>
  );
}

export default Login;
