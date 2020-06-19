import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import Spinner from '../../layoutPieces/Spinner';
import MetricsFormatter from './MetricsFormatter';

const propTypes = {
  error: PropTypes.bool.isRequired,
  tabType: PropTypes.string.isRequired,
};

function GenericTab({ tabType, error, metrics, rank, map }) {
  // metrics, rank and map will be undefined until the API response comes back
  console.log('tabType', tabType);
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
      {hasMetrics && (
        <div className="GenericTab-upper">
          <MetricsFormatter metrics={metrics} tab={tabType} />
        </div>
      )}
      <div className="GenericTab-lower">
        <div className="GenericTab-lower-left">rank goes here!</div>
        <div className="GenericTab-lower-right">rank or map here!</div>
      </div>
    </div>
  );
}

GenericTab.propTypes = propTypes;
export default GenericTab;
