import React from 'react';

import { formatPercentage } from '../../../../../utils';

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
      <strong>{` ${nrAcoesUltimos60Dias} ${nrAcoesUltimos60Dias === 1 ? 'ação' : 'ações'} `}</strong>
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
      <strong>{` ${nrDocumentosDistintosAtual} ${nrDocumentosDistintosAtual === 1 ? 'inquérito passou' : 'inquéritos passaram'} por você `}</strong>
      nos últimos 30 dias, com
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
    <p className="paragraphWrapper">
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
    <p className="paragraphWrapper">
      Constatei que
      <strong>
        {` ${nrDocumentosDistintosAtual} ${
          nrDocumentosDistintosAtual === 1 ? 'PIC passou' : 'PICs passaram'
        } por você `}
      </strong>
      nos últimos 30 dias, sendo que
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
      <strong>{`${variacaoAberturasVista > 0 ? ' Aumento' : ' Dimininuição'} de ${formattedVariation} `}</strong>
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
