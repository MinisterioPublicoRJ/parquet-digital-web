import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Api from '../../../../../api';
import { CustomTable, Spinner, Pagination } from '../../../../../components';
import { useAppContext } from '../../../../../../core/app/App.context';
import { highlightJSX } from '../../../../../utils';

import {
  onGoingInvestigationsOuter,
  onGoingInvestigationsActive,
  investigatedProfileBtn,
  processDetailBtnStyle,
} from '../styles.module.css';

const propTypes = {
  isActive: PropTypes.bool,
  setInvestigatedProfile: PropTypes.func.isRequired,
  setProcessDetail: PropTypes.func.isRequired,
  searchString: PropTypes.string,
};

const defaultProps = {
  isActive: false,
  searchString: '',
}

function OngoingInvestigations({isActive, setInvestigatedProfile, setProcessDetail, searchString,}) {
  const { buildRequestParams } = useAppContext();
  // eslint-disable-next-line no-shadow
  const [ongoingInvestigationsListData, setOngoingInvestigationsListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const tableTopDivRef = useRef();

  // de-> para dos campos pros nomes das colunas
  const tableColumns = {
    'Nº do Procedimento': 'docuNrMp',
    'Último Andamento': 'dtUltimoAndamento',
    Classe: 'classeDocumento',
    Investigados: 'docuPersonagens',
  };

  function handlePageClick(nextPage) {
    if (nextPage < 1 || nextPage > totalPages) return;

    if (tableTopDivRef.current) {
      tableTopDivRef.current.scrollIntoView();
    }
    setPage(nextPage);
  }

  function generateButtons(list) {
    return list.map((investigation) => {
      const { representanteDk, docuPersonagens, docuNrMp, docuNrExterno } = investigation;

      let highlightedOngoingInvestigations = {};
      if (searchString) {
        Object.entries(investigation).forEach(([key, value]) => {
          highlightedOngoingInvestigations[key] = highlightJSX(value, searchString);
        });
      } else {
        highlightedOngoingInvestigations = investigation;
      }

      const investigatedNameBtn = representanteDk ? (
        <button
          type="button"
          onClick={(event) => {
            setInvestigatedProfile(representanteDk, event);
          }}
          className={ investigatedProfileBtn }
        >
          {docuPersonagens}
        </button>
      ) : (
        docuPersonagens
      );
      const processDetailBtn = docuNrMp ? (
        <button
          type="button"
          onClick={(event) => {
            setProcessDetail(docuNrMp, docuNrExterno, event);
          }}
          className={ processDetailBtnStyle }
        >
          {highlightedOngoingInvestigations.docuNrMp}
        </button>
      ) : (
        docuNrMp
      );
      return { ...investigation, docuPersonagens: investigatedNameBtn, docuNrMp: processDetailBtn };
    });
  }

  useEffect(() => {
    setPage(1);
  }, [searchString]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      try {
        
        const response = await Api.getOngoingInvestigationsList(
          buildRequestParams(),
          page,
          searchString,
        );
        const buttonList = generateButtons(response.data);
        setOngoingInvestigationsListData(buttonList);
        setTotalPages(response.pages);
      } catch (e) {
        setOngoingInvestigationsListData(false);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [page, totalPages, searchString]);

  if (loading) {
    return <Spinner size="medium" />;
  }
  return (
    <div
      className={`${
        isActive
          ? `${ onGoingInvestigationsOuter } ${ onGoingInvestigationsActive }`
          : `${ onGoingInvestigationsOuter }`
      }`}
    >
      {!ongoingInvestigationsListData.length ? (
        <p className="paragraphWrapper"> Nenhum processo para exibir</p>
      ) : (
        <div className="ongoingInvestigations-tableWrapper">
          <div className="investigated-table-top" ref={tableTopDivRef} />
          <CustomTable data={ongoingInvestigationsListData} columns={tableColumns} showHeader />
          <Pagination
            totalPages={totalPages || 0}
            handlePageClick={(clickedPage) => handlePageClick(clickedPage)}
            currentPage={page}
          />
        </div>
      )}
    </div>
  );
}

OngoingInvestigations.propTypes = propTypes;
OngoingInvestigations.defaultProps = defaultProps;

export default OngoingInvestigations;
