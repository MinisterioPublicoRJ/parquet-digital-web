import React, { useState } from 'react';
import ProcessList from '../TablesTutela/ProcessList';
import  OngoingInvestigations  from '../TablesTutela/OngoingInvestigations';
import './styles.css';


const TablesTutela = () => {
  // eslint-disable-next-line no-shadow
  const [dealWithTables, setdealWithTables] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <div className="processList-outer">
      <div className="processList-tableWrapper" >
      <div>
        <ProcessList/>
      </div>
      <div>
        <OngoingInvestigations />
      </div>
    </div>
    </div>
  );
};

export default TablesTutela;
