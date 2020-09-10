import React, { useState, useEffect } from 'react';

import './styles.css';
import ActionButtons from './ActionButtons';
import { TABLE_COLUMNS } from './mainInvestigatedConstants';
import Api from '../../../api';
import { useAuth } from '../../../app/authContext';
import { CustomTable, Spinner, SectionTitle } from '../../../components';

function MainInvestigated({ setIsInvestigatedProfileOpen, setIsModalOpen }) {
  const { buildRequestParams } = useAuth();
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [apiError, setApiError] = useState(false);

  /**
   * uses representanteDk number to remove an investigated from the list, updates the state
   * @param  {number} representanteDk investigated "id"
   * @return {void}                 updates the state
   */
  function deleteInvestigated(representanteDk) {
    Api.actionMainInvestigated({ ...buildRequestParams(), action: 'removed', representanteDk });

    // give user positivie feedback regardless of request success
    setTableData(oldTableData =>
      oldTableData.filter(item => item.representanteDk !== representanteDk),
    );
  }

  /**
   * uses representanteDk number to open the investigated profile modal, updates the state
   * @param  {number} representanteDk investigated "id"
   * @return {void}                 updates the state
   */
  function openInvestigatedProfile(representanteDk) {
    Api.openInvestigatedProfile({ ...buildRequestParams(), representanteDk });
    setIsInvestigatedProfileOpen(true);
    setIsModalOpen(true);
    console.log('OPEN THE INVESTIGATED PROFILE!!!!');
  }

  /**
   * changes ínned status of an investigated, reorders list and updates the state
   * @param  {number} representanteDk investigated "id"
   * @return {void}                 updates the state
   */
  function pinInvestigated(representanteDk) {
    Api.actionMainInvestigated({ ...buildRequestParams(), action: 'pinned', representanteDk });

    // give user positivie feedback regardless of request success
    setTableData(oldTableData => {
      const updatedArray = [...oldTableData];
      const representanteIndex = updatedArray.findIndex(item => {
        return item.representanteDk === representanteDk;
      });

      const oldPinStatus = updatedArray[representanteIndex].isPinned;
      updatedArray[representanteIndex].isPinned = !oldPinStatus;
      // this is necessary to force ActionButtons to update via change in props
      updatedArray[representanteIndex].actions = (
        <ActionButtons
          onPin={() => pinInvestigated(representanteDk)}
          onDelete={() => deleteInvestigated(representanteDk)}
          isPinned={!oldPinStatus}
        />
      );

      return updatedArray.sort((x, y) => y.isPinned - x.isPinned);
    });
  }

  /**
   * tformats the array from the API to be used by the table component
   * @param  {aray} raw response from the MainInvestigated endpoint
   * @return {array}     formatted according to table component props
   */
  function cleanData(raw) {
    return raw.map(({ nmInvestigado, nrInvestigacoes, isPinned, isRemoved, representanteDk }) => ({
      key: `${nmInvestigado}-${nrInvestigacoes}`,
      nmInvestigado: (
        <div onClick={representanteDk => openInvestigatedProfile(representanteDk)}>
          {nmInvestigado}
        </div>
      ),
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

  /**
   * Function that fetches the main investigated data
   * @return {void}
   */
  async function getMainInvestigated() {
    let response;
    try {
      response = await Api.getMainInvestigated(buildRequestParams());
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
          <CustomTable data={tableData} columns={TABLE_COLUMNS} showHeader />
        </div>
      </article>
    );
  }

  return render();
}

export default MainInvestigated;
