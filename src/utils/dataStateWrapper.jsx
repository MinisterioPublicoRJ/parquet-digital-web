import React from 'react';

const dataStateWrapper = (success, isLoading, hasError, errorState, loadingState) => {
  if (isLoading) return loadingState || <p className="paragraphWrapper">Carregando...</p>;
  if (hasError) return errorState || <p className="paragraphWrapper">Ocorreu um erro.</p>;

  return success;
};

export default dataStateWrapper;
