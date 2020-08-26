import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.node.isRequired,
  actionType: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  link: PropTypes.string,
  clickCallback: PropTypes.func.isRequired,
  // message: PropTypes.node.isRequired,
  // action: PropTypes.bool,
  // iconBg: PropTypes.string.isRequired,
};
const defaultProps = {
  link: null,
  backgroundColor: 'transparent',
  // action: true,
};

function ActionButtons({ actionType, icon, backgroundColor, text, link, clickCallback }) {
  return (
    <button
      className="actionButton-outer"
      type="button"
      style={{ backgroundColor }}
      onClick={() => clickCallback()}
    >
      <div>{icon || null}</div>
      <div>{text || 'oi turupon?'}</div>
    </button>
  );
}

ActionButtons.propTypes = propTypes;
ActionButtons.defaultProps = defaultProps;
export default ActionButtons;
