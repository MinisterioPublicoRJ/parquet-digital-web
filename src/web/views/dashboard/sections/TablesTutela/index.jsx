import React, { useState } from 'react';
import './styles.css';
import { SearchBox } from 'mapasteca-web';
import ProcessList from './ProcessList';
import OngoingInvestigations from './OngoingInvestigations';
import { InvestigatedProfile, Modal, ProcessDetail, SectionTitle } from '../../../../components';
import { set } from 'lodash';

const TablesTutela = () => {
  const [visibleTab, setVisibleTab] = useState('process');
  const [searchString, setSearchString] = useState(null);
  const [repDk, setRepDk] = useState(null);
  const [extDocNum, setExtDocNum] = useState(null);
  const [mpDocNum, setMpDocNum] = useState(null);
  


  function setInvestigatedProfile(representanteDk){
    setRepDk(representanteDk);
  }

  function setProcessDetail(docuNrMp, docuNrExterno){
    setExtDocNum(docuNrExterno);
    setMpDocNum(docuNrMp);
  }

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
        {
          mpDocNum &&
          <Modal close={() => setMpDocNum(null)}>
            <ProcessDetail docuNrExterno={extDocNum} docuNrMp={mpDocNum} close={() => setMpDocNum(null)} />
          </Modal>          
        }

        {
          repDk &&
          <Modal close={() => setRepDk(null)}>
            <InvestigatedProfile representanteDk={repDk} close={() => setRepDk(null)} />
          </Modal>          
        }
      </div>
    </div>
  );
};

export default TablesTutela;
