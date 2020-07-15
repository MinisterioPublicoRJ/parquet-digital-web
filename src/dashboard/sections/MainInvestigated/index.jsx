import React, { useState, useEffect } from 'react';

import './styles.css';
import { TABLE_COLUMNS } from './mainInvestigatedConstants';
import Api from '../../../api';
import { useAuth } from '../../../app/authContext';
import { Bin, Tack } from '../../../assets';
import { Table, Spinner, SectionTitle } from '../../../components';
// import { getUser } from '../../../user';
import ActionButtons from './ActionButtons';

function MainInvestigated() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [apiError, setApiError] = useState(false);

  function cleanData(raw) {
    console.log('raw', raw);
    return raw.map(({ nmInvestigado, nrInvestigacoes }) => ({
      key: `${nmInvestigado}-${nrInvestigacoes}`,
      nmInvestigado,
      nrInvestigacoes,
      actions: <ActionButtons />,
    }));
  }

  function filterAndSortTableData(rawData) {
    // is_removed - Server já está filtrando
    // Ordering by nr_investigacoes Desc
    return rawData.filter(item => item.removed === false).sort((x, y) => y.pinned - x.pinned);
  }

  /**
   * Function that fetches the main investigated data
   * @return {void}
   */
  async function getMainInvestigated() {
    let response;
    try {
      response = await Api.getMainInvestigated(user);
      setTableData(cleanData(response));
    } catch (e) {
      setApiError(true);
    } finally {
      setLoading(false);
    }
  }

  function onMount() {
    getMainInvestigated();
  }

  useEffect(onMount, []);

  function render() {
    if (loading || apiError) {
      return (
        <article className="mainInvestigated-outer">
          <SectionTitle value="Principais Investigados" glueToTop />
          {loading ? <Spinner size="medium" /> : <p>Nenhum investigado para exibir</p>}
        </article>
      );
    }

    return (
      <article className="mainInvestigated-outer">
        <SectionTitle value="Principais Investigados" glueToTop />
        <div className="mainInvestigated-tableWrapper">
          <Table data={tableData} columns={TABLE_COLUMNS} showHeader />
        </div>
      </article>
    );
  }

  return render();
}

export default MainInvestigated;
