import React, { useState, useEffect, useRef } from 'react';
import Api from '../../../../api';
import { CustomTable, Spinner, Pagination, SectionTitle, Modal, ProcessDetail, InvestigatedProfile } from '../../../../components';
import { useAppContext } from '../../../../../core/app/App.context';
import { highlightJSX } from '../../../../utils';

import {
  tableCriminalOuter,
  investigatedProfileBtn,
  processDetailBtnStyle,
  todayTextAreaCriminal,
  processListTableWrapper,
  tableBody
} from './styles.module.css';
import ProcessList from '../TablesTutela/ProcessList';
import { SearchBox } from 'mapasteca-web';

function ProcessListCriminal() {
  const { buildRequestParams, currentOffice } = useAppContext();
  // eslint-disable-next-line no-shadow
  const [searchString, setSearchString] = useState('');
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
    <div className={tableCriminalOuter}>
      <SearchBox onSearch={onSearch}>
        <SectionTitle value="Lista de processos criminais" glueToTop />
      </SearchBox>
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