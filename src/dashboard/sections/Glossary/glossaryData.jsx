import React from 'react';

import ArchiveRulesPdf from './glossaryPdfs/Regras_de_Arquivamento.pdf';
import InstaurationRulesPdf from './glossaryPdfs/Regras_de_Denuncia(1).pdf';
import PrecautionaryRulesPdf from './glossaryPdfs/Regras_de_Medida_Catelar.pdf';

const GLOSSARIO = [
  {
    title: 'PROMOTORIA MAIS RESOLUTIVA',
    type: 2,
    section: 'RESUMO DO DIA',
    definition:
      'Aqui são contados todos os movimentos que indicam que a investigação permitiu a deflagração de uma medida judicial de responsabilização do autor do crime, como o ajuizamentos de denúncia e a celebração de acordos de não persecução penal',
  },
  {
    title: 'PROMOTORIA MAIS RESOLUTIVA',
    type: 1,
    section: 'RESUMO DO DIA',
    definition:
      'Aqui são contados todos os movimentos que indicam que a atuação do Ministério Público permitiu a proteção de um interesse difuso, coletivo ou individual homogêneo na modalidade extrajudicial, como a celebração de Compromissos de Ajustamento de Conduta e arquivamentos com resolução do problema, assim como movimentos demonstrativos de que, apesar da impossibilidade de proteção do interesse na via extrajudicial, o Promotor de Justiça tomou as medidas judiciais cabíveis, voltadas a sua tutela, contando-se, nesse caso, os movimentos de ajuizamento de ações',
  },
  {
    title: 'MESMA ATRIBUIÇÃO',
    type: 2,
    section: 'RESUMO DO DIA',
    definition:
      'O sistema entende como mesma atribuição Promotorias de Investigação Penal com espectro de atribuição sobre o mesmo território',
  },
  {
    title: 'MESMA ATRIBUIÇÃO',
    type: 1,
    section: 'RESUMO DO DIA',
    definition:
      'O sistema entende como mesma atribuição Promotorias de Tutela Coletiva que abordem a combinação exata dos mesmos temas (cidadania, meio ambiente, defesa do consumidor, educação etc). Por exemplo, uma Promotoria com atribuição para a defesa do meio ambiente conjugada com a defesa do consumidor será comparada com todas as demais Promotorias que tenham atribuição conjugada para a defesa do meio ambiente e do consumidor, mas não com uma Promotoria especializada apenas na defesa da cidadania',
  },
  {
    title: 'VOLUME REGULAR',
    section: 'RESUMO DO DIA',
    definition:
      'Considera-se volume regular o acervo da Promotoria que está inserido na mediana de acervo das demais Promotorias de mesma atribuição',
  },
  {
    title: 'RAZOAVELMENTE MAIOR',
    section: 'RESUMO DO DIA',
    definition:
      'Considera-se volume razoavelmente maior o acervo da Promotoria que supera a mediana de acervo das demais Promotorias de mesma atribuição',
  },
  {
    title: 'RAZOAVELMENTE MENOR',
    section: 'RESUMO DO DIA',
    definition:
      'Considera-se volume razoavelmente menor o acervo da Promotoria que é inferior à mediana de acervo das demais Promotorias de mesma atribuição',
  },
  {
    title: 'DIA TÍPICO',
    section: 'RESUMO DO DIA',
    definition:
      'A quantidade de vistas em um dia típico está dentro da mediana dos demais dias anteriores, considerando-se os últimos 60 dias, excluindo sábados e domingos',
  },
  {
    title: 'DIA ATÍPICO',
    section: 'RESUMO DO DIA',
    definition:
      'A quantidade de vistas em um dia atípico está fora da mediana dos demais dias anteriores, considerando-se os últimos 60 dias, excluindo sábados e domingos',
  },
  {
    title: 'AISPS',
    section: 'SUA MESA',
    definition: 'Área territorial dentro do espectro de atribuição da Promotoria',
  },
  {
    title: 'ÚLTIMOS 30 DIAS',
    section: 'SUA MESA',
    definition: 'Últimos 30 (trinta) dias',
  },
  {
    title: 'PASS(ARAM)OU POR VOCÊ',
    section: 'SUA MESA',
    definition: 'Tiveram vista aberta para o Promotor de Justiça',
  },
  {
    title: 'APROVEITOU',
    section: 'SUA MESA',
    definition:
      'Celebrou qualquer movimento diferente da devolução à Delegacia de Polícia para a continuidade das investigações, como denúncias, arquivamentos, ajuizamento de medidas cautelares e acordos de não persecução penal.',
  },
  {
    title: 'PROCEDIMENTOS DAS SUAS AISPS',
    type: 2,
    section: 'SUA MESA',
    definition:
      'Quantidade de procedimentos referentes ao território que está sob o espectro de atuação da Promotoria, independentemente de estarem ou não vinculados ao órgão de execução',
  },
  {
    title: 'MAIORES VOLUMES DO MÊS',
    section: 'SUA MESA',
    definition:
      'Promotorias com maior volume de investigações vinculadas a ela, estejam os procedimentos no órgão de execução ou externamente',
  },
  {
    title: 'MAIORES REDUÇÕES DO MÊS',
    section: 'SUA MESA',
    definition: 'Promotorias de Justiça que mais reduziram seu acervo naquele mês',
  },
  {
    title: 'SEU ACERVO AUMENTOU',
    section: 'SUA MESA',
    definition: 'Ocorreu um aumento do quantitativo de investigações vinculadas à Promotoria',
  },
  {
    title: 'SEU ACERVO DIMINUIU',
    section: 'SUA MESA',
    definition: 'Ocorreu uma redução do quantitativo de investigações vinculadas à Promotoria',
  },
  {
    title: 'RECORDE DE AÇÕES AJUIZADAS NO MÊS',
    section: 'SUA MESA',
    definition:
      'A lista indica as Promotorias com maior volume de ações ajuizadas no respectivo mês',
  },
  {
    title: 'ARQUIVAMENTOS',
    type: 2,
    section: 'RADAR DE PERFORMANCE',
    definition: (
      <>
        Os andamentos que são considerados arquivamentos para PIPs podem ser encontrados{" "}
        <a href={ArchiveRulesPdf} target="new">nesse PDF.</a>
      </>
    ),
  },
  {
    title: 'DENÚNCIAS',
    section: 'RADAR DE PERFORMANCE',
    definition: (
      <>
        Os andamentos que são considerados denúncias podem ser encontrados{" "}
        <a href={InstaurationRulesPdf} target="new">nesse PDF.</a>
      </>
    ),
  },
  {
    title: 'MEDIDAS CAUTELARES',
    section: 'RADAR DE PERFORMANCE',
    definition: (
      <>
        Os andamentos que são considerados cautelares podem ser encontrados{" "}
        <a href={PrecautionaryRulesPdf} target="new">nesse PDF.</a>
      </>
    ),
  },
  // {
  //   title: 'ACORDOS DE NÃO PERSECUÇÃO',
  //   section: 'RADAR DE PERFORMANCE',
  //   definition: 'Os andamentos que são considerados acordos neste campo são...',
  // },
  {
    title: 'DEVOLUÇÕES À DP',
    section: 'RADAR DE PERFORMANCE',
    definition:
      'Os andamentos que são considerados baixas à DP neste campo são todos aqueles que finalizaram vista e não são um dos outros quatro',
  },
  {
    title: 'AÇÕES CIVIL PÚBLICAS',
    section: 'RADAR DE PERFORMANCE',
    definition:
      'Os andamentos que são considerados ACP neste campo são aqueles cadastrados com o código 6251 (Ajuizamento de Ação > Petição Inicial).',
  },
  {
    title: 'TERMOS DE AJUIZAMENTO DE CONDUTA',
    section: 'RADAR DE PERFORMANCE',
    definition:
      'Os andamentos que são considerados TAC neste campo são aqueles cadastrados com os códigos 6326 (Arquivamento > Com remessa ao Conselho Superior > Integral com TAC) e 6655 (Arquivamento > Com remessa ao Conselho Superior > Parcial (Tutela coletiva) > Com TAC).',
  },
  {
    title: 'INDEFERIMENTOS DE PLANO',
    section: 'RADAR DE PERFORMANCE',
    definition:
      'Os andamentos que são considerados indeferimentos de plano neste campo são aqueles cadastrados com o código 6322 (Indeferimento de Instauração > Instauração de Procedimento ou Inquérito Civil Público)',
  },
  {
    title: 'INSTAURAÇÃO DE INVESTIGAÇÕES',
    section: 'RADAR DE PERFORMANCE',
    definition:
      'Os andamentos que são considerados instaurações de investigações neste campo são aqueles cadastrado com os códigos 1092 (Instauração de Procedimento Administrativo), 1094 (Instauração de Inquérito Civil, 1095 (Instauração de Procedimento Preparatório, 6007 (Reconsideração > Reconsideração do indeferimento de Notícia de Fato), 6011 (Portaria > Instauração de Procedimento Preparatório), 6012 (Portaria > Instauração de Inquérito Civil) e 6013 (Portaria > Instauração de Procedimento Administrativo).',
  },
  // {
  //   title: 'DOCUMENTOS SINALIZADOS COMO FECHADOS',
  //   section: 'CENTRAL DE ALERTAS',
  //   definition: 'Neste alerta, eu busco lhe avisar que um documento que está registrado  como fechado está com vista aberta em sua mesa. Neste caso, o documento provavelmente não deveria estar ali, ou está com registro muito errado no banco.',
  // },
  {
    title: 'VISTAS ABERTAS',
    section: 'INDICADORES DE SUCESSO',
    definition:
      'O conceito de vista aberta é bastante familiar para os promotores, mas há um detalhe que precisa ser explicado com relação ao período da abertura de vista: para os indicadores, não se conta somente a data da abertura da vista, mas sim se ela esteve aberta em algum momento dentro deste período. Isso abarca vistas que estiveram abertas em momento anterior e continuaram abertas durante o período. Esta mesma percepção temporal foi aplicada nas análises detalhadas dos botões do "Sua Mesa". Nos outros lugares, como no botão "Vistas Abertas" e no "Resumo do Dia", o que importa é a data de abertura da vista.',
  },
];
export default GLOSSARIO;
