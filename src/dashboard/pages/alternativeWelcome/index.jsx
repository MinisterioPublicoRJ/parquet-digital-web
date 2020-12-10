import React from 'react';
import { LogoAlternativeWelcome } from '../../../assets';
import { useAuth } from '../../../app/authContext';
import './styles.css';
import BGMP from '../../../assets/imgs/bgMp.png';
import { ALTERNATIVE_SCREEN } from './mockAlternativeScreen';

function AlternativeWelcome() {
  const { user, currentOffice } = useAuth();
  console.log(user);
  console.log(currentOffice);

  return (
    <section className="sectionAlternativeWelcome">
      <div className="bgMp">
        <img src={BGMP} alt="logo" />
      </div>
      <div className="mainAlternativeWelcome">
        <div className="boxTextsAlternativeWelcome">
          <LogoAlternativeWelcome />
          <div className="firstTextsAlternativeWelcome">
            <h2>
              Olá, bem-vindo(a) ao
              <strong> Parquet Digital</strong>
            </h2>
            <p>
              O Parque Digital é um painel multitarefas criado para auxiliar a gestão e o
              entendimento do dia-a-dia com base em evidências e uma análise apurada da sua
              Promotoria.
            </p>
          </div>
        </div>
        <div className="mainTextsAlternativeWelcome">
          <div className="mainBoxTextsAlternativeWelcome">
            <h4>Que análise fazemos aqui?</h4>
            <p>
              Análises estatísticas e comparativas entre sua promotoria e o grupo de atribuição
              similar. Os indicadores de análise comparam os números de procedimentos e atos
              processuais relevantes entre promotorias, eficiência na prestação jurisdicional e
              tempo gasto para a resolução de casos. Ainda, a ferramenta conta com resumo do dia,
              listagem dos procedimentos e uma central de alertas bastante útil para o gerenciamento
              de acervo e problemas, com o auxílio do robô na elaboração de minutas de peças
              processuais e no apontamento de problemas no acervo e em indicadores de problemas
              sociais de relevância para sua área e atribuição.
            </p>
          </div>
          <div className="mainBoxTextsAlternativeWelcome">
            <h4>Por que não posso acessar?</h4>
            <p>
              {!currentOffice.nomeOrgao ? (
                <p>
                  Olá <strong>{user.nome}</strong> em uma breve verificação, por consulta no banco de dados do MPRJ,
                  percebemos que a atribuição na qual está atuando infelizmente ainda
                  não está disponível para este grupo. Estamos trabalhando para atender as demandas
                  de todas as atribuições da casa, mas no momento estamos com a operação disponível
                  apenas para Promotorias de Justiça de Tutela Coletiva e de Investigação Penal. No
                  entanto, algumas ferramentas já existentes e disponíveis para todos (as) podem
                  cumprir parte das funções do Parquet Digital. Confira abaixo!
                </p>
              ) : (
                <p>
                  Em uma breve verificação, por consulta no banco de dados do MPRJ, percebemos que a
                  atribuição na qual o(a) Doutor(a) está atuando é <strong>{currentOffice.nomeOrgao }</strong> e a aplicação
                  infelizmente ainda não está disponível para este grupo. Estamos trabalhando para
                  atender as demandas de todas as atribuições da casa, mas no momento estamos com a
                  operação disponível apenas para Promotorias de Justiça de Tutela Coletiva e de
                  Investigação Penal. No entanto, algumas ferramentas já existentes e disponíveis
                  para todos (as) podem cumprir parte das funções do Parquet Digital. Confira
                  abaixo!
                </p>
              )}
            </p>
          </div>
        </div>
        <h4>Sugestões de ferramentas</h4>
        <p>Seleção de ferramentas que podem ajudar na sua atuação</p>
        <div className="div-tools">
          {ALTERNATIVE_SCREEN.map((i) => (
            <>
              <section className="div-tools-imgs">
                <img
                  key={i.id}
                  alt="Logo-parceiros"
                  src={process.env.PUBLIC_URL + i.img}
                  width="210"
                  height="140"
                />
                <div className="div-tools-btn">
                  <h3>{i.title}</h3>
                  <a href={i.url} target="_blank">
                    <button type="button">Acessar</button>
                  </a>
                </div>
                <p>{i.text}</p>
              </section>
            </>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AlternativeWelcome;
