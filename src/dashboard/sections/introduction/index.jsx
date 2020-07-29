import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../app/authContext';
import './styles.css';

function Introduction() {
  return (
    <div className="introduction-today-wrapper">
      <h2>Resumo do dia</h2>
      <p>
        Aqui você verá as atualizações do dia na sua Promotoria, trazemos várias informações baseado
        em uma rotina de atualização do robô. Ele busca o desempenho do trabalho realizado nos
        últimos 30 dias bem como verifica o volume de entrada de processos e traz uma classificação
        baseado nesta frequência.
      </p>
      <div className='btns-introduction'>
          <button className='btn-leave'>Sair</button>
          <button className='btn-introduction-next'>Entrar</button>
      </div>
    </div>
  );
}
export default Introduction;
