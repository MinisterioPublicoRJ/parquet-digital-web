import React, { useState, useEffect } from 'react';

import './styles.css';
import ActionButtons from './ActionButtons';
import { TABLE_COLUMNS } from './mainInvestigatedConstants';
import Api from '../../../api';
import { useAuth } from '../../../app/authContext';
import { Table, Spinner, SectionTitle } from '../../../components';

function MainInvestigated() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [apiError, setApiError] = useState(false);

  const pinInvestigated = representanteDk => {
    Api.actionMainInvestigated({ ...user, action: 'pinned', representanteDk });

    // give user positivie feedback regardless of request success
    setTableData(oldTableData => {
      const updatedArray = [...oldTableData];
      const representanteIndex = updatedArray.findIndex(item => {
        return item.representanteDk === representanteDk;
      });

      const oldPinStatus = updatedArray[representanteIndex].isPinned;
      updatedArray[representanteIndex].isPinned = !oldPinStatus;
      // this is necessary to update the ActionButtons props
      updatedArray[representanteIndex].actions = (
        <ActionButtons
          onPin={() => pinInvestigated(representanteDk)}
          onDelete={() => deleteInvestigated(representanteDk)}
          isPinned={!oldPinStatus}
        />
      );

      return updatedArray.sort((x, y) => y.isPinned - x.isPinned);
    });
  };

  function deleteInvestigated(representanteDk) {
    Api.actionMainInvestigated({ ...user, action: 'removed', representanteDk }).then(res => console.log(res));

    setTableData(oldTableData =>
      oldTableData.filter(item => item.representanteDk !== representanteDk),
    );
  }

  function cleanData(raw) {
    return raw.map(({ nmInvestigado, nrInvestigacoes, isPinned, isRemoved, representanteDk }) => ({
      key: `${nmInvestigado}-${nrInvestigacoes}`,
      nmInvestigado,
      nrInvestigacoes,
      isPinned,
      isRemoved,
      representanteDk,
      actions: (
        <ActionButtons
          onPin={() => pinInvestigated(representanteDk)}
          onDelete={() => deleteInvestigated(representanteDk)}
          isPinned={isPinned}
        />
      ),
    }));
  }

  function filterAndSortTableData(rawData) {
    // is_removed - Server já está filtrando
    // Ordering by nr_investigacoes Desc
    return rawData.filter(item => item.isRemoved === false).sort((x, y) => y.isPinned - x.isPinned);
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
