import React, { useState } from 'react';

import { introOuter } from './introduction.module.css'
function Introduction() {
  
  return (
    <div className={glossaryWrapper}>
    <div className={glossaryIntro}>
      <div className={glossaryIntroSubtitle}>
        <p>Manual de uso</p>
      </div>
      <h2>PARQUET DIGITAL</h2>
      <div className={glossaryIntroSection}>
        <p>
          Este manual visa auxiliar o usuário a potencializar a capacidade da ferramenta em
          solucionar demandas dentro de sua Promotoria de Justiça
        </p>

        <div className={glossaryArticlesWrapper}>
          {tipo === 1 ? (
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                window.open(MANUALPJTC);
              }}
            >
              Acessar Manual
            </button>
          ) : (
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                window.open(MANUALPIP);
              }}
            >
              Acessar Manual
            </button>
          )}
        </div>
      </div>
    </div>
    <div className={promotronIcon}>
      <PromotronUserManual />
    </div>
  </div>
    
    );
}

export default Introduction;
