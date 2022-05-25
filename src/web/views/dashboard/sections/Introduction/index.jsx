import React from 'react';
import PromotronUserManual from '../../../../assets/svg/promotronUserManual.jsx';

import {
introOuter,
introductionSubtitle,
introductionIntro,
promotronIcon
} from './introduction.module.css'

function Introduction() {
  
  return (
    <div className={introOuter}>
    <div className={introductionIntro}>
      <div className={introductionSubtitle}>
        <p>Manual de uso</p>
      </div>
      <h2>PARQUET DIGITAL</h2>
      <div>
        <p>
          Este manual visa auxiliar o usuário a potencializar a capacidade da ferramenta em
          solucionar demandas dentro de sua Promotoria de Justiça
        </p>
      </div>
      <div className={promotronIcon}>
      <PromotronUserManual />
    </div>
    </div>
  </div>
    
    );
}

export default Introduction;
