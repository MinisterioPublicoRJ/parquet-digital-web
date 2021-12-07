import React from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Atualiza o state para que a próxima renderização mostre a UI alternativa.
    return { hasError: true };
  }

   componentDidCatch(error) {
     window.newrelic.noticeError(error);
   }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <p>Falha no carregamento</p>;
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
