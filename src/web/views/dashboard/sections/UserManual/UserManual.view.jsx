import React from 'react';
import MANUALPIP from './userManualPdfs/manual_pip.pdf';
import MANUALPJTC from './userManualPdfs/manual_pjtc.pdf';
import NOTA_METODOLOGICA from './userManualPdfs/nota_metodologica.pdf';


import { useAppContext } from '../../../../../core/app/App.context';
import {
  glossaryWrapper,
  glossaryIntroSection,
  glossaryIntroSubtitle,
  glossaryIntro,
  glossaryArticlesWrapper,
  promotronIcon
} from './userManual.module.css';
import PromotronUserManual from '../../../../assets/svg/promotronUserManual.jsx';

function UserManual() {
  const { currentOffice } = useAppContext();
  const { tipo } = currentOffice;

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
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  window.open(NOTA_METODOLOGICA);
                }}
              >
                Acessar nota metodologica
              </button>
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

export default UserManual;
