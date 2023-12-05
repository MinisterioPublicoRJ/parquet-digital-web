/* eslint-disable */
import React from 'react';
import { formatPercentage } from '../../../../../utils';
import { useAppContext } from '../../../../../../core/app/App.context';

export default function MetricsProsecutions({ metrics, dbName }) {
  const { currentOffice } = useAppContext();
  const type = currentOffice ? currentOffice.tipo : undefined;

  function courtCasesMetrics({
    nr_acoes_ultimos_60_dias,
    variacao_60_dias,
    nr_acoes_60_dias_anterior,
    nr_acoes_12_meses_atual,
    variacao_12_meses,
    nr_acoes_12_meses_anterior,
    variacao_30_dias,
  }) {
    const monthVariation = formatPercentage(Math.abs(variacao_60_dias));
    const yearVariation = formatPercentage(Math.abs(variacao_12_meses));
    const formattedVariation = formatPercentage(Math.abs(variacao_30_dias));
    return (
      <p>
        {variacao_30_dias ? (
          <span>
            Seu acervo
            <span>
              {` ${variacao_30_dias > 0 ? 'aumentou' : 'diminuiu'} `}{' '}
              <strong> {formattedVariation} </strong>
            </span>
            nos últimos 30 dias.
          </span>
        ) : (
          <span> Seu acervo não aumentou ou diminuiu nos últimos 30 dias. </span>
        )}
        {nr_acoes_ultimos_60_dias ? (
          <span>
            Nos últimos 60 dias, você ajuizou <strong> {nr_acoes_ultimos_60_dias} </strong>
            {` ${nr_acoes_ultimos_60_dias === 1 ? 'ação' : 'ações'} `}
          </span>
        ) : (
          <span>
            {' '}
            Você não ajuizou <strong>nenhuma</strong> ação nos últimos 60 dias.{' '}
          </span>
        )}
        <>
          {!monthVariation || monthVariation === '0%' ? (
            <span> Não houve aumento nem redução </span>
          ) : (
            <span>
              Houve {variacao_60_dias >= 0 ? ` aumento de` : ` redução de `}{' '}
              <strong>{monthVariation}</strong>
            </span>
          )}
        </>{' '}
        com relação ao mesmo período anterior, quando{' '}
        {nr_acoes_60_dias_anterior ? (
          <span>
            <span>
              <strong>{nr_acoes_60_dias_anterior}</strong>
              {` ${
                nr_acoes_60_dias_anterior === 1 ? 'ação foi ajuizada' : 'ações foram ajuizadas'
              }.`}
            </span>
          </span>
        ) : (
          <span>
            <strong>nenhuma</strong> ação foi ajuizada.
          </span>
        )}
        <p>
          No último ano, você ajuizou
          <span>
            <span>
              <strong> {nr_acoes_12_meses_atual} </strong>
              {`${nr_acoes_12_meses_atual === 1 ? 'ação' : 'ações'}`},{' '}
              {variacao_12_meses ? (
                <span>
                  com {variacao_12_meses >= 0 ? `aumento` : `redução`} de{' '}
                  <strong>{yearVariation} </strong>
                </span>
              ) : (
                <span>não houve aumento nem redução</span>
              )}
            </span>
          </span>{' '}
          em comparação com o ano anterior em que{' '}
          {nr_acoes_12_meses_anterior > 0 ? (
            <span>
              <strong> {nr_acoes_12_meses_anterior} </strong>
              {`${
                nr_acoes_12_meses_anterior === 1 ? 'ação foi ajuizada.' : 'ações foram ajuizadas.'
              } `}
            </span>
          ) : (
            <span>
              <strong>nenhuma</strong> ação foi ajuizada.{' '}
            </span>
          )}
        </p>
      </p>
    );
  }

  function inquiriesMetrics({
    nr_documentos_distintos_atual,
    nr_aberturas_vista_atual,
    nr_aproveitamentos_atual,
    variacao_aproveitamentos,
  }) {
    const formattedVariation = formatPercentage(Math.abs(variacao_aproveitamentos));
    return (
      <>
        {nr_documentos_distintos_atual ? (
          <span>
            Este mês,
            <strong> {nr_documentos_distintos_atual} </strong>
            <span>{`${
              nr_documentos_distintos_atual === 1 ? 'inquérito passou' : 'inquéritos passaram'
            } por você, `}</span>{' '}
            com
            <span>
              <strong> {nr_aberturas_vista_atual}</strong>
              {` ${nr_aberturas_vista_atual === 1 ? 'abertura' : 'aberturas'} de vista`}.{' '}
            </span>
            <span>
              {nr_aproveitamentos_atual > 0 ? (
                <span>
                  Você aproveitou
                  <strong> {nr_aproveitamentos_atual} </strong>
                  {`${
                    nr_aproveitamentos_atual === 1 ? 'caso' : 'casos'
                  } para denúncias, cautelares e arquivamentos. `}
                </span>
              ) : (
                <span>
                  Você não aproveitou <strong>nenhum</strong> caso para denúncias, cautelares e
                  arquivamentos.{' '}
                </span>
              )}
              {!formattedVariation || formattedVariation === '0%' ? (
                <span> Não houve aumento nem redução </span>
              ) : (
                <span>
                  {' '}
                  {` ${variacao_aproveitamentos > 0 ? 'Aumento' : 'Redução'}`} de{' '}
                  <strong>{formattedVariation}</strong>
                </span>
              )}
            </span>{' '}
            dos inquéritos nos últimos 30 dias comparado ao mês anterior.
          </span>
        ) : (
          <span>
            {' '}
            Não há novos inquéritos, você não teve abertura de vistas, não aproveitou{' '}
            <strong>nenhum</strong> caso para denúncias, cautelares, e arquivamentos, não houve
            <strong> aumento</strong> nem <strong>redução</strong> nos últimos 30 dias.
          </span>
        )}
      </>
    );
  }

  function picsMetrics({
    nr_documentos_distintos_atual,
    nrInstauradosAtual,
    nr_aberturas_vista_atual,
    nr_aproveitamentos_atual,
    variacao_aberturas_vista,
  }) {
    const formattedVariation = formatPercentage(Math.abs(variacao_aberturas_vista));
    return (
      <>
        <p>
          {nr_documentos_distintos_atual ? (
            <span>
              {' '}
              Este mês,
              <span>
                <strong> {nr_documentos_distintos_atual} </strong>
                {`${
                  nr_documentos_distintos_atual === 1 ? 'PIC passou' : 'PICs passaram'
                } por você, `}
              </span>
            </span>
          ) : (
            <span>
              Este mês, <strong>nenhum</strong> PIC passou por você,{' '}
            </span>
          )}
          {nrInstauradosAtual ? (
            <span>
              <strong> {nrInstauradosAtual} </strong>
              {`${nrInstauradosAtual === 1 ? 'foi instaurado' : 'foram instaurados'} por você `}
            </span>
          ) : (
            <span>
              {' '}
              <strong>nenhum</strong> foi instaurado.{' '}
            </span>
          )}
          {nr_aberturas_vista_atual ? (
            <span>
              {`${nr_aberturas_vista_atual === 1 ? 'Foi' : 'Foram'} `}
              <strong>{nr_aberturas_vista_atual}</strong> abertura de vistas.{' '}
            </span>
          ) : (
            <span>Não foram abertas vistas. </span>
          )}
          {nr_aproveitamentos_atual ? (
            <span>
              e você aproveitou <strong>{nr_aproveitamentos_atual}</strong>{' '}
              {nr_aproveitamentos_atual === 1 ? 'caso para' : `casos para`}
            </span>
          ) : (
            <span>
              Você não aproveitou <strong>nenhum</strong> caso para
            </span>
          )}{' '}
          <span>denúncias, cautelares e arquivamentos. </span>
          {!formattedVariation || formattedVariation === '0%' ? (
            <span>
              Não houve <span>aumento nem redução</span> nos últimos 30 dias.
            </span>
          ) : (
            <span>
              Houve
              {`${variacao_aberturas_vista > 0 ? ' Aumento ' : ' Diminuição '}`}
              de <strong>{formattedVariation}</strong> dos PICS nos últimos 30 dias comparado ao mês
              anterior.{' '}
            </span>
          )}
        </p>
      </>
    );
  }
  function tutelaInvestigationsMetrics() {
    return <p style={{ marginTop: "20px"}}>Não existem métricas de investigações em curso no momento.</p>;
  }

  if (!metrics) return null;
  switch (dbName) {
    case 'tutela_processos':
      return courtCasesMetrics(metrics);
    case 'tutela_investigacoes':
      return tutelaInvestigationsMetrics(metrics);
    case 'tutela_finalizados':
      return inquiriesMetrics(metrics);
    case 'pip_inqueritos':
      return inquiriesMetrics(metrics);
    case 'pip_pics':
      return picsMetrics(metrics);
    case 'pip_finalizados':
      return picsMetrics(metrics);
    case 'pip_aisp':
      return picsMetrics(metrics);
    case 'criminal_processos':
      return inquiriesMetrics(metrics);
    case 'criminal_finalizados':
      return picsMetrics(metrics);
    default:
      return null;
  }
}
