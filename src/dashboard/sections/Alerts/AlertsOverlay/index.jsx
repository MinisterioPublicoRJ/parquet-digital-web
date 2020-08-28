import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const propTypes = {
  type: PropTypes.string.isRequired,
};

function AlertsOverlay({ type, setShowOverlay }) {
  console.log('alertas:', type);
  return (
    <div className="alerts-overlay">
      Isso é um overlay
      <button onClick={() => setShowOverlay(false)}> Sair</button>
    </div>
  );
}

AlertsOverlay.propTypes = propTypes;
export default AlertsOverlay;
