import React from 'react';
import {
  unavailableWrapper,
  unavailableContent,
  unavailableTitle,
  unavailableTitleBanner,
  unavailableTitleText,
  unavailableOptions,
  unavailableBannerWrapper,
  unavailableBannerImg,
  unavailableOptionHeader,
  unavailableSugestions,
} from './UnavailablePage.module.css';
import promotronReparador from '../../../../assets/imgs/promotron-repador@4x.png';
import diagnosticoImg from '../../../../assets/imgs/Image-4.png';
import dominioImg from '../../../../assets/imgs/Image1.png';
import painelDeComprasImg from '../../../../assets/imgs/Image3.png';
import painelSaneamentoBasicoImg from "../../../../assets/imgs/Image-2.png";
import inLocoImg from '../../../../assets/imgs/inLoco.png';
import unavailableBanner from '../../../../assets/imgs/unavailableBanner.png';

function UnavailablePage() {
  return (
    <div className={unavailableWrapper}>
      <div className={unavailableBannerWrapper}>
        <img
          className={unavailableBannerImg}
          src={unavailableBanner}
          alt="Banner com a fachada do MPRJ."
        />
      </div>
      <div className={unavailableContent}>
        <section className={unavailableTitle}>
          <div className={unavailableTitleBanner}>
            <img src={promotronReparador} alt="Robô Promotron Reparador." />
          </div>
          <div className={unavailableTitleText}>
            <h1>Oops!</h1>
            <h2>Estamos passando por problemas técnicos</h2>
            <p>
              <b>Nosso sistema está fora do ar. </b>A Gerência de Análises, Diagnósticos e
              Geoprocessamento da Diretoria de Gestão do Conhecimento (equipe gestora do MP em
              Mapas) INFORMA que, em virtude de um problema no hardware que dá suporte à operação do
              Parquet Digital, a plataforma se encontra indisponível. Informa, ainda, que as
              providências necessárias para a solução do problema já foram tomadas.
            </p>
          </div>
        </section>
        <section className={unavailableSugestions}>
          <h3>Sugestões de ferramentas:</h3>
          <small>
            Seleção de ferramentas que podem ajudar na sua atuação enquanto o Parquet Digital está
            fora:
          </small>
          <div className={unavailableOptions}>
            <div>
              <img src={diagnosticoImg} alt="Diagnóstico das Promotorias de Justiça" />
              <div className={unavailableOptionHeader}>
                <h4>Diagnóstico das Promotorias de Justiça</h4>
                <a href="http://j.mp/DiagnosticoPromotoriasMPRJ" target="blank">
                  <button type='button'>Acessar</button>
                </a>
              </div>
              <small>Comparativo de feitos entre as Promotorias.</small>
            </div>
            <div>
              <img src={dominioImg} alt="Domínio" />
              <div className={unavailableOptionHeader}>
                <h4>Domínio</h4>
                <a href="http://apps.mprj.mp.br/sistema/dominio/" target="blank">
                  <button type='button'>Acessar</button>
                </a>
              </div>
              <small>Listagem de procedimentos, sua mesa e alguns alertas.</small>
            </div>
            <div>
              <img src={painelDeComprasImg} alt="Painel de Compras" />
              <div className={unavailableOptionHeader}>
                <h4>Painel de Compras</h4>
                <a href="http://j.mp/ComprasCovidMPRJ" target="blank">
                  <button type='button'>Acessar</button>
                </a>
              </div>
              <small>Compras públicas para enfrentamento da Covid-19.</small>
            </div>
            <div>
              <img src={painelSaneamentoBasicoImg} alt="Painel Saneamento Básico" />
              <div className={unavailableOptionHeader}>
                <h4>Painel Saneamento Básico</h4>
                <a href="http://j.mp/SaneamentoBasicoMPRJ" target="blank">
                  <button type='button'>Acessar</button>
                </a>
              </div>
              <small>Diagnóstico e indicadores de água esgoto e drenagem por município.</small>
            </div>
            <div>
              <img src={inLocoImg} alt="inLoco" />
              <div className={unavailableOptionHeader}>
                <h4>InLoco</h4>
                <a href="http://inloco.mprj.mp.br/" target="blank">
                  <button type='button'>Acessar</button>
                </a>
              </div>
              <small>
                Mapa interativo com disponibilidade de várias camadas de dados georreferenciados.
              </small>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default UnavailablePage;
