import React from 'react';

import './styles.css';

import BGMP from '../../../assets/imgs/bgMp.png';
import { useAuth } from '../../../app/authContext';
import { LogoAlternativeWelcome } from '../../../assets';
import { ALTERNATIVE_SCREEN } from './suggestionsData';

function AlternativeWelcome() {
  const { currentOffice } = useAuth();
  let officeText = (
    <p>
      Em uma breve verificação, por consulta no banco de dados do MPRJ, percebemos que a atribuição
      na qual está atuando infelizmente ainda não é atendida pela aplicação. Estamos trabalhando
      para atender as demandas de todas as atribuições da casa, mas no momento estamos com a
      operação disponível apenas para Promotorias de Justiça de Tutela Coletiva e de Investigação
      Penal. No entanto, algumas ferramentas já existentes e disponíveis para todos (as) podem
      cumprir parte das funções do Parquet Digital. Confira abaixo!
    </p>
  );

  if (currentOffice) {
    officeText = (
      <p>
        Em uma breve verificação, por consulta no banco de dados do MPRJ, percebemos que a
        atribuição na qual o(a) Doutor(a) está atuando é
        <strong>{` ${currentOffice.nomeOrgao} `}</strong> e a aplicação infelizmente ainda não está
        disponível para este grupo. Estamos trabalhando para atender as demandas de todas as
        atribuições da casa, mas no momento estamos com a operação disponível apenas para
        Promotorias de Justiça de Tutela Coletiva e de Investigação Penal. No entanto, algumas
        ferramentas já existentes e disponíveis para todos (as) podem cumprir parte das funções do
        Parquet Digital. Confira abaixo!
      </p>
    );
  }

  return (
    <div className="altWelcome-outer">
      <div className="altWelcome-img">
        <img src={BGMP} alt="logo" />
      </div>
      <div className="altWelcome-header-logo">
        <LogoAlternativeWelcome />
      </div>
      <div className="altWelcome-header-text">
        <h1>
          Olá, bem-vindo(a) ao
          <strong> Parquet Digital</strong>
        </h1>
        <p>
          O Parquet Digital é um painel multitarefas criado para auxiliar a gestão e o entendimento
          do dia-a-dia com base em evidências e uma análise apurada da sua Promotoria.
        </p>
      </div>
      <p className="altWelcome-texts--first">
        <h2>Que análise fazemos aqui?</h2>
        <p>
          Análises estatísticas e comparativas entre sua promotoria e o grupo de atribuição similar.
          Os indicadores de análise comparam os números de procedimentos e atos processuais
          relevantes entre promotorias, eficiência na prestação jurisdicional e tempo gasto para a
          resolução de casos. Ainda, a ferramenta conta com resumo do dia, listagem dos
          procedimentos e uma central de alertas bastante útil para o gerenciamento de acervo e
          problemas, com o auxílio do robô na elaboração de minutas de peças processuais e no
          apontamento de problemas no acervo e em indicadores de problemas sociais de relevância
          para sua área e atribuição.
        </p>
      </p>
      <p className="altWelcome-texts--second">
        <h2>Por que não posso acessar?</h2>
        {officeText}
      </p>
      <div className="altWelcome-suggestions">
        <h2>Sugestões de ferramentas</h2>
        <p>Seleção de ferramentas que podem ajudar na sua atuação</p>
        <div className="altWelcome-suggestions-itemRow">
          {ALTERNATIVE_SCREEN.map((item) => (
            <div className="altWelcome-suggestions-item">
              <img
                key={item.id}
                alt={item.img}
                src={item.img}
              />
              <div className="div-tools-btn">
                <h3>{item.title}</h3>
                <a href={item.url}>
                  <button type="button">Acessar</button>
                </a>
              </div>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AlternativeWelcome;
