/* eslint-disable */
import React from 'react';
import { formatPercentage } from '../../../../../utils';
import { useAppContext } from '../../../../../../core/app/App.context';

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
          <span>{` ${variacao_30_dias > 0 ? 'aumentou' : 'diminuiu'} ${formattedVariation} `}</span>
          nos últimos 30 dias.
        </span>
      ) : (
        <span> Seu acervo não aumentou ou diminuiu nos últimos 30 dias. </span>
      )}
      {nr_acoes_ultimos_60_dias ? (
        <span>
          No último ano, você ajuizou
          {` ${nr_acoes_ultimos_60_dias} ${nr_acoes_ultimos_60_dias === 1 ? 'ação' : 'ações'} `}
          nos últimos 60 dias.{' '}
        </span>
      ) : (
        <span> Você não ajuizou nenhuma ação nos últimos 60 dias. </span>
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
            {` ${nr_acoes_60_dias_anterior} ${
              nr_acoes_60_dias_anterior === 1 ? 'ação foi ajuizada' : 'ações foram ajuizadas'
            }.`}
          </span>
        </span>
      ) : (
        <span>nenhuma ação foi ajuizada.</span>
      )}
      <p>
        No último ano, você ajuizou
        <span>
          <span>
            {` ${nr_acoes_12_meses_atual} ${nr_acoes_12_meses_atual === 1 ? 'ação' : 'ações'}`},{' '}
            {variacao_12_meses ? (
              <span>
                com {variacao_12_meses >= 0 ? `aumento` : `redução`} de {yearVariation}
              </span>
            ) : (
              <span>não houve aumento nem redução</span>
            )}
          </span>
        </span>{' '}
        em comparação com o ano anterior em que{' '}
        {nr_acoes_12_meses_anterior > 0 ? (
          <span>{` ${nr_acoes_12_meses_anterior} ${
            nr_acoes_12_meses_anterior === 1 ? 'ação foi ajuizada.' : 'ações foram ajuizadas.'
          } `}</span>
        ) : (
          <span>nenhuma ação foi ajuizada. </span>
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
      <span>Este mês,</span>
      {nr_documentos_distintos_atual ? (
        <span>
          <span>{` ${nr_documentos_distintos_atual} ${
            nr_documentos_distintos_atual === 1 ? 'inquérito passou' : 'inquéritos passaram'
          } por você, `}</span>{' '}
          com
          <span>
            {` ${nr_aberturas_vista_atual} ${
              nr_aberturas_vista_atual === 1 ? 'abertura' : 'aberturas'
            } de vista`}
            .{' '}
          </span>
          <span>
            {nr_aproveitamentos_atual > 0 ? (
              <span>
                Você aproveitou
                {` ${nr_aproveitamentos_atual} ${
                  nr_aproveitamentos_atual === 1 ? 'caso' : 'casos'
                } para denúncias, cautelares e arquivamentos. `}
              </span>
            ) : (
              <span>
                Você não aproveitou nenhum caso para denúncias, cautelares e arquivamentos.{' '}
              </span>
            )}
            {!formattedVariation || formattedVariation === '0%' ? (
              <span> Não houve aumento nem redução </span>
            ) : (
              <span>
                {' '}
                {` ${variacao_aproveitamentos > 0 ? 'Aumento' : 'Redução'}`} de {formattedVariation}
              </span>
            )}
          </span>{' '}
          dos inquéritos nos últimos 30 dias comparado ao mês anterior.
        </span>
      ) : (
        <p>
          {' '}
          Não há
          <span> novos inquéritos</span>.
        </p>
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
              {` ${nr_documentos_distintos_atual} ${
                nr_documentos_distintos_atual === 1 ? 'PIC passou' : 'PICs passaram'
              } por você, `}
            </span>
          </span>
        ) : (
          <span>Este mês, nenhum PIC passou por você, </span>
        )}
        {nrInstauradosAtual ? (
          <strong>
            {` ${nrInstauradosAtual} ${
              nrInstauradosAtual === 1 ? 'foi instaurado' : 'foram instaurados'
            } por você `}
          </strong>
        ) : (
          <span>nenhum foi instaurado. </span>
        )}
        {nr_aberturas_vista_atual ? (
          <span>
            {`${nr_aberturas_vista_atual === 1 ? 'Foi' : 'Foram'} `}
            <span>{nr_aberturas_vista_atual}</span> abertura de vistas.{' '}
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
          <span>Você não aproveitou nenhum caso para</span>
        )}{' '}
        <span>denúncias, cautelares e arquivamentos.</span>
        {!formattedVariation || formattedVariation === '0%' ? (
          <span>
            Não houve <span>aumento nem redução</span> nos últimos 30 dias.
          </span>
        ) : (
          <span>
            {`${variacao_aberturas_vista > 0 ? ' Aumento ' : ' Diminuição '}`}
            de <strong>{formattedVariation}</strong> nos últimos 30 dias.{' '}
          </span>
        )}
      </p>
    </>
  );
}

export default function MetricsProsecutions({ metrics, dbName }) {
  const { currentOffice } = useAppContext();
  const type = currentOffice ? currentOffice.tipo : undefined;

  if (!metrics) return null;
  switch (dbName) {
    case 'tutela_processos':
      return courtCasesMetrics(metrics);
    case 'tutela_investigacoes':
      return inquiriesMetrics(metrics);
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
