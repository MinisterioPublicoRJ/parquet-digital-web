import React from 'react';
import '../../themes/index.css';
import { loginImagesBanner,logoGadgBanner,roboGadgBanner, loginBanner, loginWrapper, loginInner, loginImageBanner, loginFormArea, loginParquetHeader, loginInput, loginSubmitBtn, greetings } from './Login.module.css'
import { useAppContext } from '../../../core/app/App.context';
import { useLoginContext } from '../../../core/login/Login.context';
import LogoBranco from '../../assets/imgs/logo_gadg_branco.png';
import RoboLogin from '../../assets/imgs/robo_login.png';

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
        <div className={loginImageBanner}>
        <div className={loginBanner}>
         <p>O Parquet Digital encontra-se disponível apenas
          para <span>Promotorias de Justiça de Tutela Coletiva (PJTC),</span> {' '} 
          <span>Promotorias de Justiça de Investigação Penal (PIP</span> e <span> Promotorias de Justiça 
          que atuam exclusivamente junto às Varas Criminais.</span> Os Usuários habilitados para acessá-lo 
          são Promotores de Justiça e Assessores Jurídicos lotados nas Promotorias contempladas.
         </p>
         <p>Qualquer dúvida ou problema contactar:</p>
         <strong>gadg.atendimento@mprj.mp.br</strong>
        </div>
        <div className={loginImagesBanner}>
        <img className={logoGadgBanner} src={LogoBranco} alt="logo-gadg" />
        <img className={roboGadgBanner} src={RoboLogin} alt="robô-login" />
        </div>
        </div>
        <form className={loginFormArea} onSubmit={onSubmit}>
          <h2 className={loginParquetHeader}>Parquet Digital</h2>
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
            {scaLoginFailed && <strong>Em caso de dúvidas, leia as orientações ao lado.</strong>}
{/*         {autoLoginFailed && <strong>Houve algum erro ao tentar acessar com as informações armazenadas no navegador.</strong>} */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
