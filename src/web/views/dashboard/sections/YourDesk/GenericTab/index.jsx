import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import Spinner from '../../../../../components/layoutPieces/Spinner';
import MetricsFormatter from './MetricsFormatter';
import Ranking from '../Ranking';

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
};

// metrics, rank and map will be undefined until the API response comes back
const defaultProps = {
  metrics: undefined,
  ranks: undefined,
  map: undefined,
};

function GenericTab({ tab, error, metrics, ranks, map, tabTitle }) {
  console.log(
    tab,
    error,
    metrics,
    ranks,
    map,
    tabTitle,
    'Cadê a porra dos valores das propriedades',
  );
  const loading = !error && !metrics;
  if (loading) {
    return <Spinner size="large" />;
  }
  if (error) {
    return <div className="GenericTab-main">Nenhum dado para exibir</div>;
  }



  const hasMetrics = Object.keys(metrics).length;
  const hasRank = ranks.length;
  const hasRight = Object.keys(map).length || ranks.length > 1;
  return (
    <div className="GenericTab-main">
      <div className="GenericTab-upper">
        {hasMetrics ? (
          <MetricsFormatter metrics={metrics} tab={tab} />
        ) : (
          <p>{`Não existem métricas de ${tabTitle} para o último mês.`}</p>
        )}
      </div>

      <div className="GenericTab-lower">
        {hasRank ? (
          <div className="GenericTab-lower-left">
            <Ranking data={ranks[0].data} title={ranks[0].name} />
          </div>
        ) : null}
        {hasRight ? (
          <div className="GenericTab-lower-right">
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
