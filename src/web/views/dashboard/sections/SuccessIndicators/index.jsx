import React, { useState, useEffect } from 'react';

import SuccessIndicatorsChart from './SuccessIndicatorsChart';
import { formatPercent } from '../../../../utils';
import { useAppContext } from '../../../../../core/app/App.context';
import { SectionTitle, Spinner } from '../../../../components';
import {
  successIndicatorsOuter,
  successIndicatorsItem,
  successIndicatorsMain,
  successIndicatorsTooltipFirst,
  successIndicatorsSooltipSecond,
  successIndicatorsTooltipThird,
} from './styles.module.css';

function SuccessIndicators() {
  const { buildRequestParams, Api } = useAppContext();
  const [successIndicators, setSuccessIndicators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await Api.getSuccessIndicators(buildRequestParams());
        setSuccessIndicators(response);
      } catch (e) {
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <Spinner size="medium" />;
  }

  // this values will never be lower than zero
  const resolutividadePercent = successIndicators.pResolutividade
    ? formatPercent(successIndicators.pResolutividade[0].y)
    : '0%';
  const elucidacoesPercent = successIndicators.pElucidacoes
    ? formatPercent(successIndicators.pElucidacoes[0].y)
    : '0%';
  const finalizacoesPercent = successIndicators.pFinalizacoes
    ? formatPercent(successIndicators.pFinalizacoes[0].y)
    : '0%';

  return (
    <article className={ successIndicatorsOuter }>
      <SectionTitle value="Indicadores" glueToTop />
      <div className={ successIndicatorsMain }>
        <div className={ successIndicatorsItem }>
          <h4>Resolutividade Mensal</h4>
          <span>Denúncias + acordos/vistas abertas, nos últimos 30 dias</span>
          <div className={ successIndicatorsTooltipFirst }>
            <strong>{resolutividadePercent}</strong>
          </div>

          <SuccessIndicatorsChart
            className="chart"
            data={successIndicators.pResolutividade}
            color={resolutividadePercent === '0%' ? '#f8f9fb' : '#F86C72'} />
        </div>
        <div className={ successIndicatorsItem }>
          <h4>Taxa de Denúncia (móvel)</h4>
          <span>
            Número de procedimentos com denúncia/Número de procedimentos do Grupo de vistas abertas,
            desde março de 2020.
          </span>
          <div className={ successIndicatorsSooltipSecond }>
            <strong>{elucidacoesPercent}</strong>
          </div>
          <SuccessIndicatorsChart
            data={successIndicators.pElucidacoes}
            color={elucidacoesPercent === '0%' ? '#f8f9fb' : '#F8BD6C'} />
        </div>
        <div className={ successIndicatorsItem }>
          <h4>Taxa de Finalização (móvel)</h4>
          <span>
            Denúncias, arquivamentos, acordos/Número de procedimentos do Grupo de vistas abertas,
            desde março de 2020.
          </span>
          <div className={ successIndicatorsTooltipThird }>
            <strong>{finalizacoesPercent}</strong>
          </div>
          <SuccessIndicatorsChart
            className="chart"
            data={successIndicators.pFinalizacoes}
            color={finalizacoesPercent === '0%' ? '#f8f9fb' : '#71D0A4'} />
        </div>
      </div>
    </article>
  );
}

export default SuccessIndicators;
