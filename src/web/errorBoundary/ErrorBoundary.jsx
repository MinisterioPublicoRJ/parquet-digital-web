import React from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    const { setError } = this.props;
    window.newrelic.noticeError(error);
    setError(true);
  }

  render() {
    const { children, hasError, errorScreen } = this.props;
    if (hasError) {
      return errorScreen;
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
