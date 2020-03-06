import React from 'react';

const dataStateWrapper = (success, isLoading, hasError) => {
  if (isLoading) return <p className="paragraphWrapper">Carregando...</p>;
  if (hasError) return <p className="paragraphWrapper">Ocorreu um erro.</p>;

  return success;
};

export default dataStateWrapper;
