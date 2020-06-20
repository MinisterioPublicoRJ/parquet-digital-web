import React from 'react';

import { formatPercentage } from '../../../utils';

function openInvestigationsMetrics({ variacaoAcervo }) {
  const formattedVariation = formatPercentage(Math.abs(variacaoAcervo));
  return (
    <p className="paragraphWrapper">
      Seu acervo
      <strong>{` ${variacaoAcervo > 0 ? 'aumentou' : 'diminuiu'}  ${formattedVariation} `}</strong>
      nos últimos 30 dias.
    </p>
  );
}

function courtCasesMetrics({ nrAcoesUltimos60Dias, variacao12Meses }) {
  const formattedVariation = formatPercentage(Math.abs(variacao12Meses));
  return (
    <p className="paragraphWrapper">
      Você propôs
      <strong>{` ${nrAcoesUltimos60Dias} ações `}</strong>
      nos últimos 60 dias, com
      <strong>
        {variacao12Meses >= 0
          ? ` um aumento de ${formattedVariation} `
          : ` uma redução de ${formattedVariation} `}
      </strong>
      nos últimos 12 meses.
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
    <p className="paragraphWrapper">
      Constatei que
      <strong>{` ${nrDocumentosDistintosAtual} inquéritos passaram por você `}</strong>
      nos últimos 30 dias, com
      <strong>{` ${nrAberturasVistaAtual} aberturas de vista`}</strong>. Você aproveitou
      <strong>{` ${nrAproveitamentosAtual} casos para denúncias, cautelares e arquivamentos. Aumento de ${formattedVariation} `}</strong>
      nos últimos 30 dias.
    </p>
  );
}

function aispsMetrics({ variacaoAcervo }) {
  const formattedVariation = formatPercentage(Math.abs(variacaoAcervo));
  return (
    <p className="paragraphWrapper">
      Houve
      {variacaoAcervo > 0 ? ' um ' : ' uma '}
      <strong>
        {` ${
          variacaoAcervo > 0 ? 'aumento' : 'redução'
        } de ${formattedVariation} no número de procedimentos da sua AISP `}
      </strong>
      nos últimos 30 dias.
    </p>
  );
}

export default function MetricsFormatter({ metrics, tab }) {
  console.log('tab', tab, metrics);
  switch (tab) {
    case 'openInvestigations':
      return openInvestigationsMetrics(metrics);
    case 'courtCases':
      return courtCasesMetrics(metrics);
    case 'inquiries':
      return inquiriesMetrics(metrics);
    case 'aisps':
      return aispsMetrics(metrics);
    default:
      return null;
  }
}
