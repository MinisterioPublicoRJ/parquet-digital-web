import React from 'react';
import introductionWrapper from '../introduction.module.css';

function IntroductionPerfomanceRadar() {
  return (
      <div className={introductionWrapper}>
      <h3>Radar De Perfomance</h3>
      <p>
        Neste gráfico eu analiso o que esta Promotoria fez nos últimos 180 dias e te descrevo de
        forma visual e lúdica, produzindo um gráfico que é a identidade gráfica da sua atuação,
        parecida com um gráfico de status. Sua identidade ainda pode ser comparada com o perfil
        médio de promotores e promotoras que atuam com a mesma matéria que você. O gráfico
        preenchido em roxo traz os seus status, enquanto o gráfico em vermelho é o do perfil médio
        de colegas. As pontas dos vértices, que eu chamo de máximo da atribuição, são os números
        máximos atingidos de cada atividade que eu leio, no universo das promotorias com atribuição
        similar, no mesmo período de 180 dias.
      </p>
      <p>
        Para saber mais sobre os termos e cálculos utilizados para compor estar visualização,
        disponibilizei uma explicação detalhada de cada item no Glossário.
      </p>
    </div>
  );
}
export default IntroductionPerfomanceRadar;
