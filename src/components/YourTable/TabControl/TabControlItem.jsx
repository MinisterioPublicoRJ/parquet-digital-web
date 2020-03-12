import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

import './styles.css';

const propTypes = {
  success: PropTypes.bool,
  spotlight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  subtitle: PropTypes.string.isRequired,
  to: PropTypes.string,
  forfeit: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      tab: PropTypes.string,
    }).isRequired,
    path: PropTypes.string.isRequired,
  }),
};

const defaultProps = {
  success: false,
  to: '',
  forfeit: false,
  match: {
    params: {},
    path: '',
  },
};

const TabControlItem = ({ spotlight, subtitle, success, to, match, forfeit }) => {
  const { path, params, url = '' } = match;

  const viewStyle = ['tab-control-item'];
  const spotlightStyle = ['tab-control-spotlight'];
  const subtitleStyle = ['tab-control-subtitle'];

  let isActive = false;

  if (success) {
    viewStyle.push('tab-control-item--success');
    spotlightStyle.push('tab-control-spotlight--success');
    subtitleStyle.push('tab-control-subtitle--success');
  } else if ((['/', '/suamesa'].includes(path) && forfeit) || (to && params.tab === to)) {
    isActive = true;
    viewStyle.push('tab-control-item--active');
    spotlightStyle.push('tab-control-spotlight--active');
    subtitleStyle.push('tab-control-subtitle--active');
  }

  let destination;
  if (url === '/suamesa') {
    destination = url;
  } else {
    destination = url.split('/');
    destination.pop();
    destination = destination.join('/');
  }

  destination = destination.replace('/vistas-abertas', '');

  const Wrapper =
    !success && !isActive && to
      ? ({ children }) => (
          <NavLink className="tab-control-item-link" to={`${destination}/${to}`}>
            {children}
          </NavLink>
        )
      : ({ children }) => <>{children}</>;

  return (
    <Wrapper>
      <div className={viewStyle.join(' ')}>
        <div className={spotlightStyle.join(' ')}>{spotlight}</div>
        <div className={subtitleStyle.join(' ')}>{subtitle}</div>
      </div>
    </Wrapper>
  );
};

TabControlItem.propTypes = propTypes;
TabControlItem.defaultProps = defaultProps;

export default TabControlItem;
