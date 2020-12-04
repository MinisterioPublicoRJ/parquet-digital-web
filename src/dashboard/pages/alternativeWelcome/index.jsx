import React from 'react';
import { LogoAlternativeWelcome } from '../../../assets';
import './styles.css';

function AlternativeWelcome() {
  return (
    <section className="">
      <div className="mainAlternativeWelcome">
        <LogoAlternativeWelcome />
        <h2>Olá, bem-vindo(a) ao Parquet Digital</h2>
        <p>
          O Parque Digital é um painel multitarefas criado para auxiliar a gestão e o entendimento
          do dia-a-dia com base em evidências e uma análise apurada da sua Promotoria.
        </p>
      </div>
      <div>
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
        <h2>Por que não posso acessar?</h2>
        <p>
          Em uma breve verificação, por consulta no banco de dados do MPRJ, percebemos que a
          atribuição na qual o(a) Doutor(a) está atuando é XXXXXXXXXX e a aplicação infelizmente
          ainda não está disponível para este grupo. Estamos trabalhando para atender as demandas de
          todas as atribuições da casa, mas no momento estamos com a operação disponível apenas para
          Promotorias de Justiça de Tutela Coletiva e de Investigação Penal. No entanto, algumas
          ferramentas já existentes e disponíveis para todos (as) podem cumprir parte das funções do
          Parquet Digital. Confira abaixo!
        </p>
      </div>
    </section>
  );
}

export default AlternativeWelcome;
