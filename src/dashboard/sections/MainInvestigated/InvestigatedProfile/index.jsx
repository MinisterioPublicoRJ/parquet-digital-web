import React, { useState } from 'react';

import './styles.css';
import { CustomTable, SectionTitle } from '../../../../components';
import { TABLE_COLUMNS } from './investigatedProfileConstants';

function InvestigatedProfile({ onToggle }) {
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

    return (
      <article className="investigatedProfile-outer">
        <SectionTitle value="Perfil do investigado" glueToTop />
        <div className="investigatedProfile-tableWrapper">
          INFOS AQUI
          <CustomTable data={tableData} columns={TABLE_COLUMNS} showHeader />
        </div>
      </article>
    );
  }
  return render();
}

export default InvestigatedProfile;
