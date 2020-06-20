import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import Spinner from '../../layoutPieces/Spinner';
import MetricsFormatter from './MetricsFormatter';

const propTypes = {
  error: PropTypes.bool.isRequired,
  tab: PropTypes.string.isRequired,
  tabTitle: PropTypes.string.isRequired,
};

function GenericTab({ tab, error, metrics, rank, map, tabTitle }) {
  // metrics, rank and map will be undefined until the API response comes back
  console.log('tab', tab, tabTitle);
  const loading = !error && !metrics;
  if (loading) {
    return <Spinner size="large" />;
  }
  if (error) {
    return <div className="GenericTab-main">Nenhum dado para exibir</div>;
  }

  const hasMetrics = Object.keys(metrics).length;

  return (
    <div className="GenericTab-main">
      <div className="GenericTab-upper">
        {hasMetrics ? (
          <MetricsFormatter metrics={metrics} tab={tab} />
        ) : (
          <p className="paragraphWrapper">
            {`Não existem dados de ${tabTitle} para o último mês.`}
          </p>
        )}
      </div>

      <div className="GenericTab-lower">
        <div className="GenericTab-lower-left">rank goes here!</div>
        <div className="GenericTab-lower-right">rank or map here!</div>
      </div>
    </div>
  );
}

GenericTab.propTypes = propTypes;
export default GenericTab;
