import React, { useState } from 'react';
import { ProcessList } from '../TablesTutela/ProcessList';
import { OngoingInvestigations } from '../TablesTutela/OngoingInvestigations';

const TablesTutela = () => {
  // eslint-disable-next-line no-shadow
  const [processListData, setProcessListData] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <div className="processList-outer">
      <ProcessList/>
      <OngoingInvestigations />
    </div>
  );
};

export default TablesTutela;
