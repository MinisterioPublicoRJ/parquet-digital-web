import React, { useState, useEffect, useRef } from 'react';

import './styles.css';
import { SearchBox } from 'mapasteca-web';
import ActionButtons from './ActionButtons';
import { TABLE_COLUMNS } from './mainInvestigatedConstants';
import Api from '../../../../api';
import { useAppContext } from '../../../../../core/app/App.context';
import { CustomTable, Spinner, SectionTitle, Pagination, Modal, InvestigatedProfile } from '../../../../components';

function MainInvestigated() {
  const { buildRequestParams, currentOffice } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const [searchString, setSearchString] = useState("");
  const [investigatedProfile, setInvestigatedProfile ] = useState();
  const tableTopDivRef = useRef();
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
  async function getMainInvestigated() {
    let response;
    setLoading(true);
    try {
      response = await Api.getMainInvestigated(buildRequestParams(), searchString, page);
      setTableData(cleanData(response.investigated));
      setTotalPages(response.pages);
    } catch (e) {
      setApiError(true);
    } finally {
      setLoading(false);
    }
  }

  function onMount() {
    getMainInvestigated();
  }

  function onUpdate() {
    getMainInvestigated();
  }

  function handleSearch(searchStr) {
    setSearchString(searchStr);
    setPage(1);
    // getMainInvestigated(searchStr, 1);
  }

  function handlePageClick(nextPage) {
    if (nextPage < 1 || nextPage > totalPages) return;

    if (tableTopDivRef.current) {
      tableTopDivRef.current.scrollIntoView();
    }
    setPage(nextPage);
  }
  useEffect(onUpdate, [searchString, page, totalPages]);

  function render() {
    if (loading || apiError) {
      return (
        <article className="mainInvestigated-outer">
          {loading ? <Spinner size="medium" /> : <p>Nenhum investigado para exibir</p>}
        </article>
      );
    }

    return (
      <article className="mainInvestigated-outer">
        <SearchBox onSearch={handleSearch}>
          <SectionTitle value="Principais Investigados" glueToTop />
        </SearchBox>
        <div className="mainInvestigated-tableWrapper" ref={tableTopDivRef}>
          <CustomTable data={tableData} columns={TABLE_COLUMNS} showHeader />
          <Pagination
            totalPages={totalPages || 0}
            handlePageClick={(page) => handlePageClick(page)}
            currentPage={page}
            />
        </div>
        {
          investigatedProfile && 
          <Modal close={() => setInvestigatedProfile(null)}>
            <InvestigatedProfile close={() => setInvestigatedProfile(null)} representanteDk={investigatedProfile} organType={currentOffice.tipo} />
          </Modal>
        }
      </article>
    );
  }

  return render();
}

export default MainInvestigated;
