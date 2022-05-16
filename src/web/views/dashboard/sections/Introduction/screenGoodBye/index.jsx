import React from 'react';
import introductionWrapper from '../introduction.module.css';

function ScreenGoodBye() {
  return (
    <div className={introductionWrapper}>
      <div className="introduction-goodbye">
        <h3>Até mais!</h3>
        <p>
          Espero ter conseguido explicar bem o que eu faço. Meus criadores me disseram para te dizer
          que, em caso de dúvidas, eles ficarão muito felizes em te ajudar. Eu não sei exatamente o
          que é ficar feliz, mas estou repassando o recado. Para obter ajuda, basta enviar um e-mail
          para gadg.atendimento@mprj.mp.br. Agora voltarei ao trabalho e aguardo suas instruções.
        </p>
      </div>
    </div>
  );
}
export default ScreenGoodBye;
