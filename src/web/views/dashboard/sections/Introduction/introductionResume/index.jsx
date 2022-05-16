import React from 'react';
import {introductionWrapper} from '../introduction.module.css';

function IntroductionResume() {
  return (
    <div className={introductionWrapper}>
      <h3>Resumo do dia</h3>
      <p>
        Aqui você verá as atualizações do dia na sua Promotoria. Trago informações que leio dos
        bancos de dados do MPRJ. Para lhe ajudar a pensar e planejar sua rotina e o dia de hoje,
        busco o desempenho do trabalho realizado nos últimos 30 dias em comparação com seus e suas
        colegas de mesma atribuição, verifico o volume de entrada de processos de hoje e lhe aviso
        se a entrada está típica ou atípica a partir de uma análise da frequência de entradas da
        promotoria.
      </p>
      <p>
        Eu também te dou a opção de acessar o Mapa da sua área de Atuação, onde te apresento
        visualizações sobre dados oficiais de crimes na sua área (dados do ISP), os dados de ROs que
        recebemos da PCERJ via Integra Policial e os dados do próprio banco do MPRJ. Escolhi os
        principais crimes a serem exibidos com a ajuda do meu amigo Farol, produzido pelo Centro de
        Pesquisas (CENPE). Tudo isso é apresentado em visualizações intuitivas, que lhe permitem
        perceber rapidamente quais locais da sua área de atribuição exigem mais atenção e, conforme
        avança com o zoom no mapa, será possível ver os pontos com os procedimentos a nível de rua e
        a localização de edificações importantes para influenciar a prática de crimes ou a extensão
        dos danos da atividade criminosa. Ainda trago, ao lado do mapa, indicadores relevantes e
        alertas acerca de determinadas mudanças de comportamento na área e principalmente de números
        que chamam a atenção para alguma delegacia, visando auxiliar o seu trabalho de controle
        externo da atividade policial.
      </p>
    </div>
  );
}
export default IntroductionResume;
