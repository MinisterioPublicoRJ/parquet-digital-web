import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import './overlayConstants';
import { OVERLAY_TEXTS } from './overlayConstants';

const propTypes = {
  type: PropTypes.string.isRequired,
  setShowOverlay: PropTypes.func.isRequired,
  children: PropTypes.node,
};

function AlertsOverlay({ type, setShowOverlay, children }) {
  return (
    <div className="overlay-outer">
      <div className="alerts-overlay">
        <div>
          {OVERLAY_TEXTS[type] ? (
            <>
              <h4> {type} </h4>
              {OVERLAY_TEXTS[type]}
            </>
          ) : (
            <p>Isso é um overlay do tipo {type}</p>
          )}
          <button onClick={() => setShowOverlay(false)}> Sair</button>
          {children}
        </div>
      </div>
    </div>
  );
}

AlertsOverlay.propTypes = propTypes;
export default AlertsOverlay;
