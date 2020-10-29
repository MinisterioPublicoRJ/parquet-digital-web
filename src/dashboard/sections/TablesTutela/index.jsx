import React, { useState } from 'react';

import './styles.css';
import ProcessList from './ProcessList';
import OngoingInvestigations from './OngoingInvestigations';
import { SectionTitle } from '../../../components';

const TablesTutela = ({ setInvestigatedProfile }) => {
  const [visibleTab, setVisibleTab] = useState('process');

  return (
    <div className="tablesTutela-outer">
      <div className="tablesTutela-header">
        <button
          className={visibleTab === 'process' ? '' : 'tablesTutela-button--inactive'}
          type="button"
          onClick={() => setVisibleTab('process')}
        >
          <SectionTitle value="Lista de processos" glueToTop />
        </button>
        <button
          className={visibleTab === 'investigation' ? '' : 'tablesTutela-button--inactive'}
          type="button"
          onClick={() => setVisibleTab('investigation')}
        >
          <SectionTitle value="Lista de Investigações" glueToTop />
        </button>
      </div>
      <div className="tablesTutela-body">
        <ProcessList
          setInvestigatedProfile={setInvestigatedProfile}
          isActive={visibleTab === 'process'}
        />
        <OngoingInvestigations
          setInvestigatedProfile={setInvestigatedProfile}
          isActive={visibleTab === 'investigation'}
        />
      </div>
    </div>
  );
};

export default TablesTutela;
