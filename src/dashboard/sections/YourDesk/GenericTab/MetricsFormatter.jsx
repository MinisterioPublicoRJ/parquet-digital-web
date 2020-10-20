import React from 'react';

import { formatPercentage } from '../../../../utils';

function openInvestigationsMetrics({ variacaoAcervo }) {
  const formattedVariation = formatPercentage(Math.abs(variacaoAcervo));
  return (
    <p>
      Seu acervo
      <strong>{` ${variacaoAcervo > 0 ? 'aumentou' : 'diminuiu'}  ${formattedVariation} `}</strong>
      nos últimos 30 dias.
    </p>
  );
}

function courtCasesMetrics({ nrAcoes12MesesAtual, nrAcoesUltimos60Dias, variacao12Meses }) {
  const formattedVariation = formatPercentage(Math.abs(variacao12Meses));
  const formattedVariationCurrentAction = formatPercentage(Math.abs(nrAcoes12MesesAtual));

  return (
    <p>
      Você ajuizou
      <strong>{` ${nrAcoesUltimos60Dias} ${
        nrAcoesUltimos60Dias === 1 ? 'ação' : 'ações'
      } `}</strong>
      nos últimos 60 dias.
      <strong>
        {variacao12Meses >= 0
          ? ` Aumento de ${formattedVariation} `
          : ` Redução de ${formattedVariation} `}
      </strong>
      com relação ao mesmo período anterior.
      <p>No último ano, você  ajuizou  <strong>{` ${nrAcoes12MesesAtual} ${
        nrAcoes12MesesAtual === 1 ? 'ação' : 'ações'} `}</strong>
      <strong> com aumento de {` ${formattedVariationCurrentAction} `}</strong>{' '}
        em comparação com o ano anterior
      </p>
    </p>
  );
}

function inquiriesMetrics({
  nrDocumentosDistintosAtual,
  nrAberturasVistaAtual,
  nrAproveitamentosAtual,
  variacaoAproveitamentos,
}) {
  const formattedVariation = formatPercentage(Math.abs(variacaoAproveitamentos));
  return (
    <p>
      Constatei que
      <strong>{` ${nrDocumentosDistintosAtual} ${nrDocumentosDistintosAtual === 1 ? 'inquérito passou' : 'inquéritos passaram'} por você `}</strong>
      neste mês, com
      <strong>{` ${nrAberturasVistaAtual} ${nrAberturasVistaAtual === 1 ? 'abertura' : 'aberturas'} de vista`}</strong>
      . Você aproveitou
      <strong>{` ${nrAproveitamentosAtual} ${nrAproveitamentosAtual === 1 ? 'caso' : 'casos'} para denúncias, cautelares e arquivamentos. Aumento de ${formattedVariation} `}</strong>
      nos últimos 30 dias.
    </p>
  );
}

function aispsMetrics({ variacaoAcervo }) {
  const formattedVariation = formatPercentage(Math.abs(variacaoAcervo));
  return (
    <p>
      Houve
      {variacaoAcervo > 0 ? ' um ' : ' uma '}
      <strong>
        {` ${
          variacaoAcervo > 0 ? 'aumento' : 'redução'
        } de ${formattedVariation} no número de procedimentos das suas AISPs `}
      </strong>
      nos últimos 30 dias.
    </p>
  );
}

function picsMetrics({
  nrDocumentosDistintosAtual,
  nrInstauradosAtual,
  nrAberturasVistaAtual,
  nrAproveitamentosAtual,
  variacaoAberturasVista,
}) {
  const formattedVariation = formatPercentage(Math.abs(variacaoAberturasVista));
  return (
    <p>
      Constatei que
      <strong>
        {` ${nrDocumentosDistintosAtual} ${
          nrDocumentosDistintosAtual === 1 ? 'PIC passou' : 'PICs passaram'
        } por você `}
      </strong>
      neste mês, sendo que
      <strong>{` ${nrInstauradosAtual} `}</strong>
      deles
      {nrInstauradosAtual === 1 ? ' foi ' : ' foram '}
      instaurados nesse período.
      {nrAberturasVistaAtual === 1
        ? ' Foi 1 abertura '
        : ` Foram ${nrAberturasVistaAtual} aberturas `}
      de vista, e você aproveitou
      <strong>{` ${nrAproveitamentosAtual} `}</strong>
      {nrAproveitamentosAtual === 1 ? ' caso para ' : ` casos para `}
      <strong>denúncias, cautelares e arquivamentos.</strong>
      <strong>{`${variacaoAberturasVista > 0 ? ' Aumento' : ' Diminuição'} de ${formattedVariation} `}</strong>
      nos últimos 30 dias.
    </p>
  );
}

export default function MetricsFormatter({ metrics, tab }) {
  switch (tab) {
    case 'openInvestigations':
      return openInvestigationsMetrics(metrics);
    case 'courtCases':
      return courtCasesMetrics(metrics);
    case 'inquiries':
      return inquiriesMetrics(metrics);
    case 'aisps':
      return aispsMetrics(metrics);
    case 'pics':
      return picsMetrics(metrics);
    default:
      return null;
  }
}
