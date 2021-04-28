import React, { useState, useEffect } from 'react';

import './styles.css';
import ActionButtons from './ActionButtons';
import { TABLE_COLUMNS } from './mainInvestigatedConstants';
import Api from '../../../api';
import { useAuth } from '../../../app/authContext';
import { CustomTable, Spinner, SectionTitle } from '../../../components';

function MainInvestigated({ setInvestigatedProfile }) {
  const { buildRequestParams } = useAuth();
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [searchString, setSearchString] = useState();

  /**
   * uses representanteDk number to remove an investigated from the list, updates the state
   * @param  {number} representanteDk investigated "id"
   * @return {void}                 updates the state
   */
  function deleteInvestigated(representanteDk) {
    Api.actionMainInvestigated({ ...buildRequestParams(), action: 'remove', representanteDk });

    // give user positivie feedback regardless of request success
    setTableData((oldTableData) =>
      oldTableData.filter((item) => item.representanteDk !== representanteDk),
    );
  }

  /**
   * changes ínned status of an investigated, reorders list and updates the state
   * @param  {number} representanteDk investigated "id"
   * @return {void}                 updates the state
   */
  function pinInvestigated(isPinned, representanteDk) {
    Api.actionMainInvestigated({
      ...buildRequestParams(),
      action: isPinned ? 'unpin' : 'pin',
      representanteDk,
    });

    // give user positivie feedback regardless of request success
    setTableData((oldTableData) => {
      const updatedArray = [...oldTableData];
      const representanteIndex = updatedArray.findIndex((item) => {
        return item.representanteDk === representanteDk;
      });

      const oldPinStatus = updatedArray[representanteIndex].isPinned;
      updatedArray[representanteIndex].isPinned = !oldPinStatus;
      // this is necessary to force ActionButtons to update via change in props
      updatedArray[representanteIndex].actions = (
        <ActionButtons
          onPin={() => pinInvestigated(!oldPinStatus, representanteDk)}
          onDelete={() => {
            window.confirm(
              'Essa ação não pode ser desfeita. \r\nVocê tem certeza que deseja excluir?',
            ) && deleteInvestigated(representanteDk);
          }}
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
    return raw.map(({ nmInvestigado, nrInvestigacoes, isPinned, isRemoved, representanteDk }) => {
      const investigatedNameBtn = (
        <button
          type="button"
          onClick={() => {
            setInvestigatedProfile(representanteDk);
          }}
          className="investigated-profile-btn"
        >
          {nmInvestigado}
        </button>
      );
      const rowInfo = {
        key: `${nmInvestigado}-${nrInvestigacoes}`,
        nmInvestigado: investigatedNameBtn,
        nrInvestigacoes,
        isPinned,
        isRemoved,
        representanteDk,
        actions: (
          <ActionButtons
            onPin={() => pinInvestigated(isPinned, representanteDk)}
            onDelete={() => {
              window.confirm(
                'Essa ação não pode ser desfeita. \r\nVocê tem certeza que deseja excluir?',
              ) && deleteInvestigated(representanteDk);
            }}
            isPinned={isPinned}
          />
        ),
        title: nmInvestigado,
      };
      return rowInfo;
    });
  }

  /**
   * Function that fetches the main investigated data
   * @return {void}
   */
  async function getMainInvestigated(searchString) {
    let response;
    try {
      response = await Api.getMainInvestigated(buildRequestParams(), searchString);
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <form>
          <input type="text" value={searchString} onChange={(event)=> setSearchString(event.target.value) }/>
          <button
          className="investigated-profile-btn"
            type="button"
            onClick={() => {
              getMainInvestigated(searchString);
            }}
          >
            Pesquisar
          </button>
        </form>
        <div className="mainInvestigated-tableWrapper">
          <CustomTable data={tableData} columns={TABLE_COLUMNS} showHeader />
        </div>
      </article>
    );
  }

  return render();
}

export default MainInvestigated;
