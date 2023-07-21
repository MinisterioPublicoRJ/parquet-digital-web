/* eslint-disable */

import React from 'react';

import { formatPercentage } from '../../../../../utils';

function openInvestigationsMetrics({ variacaoAcervo }) {
  const formattedVariation = formatPercentage(Math.abs(variacaoAcervo));
  return (
    <>
    {variacaoAcervo ? (
    <p>
      Seu acervo
      <strong>{` ${variacaoAcervo > 0 ? 'aumentou' : 'diminuiu'} ${formattedVariation} `}</strong> 
      nos últimos 30 dias.
    </p>
    ) : (
    <p>
      Seu acervo{" "}
      <strong>não aumentou ou diminuiu</strong>{" "}
      nos últimos 30 dias.
    </p>
    )}
    </>
  );
}

function courtCasesMetrics({
  nrAcoesUltimos60Dias,
  variacao60Dias,
  nrAcoes60DiasAnterior,
  nrAcoes12MesesAtual,
  variacao12Meses,
  nrAcoes12MesesAnterior,
}) {
  const monthVariation = formatPercentage(Math.abs(variacao60Dias));
  const yearVariation = formatPercentage(Math.abs(variacao12Meses));
  return (
    <div>
    {nrAcoesUltimos60Dias ? (
      <strong>
      Você ajuizou
      <strong>
        {` ${nrAcoesUltimos60Dias} ${nrAcoesUltimos60Dias === 1 ? 'ação' : 'ações'} `}</strong>
        nos últimos 60 dias.{" "} 
      </strong>
      ) : (
      <span>
      Você não ajuizou {" "}
      <strong>nenhuma ação nos últimos 60 dias.</strong>{" "}
      </span>
    )}
    <>
    {monthVariation === "0%" ? (
      <span> Não houve aumento nem redução </span>
    ) : (
    <strong>
      <span>Houve {variacao60Dias >= 0 ? ` aumento de ${monthVariation} ` : ` redução de ${monthVariation} `}</span>
    </strong>
    )}
    </>
    {" "}
    com relação ao mesmo período anterior, quando{" "}
    {nrAcoes60DiasAnterior ? (
      <strong>
        <span>{` ${nrAcoes60DiasAnterior} ${nrAcoes60DiasAnterior === 1 ? 'ação' : 'ações'}.`} </span>
        foram ajuizadas
      </strong>
    ):(
      <strong>nenhuma ação foi ajuizada.</strong>
    )}
    <p>
        No último ano, você ajuizou
        <strong>
        <span>{` ${nrAcoes12MesesAtual} ${nrAcoes12MesesAtual === 1 ? 'ação' : 'ações'}`},{" "}
          {variacao12Meses ? (
            <strong>com {variacao12Meses >= 0 ? `aumento` :  `redução`} de {yearVariation}</strong>
          ):(
            <strong>não houve aumento nem redução</strong>
          )}
        </span>       
        </strong>
        {" "}em comparação com o ano anterior em que
        <strong>
          <span>{` ${nrAcoes12MesesAnterior} ${nrAcoes12MesesAnterior === 1 ? 'ação foi ajuizada.' : 'ações foram ajuizadas.'} `}</span>
        </strong>
        
      </p>
    </div>
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
    <>
    {nrDocumentosDistintosAtual ? (
      <p>
      Constatei que
      <strong>{` ${nrDocumentosDistintosAtual} ${nrDocumentosDistintosAtual === 1 ? 'inquérito passou' : 'inquéritos passaram'} por você `}</strong>
      neste mês, com
      <strong>{` ${nrAberturasVistaAtual} ${nrAberturasVistaAtual === 1 ? 'abertura' : 'aberturas'} de vista`}</strong>
      . Você aproveitou
      <strong>{` ${nrAproveitamentosAtual} ${nrAproveitamentosAtual === 1 ? 'caso' : 'casos'} para denúncias, cautelares e arquivamentos. `}
      {formattedVariation === "0%" ? (
      <span> Não houve {" "}
        <strong>aumento nem redução</strong>{" "}
      </span>
      ) : (
      <strong>
        {` ${
          variacaoAproveitamentos > 0 ? 'Aumento' : 'Redução'
        } de ${formattedVariation} `}
      </strong>
      )}
      </strong>
      nos últimos 30 dias.
      </p>
    ) : (
      <p> Não há
        <strong> novos inqueritos</strong>.
      </p>
    )}
  </>
  );
}

function aispsMetrics({ variacaoAcervo }) {
  const formattedVariation = formatPercentage(Math.abs(variacaoAcervo));

  return (
    <>
    {formattedVariation === "0%" ? (
      <p> Não houve {" "}
        <strong>aumento nem redução no número de procedimentos das suas AISPs </strong>nos últimos 30 dias.
      </p>
    ) : (
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
    )}
  </>
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
    <>
    <p>
    {nrDocumentosDistintosAtual ? (
        <span> Constatei que 
        <strong>
          {` ${nrDocumentosDistintosAtual} ${
            nrDocumentosDistintosAtual === 1 ? 'PIC passou' : 'PICs passaram'
          } por você `} 
        </strong>
        </span>
      ) : (
        <span>Constatei que <strong>nenhum PIC</strong> passou por você </span>
      )}
      neste mês,{" "}
      {nrInstauradosAtual ? (
        <strong>
        {` ${nrInstauradosAtual} ${
          nrInstauradosAtual === 1 ? 'foi instaurado' : 'foram instaurados'
        } por você `} 
        </strong>
        ) : (
        <strong>nenhum foi instaurado</strong>
      )}
      {" "}nesse período.
      {nrAberturasVistaAtual === 1
        ? ' Foi 1 abertura '
        : ` Foram ${nrAberturasVistaAtual} aberturas `}
      de vista,{" "}
      {nrAproveitamentosAtual ? (
        <span>e você aproveitou <strong>{nrAproveitamentosAtual}</strong>
        {" "} {nrAproveitamentosAtual === 1 ? 'caso para' : `casos para`}
        </span>
      ):(
        <span>você não aproveitou nenhum caso para</span>
      )}
      {" "}<strong>denúncias, cautelares e arquivamentos.</strong>
      {formattedVariation === "0%"  ? (
      <span> Não houve {" "}
        <strong>aumento nem redução</strong> nos últimos 30 dias.
      </span>
      ) : (
      <span>
      <strong>{`${variacaoAberturasVista > 0 ? ' Aumento' : ' Diminuição'} de ${formattedVariation} `}</strong> 
      {" "}nos últimos 30 dias.
      </span>
      )}
      </p>
    </>
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
