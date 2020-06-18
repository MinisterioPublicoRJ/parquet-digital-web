import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import Spinner from '../../layoutPieces/Spinner';

const propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  tabType: PropTypes.string.isRequired,
};

function GenericTab({ tabType, error, metrics, rank, map, loading }) {
  if (loading) {
    return <Spinner size="large" />;
  }
  if (error) {
    return <div className="GenericTab-main">Nenhum dado para exibir</div>;
  }
  return (
    <div className="GenericTab-main">
      {metrics && <div className="GenericTab-upper">METRICS GO HERE!</div>}
      <div className="GenericTab-lower">
        <div className="GenericTab-lower-left">rank goes here!</div>
        <div className="GenericTab-lower-right">rank or map here!</div>
      </div>
    </div>
  );
}

GenericTab.propTypes = propTypes;
export default GenericTab;
