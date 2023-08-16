import React, { useState } from 'react';
import { SearchBox } from '../../../../components/layoutPieces';
import { SectionTitle, Modal, ProcessDetail, InvestigatedProfile } from '../../../../components';

import {
  tableCriminalOuter,
  tableBody,
  mainCriminalOuterBoxSearch,
} from './styles.module.css';
import ProcessList from '../TablesTutela/ProcessList';

function ProcessListCriminal() {
  // eslint-disable-next-line no-shadow
  const [searchString, setSearchString] = useState('');
  const [repDk, setRepDk] = useState(null);
  const [extDocNum, setExtDocNum] = useState(null);
  const [mpDocNum, setMpDocNum] = useState(null);
  const [selectedElement, setSelectedElement] = useState({});

  const setInvestigatedProfile = (representanteDk, event) => {
    setSelectedElement(event?.target);
    setRepDk(representanteDk);
  }

  const setProcessDetail = (docuNrMp, docuNrExterno, event) => {
    setSelectedElement(event?.target);
    setExtDocNum(docuNrExterno);
    setMpDocNum(docuNrMp);
  }

  const onSearch = (searchStr) => {
    setSearchString(searchStr);
  };

  return (
    <div className={tableCriminalOuter}>
        <div className={mainCriminalOuterBoxSearch}>
          <SectionTitle value="Lista de processos criminais" glueToTop />
          <SearchBox onSearch={onSearch}/>
        </div>
        <div className={tableBody}>
          <ProcessList 
          setInvestigatedProfile={setInvestigatedProfile}
          setProcessDetail={setProcessDetail}
          isActive
          searchString={searchString}/>
        </div>
        
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
  );
}

export default ProcessListCriminal;
