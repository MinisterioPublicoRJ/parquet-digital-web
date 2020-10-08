import React, { useEffect, useState } from 'react';
import ProcessList from './ProcessList';
import OngoingInvestigations from './OngoingInvestigations';
import { SectionTitle } from '../../../components';
import './styles.css';

const TablesTutela = () => {
  // eslint-disable-next-line no-shadow
  const [showTables, setshowTables] = useState([]);
  const [fade, setFadein] = useState(false);
  const handleToggle = () => setshowTables(!showTables);

  return (
    <div className="processList-outer">
      <div className="processList-tableWrapper" id="={isFadingOut ? 'item-fadeout' : 'item'}">
          <button onClick={handleToggle} className="button-tables">
          { showTables  &&  
          <OngoingInvestigations className={`text ${showTables ? 'visible' : ''}`} /> }
          </button>
          <button onClick={handleToggle} className="button-tables">
          { !showTables && <ProcessList />}
          </button>
      </div>
    </div>
  );
};

export default TablesTutela;
