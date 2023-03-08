import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../../../../../components/layoutPieces/Spinner';
import MetricsFormatter from './MetricsFormatter';
import Ranking from '../Ranking';

import {
  GenericTabMain,
  GenericTabUpper,
  GenericTabLower,
  GenericTabLowerLeft,
  GenericTabLowerRight,
  NoData,
} from './styles.module.css';

const propTypes = {
  error: PropTypes.bool.isRequired,
  tab: PropTypes.string.isRequired,
  tabTitle: PropTypes.string.isRequired,
  ranks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
          value: PropTypes.number,
        }),
      ),
    }),
  ),
  map: PropTypes.shape({}),
  metrics: PropTypes.shape({}),
  isBeingDeveloped: PropTypes.bool,
};

// metrics, rank and map will be undefined until the API response comes back
const defaultProps = {
  metrics: undefined,
  ranks: undefined,
  map: undefined,
  isBeingDeveloped: true,
};

function GenericTab({ tab, error, metrics, ranks, map, tabTitle, isBeingDeveloped }) {
  const loading = !error && !metrics;
  if (isBeingDeveloped) {
    if (tab === 'criminalCourtCases')
      return (
        <div className={`${GenericTabMain} ${NoData}`}>
          Esta sessão está em construção! Em breve será apresentado o detalhamento do acervo de
          "Processos em Juízo" desta Promotoria.
        </div>
      );
    if (tab === 'newDocs')
      return (
        <div className={`${GenericTabMain} ${NoData}`}>
          Esta sessão está em construção! Em breve será apresentado o detalhamento dos documentos
          novos, nos últimos 30 dias, desta Promotoria.
        </div>
      );
    return <div className={`${GenericTabMain} ${NoData}`}>Esta sessão está em construção!</div>;
  }
  if (loading) {
    return <Spinner size="large" />;
  }
  if (error) {
    return <div className={`${GenericTabMain} ${NoData}`}>Nenhum dado para exibir</div>;
  }

  const hasMetrics = Object.keys(metrics).length;
  const hasRank = ranks.length;
  const hasRight = Object.keys(map).length || ranks.length > 1;
  return (
    <div className={GenericTabMain}>
      <div className={GenericTabUpper}>
        {hasMetrics ? (
          <MetricsFormatter metrics={metrics} tab={tab} />
        ) : (
          <p>{`Não existem métricas de ${tabTitle} para o último mês.`}</p>
        )}
      </div>

      <div className={GenericTabLower}>
        {hasRank ? (
          <div className={GenericTabLowerLeft}>
            <Ranking data={ranks[0].data} title={ranks[0].name} />
          </div>
        ) : null}
        {hasRight ? (
          <div className={GenericTabLowerRight}>
            {/* Maps will be added in the future */}
            <Ranking data={ranks[1].data} title={ranks[1].name} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

GenericTab.propTypes = propTypes;
GenericTab.defaultProps = defaultProps;
export default GenericTab;
