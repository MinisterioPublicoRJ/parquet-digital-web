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

export default function MetricsFormatter({ metrics, tab }) {
  console.log('tab', tab, metrics);
  switch (tab) {
    case 'openInvestigations':
      return openInvestigationsMetrics(metrics);
    case 'courtCases':
      return courtCasesMetrics(metrics);
    default:
      return null;
  }
}
