import React, { useState } from 'react';
import { SearchBox } from 'mapasteca-web';
import ProcessList from './ProcessList';
import OngoingInvestigations from './OngoingInvestigations';
import { InvestigatedProfile, Modal, ProcessDetail, SectionTitle } from '../../../../components';

import {
  tablesTutelaOuter,
  tablesTutelaHeader,
  tablesTutelaButtonInactive,
  tablesTutelaBody,
  searchBoxContainer,
} from './styles.module.css';

function TablesTutela() {
  const [visibleTab, setVisibleTab] = useState('process');
  const [searchString, setSearchString] = useState(null);
  const [repDk, setRepDk] = useState(null);
  const [extDocNum, setExtDocNum] = useState(null);
  const [mpDocNum, setMpDocNum] = useState(null);
  const [selectedElement, setSelectedElement] = useState({});
  
  function setInvestigatedProfile(representanteDk, event){
    setSelectedElement(event?.target);
    setRepDk(representanteDk);
  }

  function setProcessDetail(docuNrMp, docuNrExterno, event){
    setSelectedElement(event?.target);
    setExtDocNum(docuNrExterno);
    setMpDocNum(docuNrMp);
  }

  const onSearch = (searchStr) => {
    setSearchString(searchStr);
  };

  return (
    <div className={ `${ tablesTutelaOuter } ${ searchBoxContainer }` }>
      <SearchBox onSearch={onSearch}>
        <div className={ tablesTutelaHeader }>
          <button
            className={visibleTab === 'process' ? '' : `${ tablesTutelaButtonInactive }`}
            type="button"
            onClick={() => setVisibleTab('process')}
          >
            <SectionTitle value="Lista de processos" glueToTop />
          </button>
          <button
            className={visibleTab === 'investigation' ? '' : `${ tablesTutelaButtonInactive }`}
            type="button"
            onClick={() => setVisibleTab('investigation')}
          >
            <SectionTitle value="Lista de Investigações" glueToTop />
          </button>
        </div>
      </SearchBox>
      <div className={ tablesTutelaBody }>
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
          <Modal withExitButton previousElement={selectedElement} close={() => setMpDocNum(null)}>
            <ProcessDetail docuNrExterno={extDocNum} docuNrMp={mpDocNum} close={() => setMpDocNum(null)} />
          </Modal>          
        }

        {
          repDk &&
          <Modal withExitButton previousElement={selectedElement} close={() => setRepDk(null)}>
            <InvestigatedProfile representanteDk={repDk} close={() => setRepDk(null)} />
          </Modal>          
        }
      </div>
    </div>
  );
}

export default TablesTutela;
