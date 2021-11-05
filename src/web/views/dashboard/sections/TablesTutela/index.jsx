import React, { useState } from 'react';
import './styles.css';
import { SearchBox } from 'mapasteca-web';
import ProcessList from './ProcessList';
import OngoingInvestigations from './OngoingInvestigations';
import { SectionTitle } from '../../../../../components';

const TablesTutela = ({ setInvestigatedProfile, setProcessDetail }) => {
  const [visibleTab, setVisibleTab] = useState('process');
  const [searchString, setSearchString] = useState(null);

  const onSearch = (searchStr) => {
    setSearchString(searchStr);
  };

  return (
    <div className="tablesTutela-outer">
      <SearchBox onSearch={onSearch}>
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
      </SearchBox>
      <div className="tablesTutela-body">
        <ProcessList
          setInvestigatedProfile={setInvestigatedProfile}
          setProcessDetail={setProcessDetail}
          isActive={visibleTab === 'process'}
          searchString={searchString}
        />
        <OngoingInvestigations
          setInvestigatedProfile={setInvestigatedProfile}
          setProcessDetail={setProcessDetail}
          isActive={visibleTab === 'investigation'}
          searchString={searchString}
        />
      </div>
    </div>
  );
};

export default TablesTutela;
