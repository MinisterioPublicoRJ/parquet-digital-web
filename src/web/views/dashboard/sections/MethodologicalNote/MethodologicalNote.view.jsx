import React from 'react';
import NOTA_METODOLOGICA from '../MethodologicalNote/nota_metodologica.pdf';
import {
  glossaryWrapper,
  glossaryIntroSection,
  glossaryIntroSubtitle,
  glossaryIntro,
  glossaryArticlesWrapper,
  promotronIcon
} from '../UserManual/userManual.module.css';
import PromotronUserManual from '../../../../assets/svg/promotronUserManual.jsx';

function MethodologicalNote() {
  return (
    <div className={glossaryWrapper}>
      <div className={glossaryIntro}>
        <div className={glossaryIntroSubtitle}>
          <p>Nota Metodológica</p>
        </div>
        <h2>PARQUET DIGITAL</h2>
        <div className={glossaryIntroSection}>
          <p>
            Este manual visa auxiliar o usuário a potencializar a capacidade da ferramenta em
            solucionar demandas dentro de sua Promotoria de Justiça
          </p>

          <div className={glossaryArticlesWrapper}>
             <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  window.open(NOTA_METODOLOGICA);
                }}
              >
                Acessar nota metodológica
              </button>
          </div>
        </div>
      </div>
      <div className={promotronIcon}>
        <PromotronUserManual />
      </div>
    </div>
  );
}

export default MethodologicalNote;
