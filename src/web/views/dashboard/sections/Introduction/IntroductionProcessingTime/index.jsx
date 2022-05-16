import React from 'react';
import introductionWrapper from '../introduction.module.css';

function IntroductionProcessingTime() {
  return (
    <div className={introductionWrapper}>
      <h3>Tempo de tramitação</h3>
      <p>
        O tempo de tramitação é um velocímetro colorido mostrando a velocidade de finalização dos
        procedimentos que eu fiz para você, tudo de acordo com o banco de dados institucional que me
        alimenta a cada segundo. Eu tratei o procedimento mais demorado de todas as promotorias de
        atribuição similar como a menor velocidade existente, ou seja, o mesmo que 0 km/h. A partir
        daí, a velocidade máxima é o menor tempo necessário para finalizar um procedimento no MPRJ.
        Entre um e outro você encontrará a sua velocidade média, a velocidade média das promotorias
        de atribuição similar e seus procedimentos mais rápido e mais lento. Algumas destas
        informações estarão inseridas dentro do próprio velocímetro e outras nos ícones que o
        acompanham.
      </p>
    </div>
  );
}
export default IntroductionProcessingTime;
