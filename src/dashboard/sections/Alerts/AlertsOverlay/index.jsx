import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const propTypes = {
  type: PropTypes.string.isRequired,
  setShowOverlay: PropTypes.func.isRequired,
  children: PropTypes.node,
};

function AlertsOverlay({ type, setShowOverlay, children }) {
  return (
    <div className="overlay-outer">
      <div className="alerts-overlay">
        Isso é um overlay do tipo {type}
        <button onClick={() => setShowOverlay(false)}> Sair</button>
        {children}
      </div>
    </div>
  );
}

AlertsOverlay.propTypes = propTypes;
export default AlertsOverlay;
