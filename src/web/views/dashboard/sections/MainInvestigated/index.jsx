/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from 'react';
import { SearchBox } from '../../../../components/layoutPieces';
import {
  mainInvestigatedOuter,
  mainInvestigatedTableWrapper,
  investigatedProfileBtn,
  mainInvestigatedOuterBoxSearch,
} from './styles.module.css';
import ActionButtons from './ActionButtons';
import { TABLE_COLUMNS } from './mainInvestigatedConstants';
import { useAppContext } from '../../../../../core/app/App.context';
import {
  CustomTable,
  Spinner,
  SectionTitle,
  Pagination,
  Modal,
  InvestigatedProfile,
} from '../../../../components';
import { highlightJSX } from '../../../../utils';


function MainInvestigated() {
  const { buildRequestParams, currentOffice, Api } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const [searchString, setSearchString] = useState('');
  const [investigatedProfile, setInvestigatedProfile] = useState();
  const [selectedElement, setSelectedElement] = useState({});
  const tableTopDivRef = useRef() ;

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
      const representanteIndex = updatedArray.findIndex(
        (item) => item.representanteDk === representanteDk,
      );

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
    return raw.map((investigated) => {
      let highlightedInvestigated = {};

      if (searchString) {
        Object.entries(investigated).forEach(([key, value]) => {
          highlightedInvestigated[key] = highlightJSX(value, searchString);
        });
      } else {
        highlightedInvestigated = investigated;
      }

      const { nmInvestigado, nrInvestigacoes, isPinned, isRemoved, representanteDk } =
        highlightedInvestigated;

      const investigatedNameBtn = (
        <button
          type="button"
          onClick={(event) => {
            setSelectedElement(event?.target);
            setInvestigatedProfile(representanteDk);
          }}
          className={investigatedProfileBtn}
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

  useEffect(() => {
    setPage(1);
  }, [searchString]);
  
  useEffect(() => {
  const  getMainInvestigated = async() => {
    let response;
    setLoading(true);
    try {
      response = await Api.getMainInvestigated(buildRequestParams(), page, totalPages, searchString);
      setTableData(cleanData(response.investigated));
      setTotalPages(response.pages);
    } catch (e) {
      setApiError(true);
    } finally {
      setLoading(false);
    }
  }; 
  getMainInvestigated()
}, [page, totalPages, searchString]);

  const onSearch = (searchStr) => {
    setSearchString(searchStr);
  }

  function handlePageClick(nextPage) {
    if (nextPage < 1 || nextPage > totalPages) return;

    if (tableTopDivRef.current) {
      tableTopDivRef.current.scrollIntoView();
    }
    setPage(nextPage);
  }


  function render() {
    if (loading || apiError) {

      return (
        <article className={mainInvestigatedOuter}>
          {loading ? <Spinner size="medium" /> : <p>Nenhum investigado para exibir</p>}
        </article>
      );
    }

    return (
      <article className={mainInvestigatedOuter}>
        <div className={mainInvestigatedOuterBoxSearch}>
          <SectionTitle value="Principais Investigados" />
          <SearchBox onSearch={onSearch}/>
        </div>
        <div className={mainInvestigatedTableWrapper} ref={tableTopDivRef}>
          <CustomTable 
            data={tableData} 
            columns={TABLE_COLUMNS} 
            showHeader      
            searchString={searchString}
          />
          <Pagination
            totalPages={totalPages || 0}
            handlePageClick={(clickedPage) => handlePageClick(clickedPage)}
            currentPage={page}
          />
        </div>
        {investigatedProfile && (
          <Modal
            withExitButton
            previousElement={selectedElement}
            close={() => setInvestigatedProfile(null)}
          >
            <InvestigatedProfile
              close={() => setInvestigatedProfile(null)}
              representanteDk={investigatedProfile}
              organType={currentOffice.tipo}
            />
          </Modal>
        )}
      </article>
    );
  }

  return render();
}

export default MainInvestigated;
