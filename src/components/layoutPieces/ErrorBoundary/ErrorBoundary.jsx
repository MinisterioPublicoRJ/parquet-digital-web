import React from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Atualiza o state para que a próxima renderização mostre a UI alternativa.
    console.log(error);
    return { hasError: true };
  }

   componentDidCatch(error, errorInfo) {
  // Você também pode registrar o erro em um serviço de relatórios de erro
     //logErrorToMyService(error, errorInfo);
     console.log("error in boundary: ", error);
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
