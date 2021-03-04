import React from 'react';
import './styles.css';
import unavaibleBanner from '../assets/imgs/unavaiable-banner.png';
import promotronReparador from '../assets/imgs/promotron-repador@4x.png';
import diagnosticoImg from '../assets/imgs/Image-4.png';
import dominioImg from '../assets/imgs/Image1.png';
import painelDeComprasImg from '../assets/imgs/Image3.png';
import painelSaneamentoBasicoImg from '../assets/imgs/Image-2.png';
import inLocoImg from '../assets/imgs/Image2.png';

const Unavailable = () => {
  return (
    <div className="unavaiable-wrapper">
      <div className="unavaiable-banner">
        <img
          width="100%"
          src={unavaibleBanner}
          alt="PARQUET DIGITAL - MPRJ Em Mapas. Painel multitarefas criado para auxiliar a gestão, o entendimento do dia-a-dia com base
            em evidências e uma análise apurada da sua Promotoria."
        />
      </div>
      <d iv className="unavaiable-content">
        <section className="unavaiable-title">
          <div>
            <img
              height="100%"
              width="100%"
              className="unavaible-promotron-img"
              src={promotronReparador}
              alt="Robô Promotron Reparador."
            />
          </div>
          <div className="unavaiable-intro">
            <h1>Oops!</h1>
            <h2>Estamos passando por problemas técnicos</h2>
            <p>
              <b>Nosso sistema está fora do ar. </b>
              Estamos passando por problemas técnicos na infraestrutura. Em virtude de um problema
              no hardware que dá suporte à operação direta do Parquet Digital, a plataforma se
              encontra indisponível. Informamos também que o fornecedor já foi acionado e está
              atuando para a solução do problema.
            </p>
          </div>
        </section>
        <section>
          <h3>Sugestões de ferramentas:</h3>
          <small>
            Seleção de ferramentas que podem ajudar na sua atuação enquanto o Parquet Digital está
            fora:
          </small>
          <div className="unavaiable-options">
            <div>
              <img src={diagnosticoImg} alt="Diagnóstico das Promotorias de Justiça" />
	      <a href="http://j.mp/DiagnosticoPromotoriasMPRJ" target="blank">
              <h4>Diagnóstico das Promotorias de Justiça</h4>
	      </a>
              <small>Comparativo de feitos entre as Promotorias.</small>
            </div>
            <div>
              <img src={dominioImg} alt="Domínio" />
	      <a href="http://apps.mprj.mp.br/sistema/dominio/" target="blank">
              <h4>Domínio</h4>
	      </a>
              <small>Listagem de procedimentos, sua mesa e alguns alertas.</small>
            </div>
            <div>
              <img src={painelDeComprasImg} alt="Painel de Compras" />
	      <a href="http://j.mp/ComprasCovidMPRJ" target="blank">
              <h4>Painel de Compras</h4>
	      </a>
              <small>Compras públicas para enfrentamento da Covid-19.</small>
            </div>
            <div>
              <img src={painelSaneamentoBasicoImg} alt="Painel Saneamento Básico" />
	      <a href="http://j.mp/SaneamentoBasicoMPRJ" target="blank">
              <h4>Painel Saneamento Básico</h4>
	      </a>
              <small>Diagnóstico e indicadores de água esgoto e drenagem por município.</small>
            </div>
          </div>
        </section>
      </d>
    </div>
  );
};

export default Unavailable;
