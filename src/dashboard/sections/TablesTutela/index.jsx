import React, { useState } from 'react';
import ProcessList from './ProcessList';
import OngoingInvestigations from './OngoingInvestigations';
import './styles.css';

const TablesTutela = () => {
  const [showTables, setshowTables] = useState([]);
  const [fadeIn, setFadeIn] = useState(false);
  
  const handleToggle = () => setshowTables(!showTables);
  return (
    <div className="processList-outer">
      <div className="processList-tableWrapper">
        <button
          onClick={() => {
            handleToggle();
            setFadeIn(!fadeIn);
          }}
          className="button-tables"
        >
          {!showTables && <ProcessList />}
        </button>
        <button
          onClick={() => {
            handleToggle();
            setFadeIn(!fadeIn);
          }}
          className="button-tables"
        >
          {showTables && <OngoingInvestigations />}
        </button>
      </div>
    </div>
  );
};

export default TablesTutela;
