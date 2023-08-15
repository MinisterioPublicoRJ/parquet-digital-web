import React from 'react';

import {
  altWelcomeOuter,
  altWelcomeImg,
  altWelcomeHeaderLogo,
  altWelcomeHeaderText,
  altWelcomeTextsFirst,
  altWelcomeTextsSecond,
  altWelcomeSuggestions,
  altWelcomeSuggestionsItemRow,
  altWelcomeSuggestionsItem,
  altWelcomeSuggestionsItemImg,
  altWelcomeSuggestionsItemData,
} from './styles.module.css';

import BGMP from '../../../../assets/imgs/unavailableBanner.png';
import { LogoAlternativeWelcome } from '../../../../assets';
import { ALTERNATIVE_SCREEN_DATA } from './suggestionsData';

// TODO: tirar texto duplicado

function AlternativeWelcome() {
  return (
    <div className={altWelcomeOuter}>
      <div className={altWelcomeImg}>
        <img src={BGMP} alt="logo" />
      </div>
      <div className={altWelcomeHeaderLogo}>
        <LogoAlternativeWelcome />
      </div>
      <div className={altWelcomeHeaderText}>
        <h1>
          Olá, bem-vindo(a) ao
          <strong> Parquet Digital</strong>
        </h1>
        <p>
          O Parquet Digital é um painel multitarefas criado para auxiliar a gestão e o entendimento
          do dia-a-dia com base em evidências e uma análise apurada da sua Promotoria.
        </p>
      </div>
      <div className={altWelcomeTextsFirst}>
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
      </div>
      <div className={altWelcomeTextsSecond}>
        <h2>Por que não posso acessar?</h2>
        <p>
          Em uma breve verificação, por consulta no banco de dados do MPRJ, percebemos que a
          atribuição na qual está atuando infelizmente ainda não é atendida pela aplicação. Estamos
          trabalhando para atender as demandas de todas as atribuições da casa, mas no momento
          estamos com a operação disponível apenas para Promotorias de Justiça de Tutela Coletiva e
          de Investigação Penal. No entanto, algumas ferramentas já existentes e disponíveis para
          todos (as) podem cumprir parte das funções do Parquet Digital. Confira abaixo!
        </p>
      </div>
      <div className={altWelcomeSuggestions}>
        <h2>Sugestões de ferramentas</h2>
        <p>Seleção de ferramentas que podem ajudar na sua atuação</p>
        <div className={altWelcomeSuggestionsItemRow}>
          {ALTERNATIVE_SCREEN_DATA.map(({ id, title, text, img, url }) => (
            <div className={altWelcomeSuggestionsItem} key={id}>
              <div className={altWelcomeSuggestionsItemImg}>
                <img src={img} alt={`${title} logo`} />
              </div>
              <div className={altWelcomeSuggestionsItemData}>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                <div>
                  <a href={url} target="new">
                    Acessar
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AlternativeWelcome;
