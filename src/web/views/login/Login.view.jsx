import React from 'react';
import '../../themes/index.css';
import { loginBanner, loginWrapper, loginInner, loginImageBanner, loginFormArea, loginParquetHeader, loginInput, loginSubmitBtn, greetings } from './Login.module.css'
import { useAppContext } from '../../../core/app/App.context';
import { useLoginContext } from '../../../core/login/Login.context';

const Login = () => {
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
          para <span>Promotorias de justiça de Tutela Coletiva (PJTC)</span> 
          {" "}e de <span>Investigação Penal (PIPs)</span>. Os Usuários habilitados 
          para acessá-lo são <strong>Promotores de justiça</strong> e <strong>Assessores jurídicos</strong>.
         </p>
         <p>Qualquer dúvida ou problema contactar:</p>
         <strong>gadg.atendimento@mprj.mp.br</strong>
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
};

export default Login;
