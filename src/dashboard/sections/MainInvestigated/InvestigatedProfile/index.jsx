import React, { useState } from 'react';

import './styles.css';
import { CustomTable, SectionTitle } from '../../../../components';
import { TABLE_COLUMNS } from './investigatedProfileConstants';

function InvestigatedProfile({ onToggle, data }) {
  const [tableData, setTableData] = useState([]);
  const [apiError, setApiError] = useState(false);

  function render() {
    if (apiError) {
      return (
        <article className="investigatedProfile-outer">
          <SectionTitle value="Perfil do investigado" glueToTop />
          Erro de api!
        </article>
      );
    }
    if (data.perfil) {
      return (
        <article className="investigatedProfile-outer">
          <div className="investigatedProfile-details">
            <SectionTitle value="Perfil do investigado" glueToTop />

            <p>Nome: {data.perfil.nm_investigado}</p>
            <p>
              <span>Data de Nascimento</span>
              <span>RG</span> <span>CPF</span>
            </p>
            <p>Mãe</p>
            <p>Foram encontrados {} perfis similares ao solicitado</p>
          </div>
          <div className="investigatedProfile-tableWrapper">
            <CustomTable data={tableData} columns={TABLE_COLUMNS} showHeader />
          </div>

          <div className="profile-close">
            <button type="button" className="close" aria-label="Fechar" onClick={onToggle}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </article>
      );
    }

    return null;
  }
  return render();
}

export default InvestigatedProfile;
