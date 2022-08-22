import React from 'react';
import NOTA_METODOLOGICA from './nota_metodologica.pdf';
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
          Esta nota metodológica foi desenvolvida para auxiliar na compreensão dos dados e estatísticas
          presentes na ferramenta. Desejamos uma boa leitura!
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
