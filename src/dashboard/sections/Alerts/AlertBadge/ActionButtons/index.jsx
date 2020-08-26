import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const propTypes = {
  actionType: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  clickCallback: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
  link: PropTypes.string,
  text: PropTypes.node.isRequired,
};
const defaultProps = {
  link: null,
};

function ActionButtons({ actionType, icon, background, text, link, clickCallback }) {
  return (
    <button
      className="actionButton-outer"
      type="button"
      style={{ background }}
      onClick={() => clickCallback()}
    >
      <div>{icon || null}</div>
      <span>{text || 'oi turupon?'}</span>
    </button>
  );
}

ActionButtons.propTypes = propTypes;
ActionButtons.defaultProps = defaultProps;
export default ActionButtons;
