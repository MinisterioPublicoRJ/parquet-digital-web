import React, { useState, useEffect, useRef } from 'react';
import Api from '../../../../api';
import { CustomTable, Spinner, Pagination } from '../../../../components';
import { useAppContext } from '../../../../../core/app/App.context';
import { highlightJSX } from '../../../../utils';

import {
  tableCriminalOuter,
  investigatedProfileBtn,
  processDetailBtnStyle,
  todayTextAreaCriminal,
  processListTableWrapper
} from './styles.module.css';

function ProcessListCriminal({ isActive, setInvestigatedProfile, setProcessDetail, searchString }) {
  const { buildRequestParams, currentOffice } = useAppContext();
  // eslint-disable-next-line no-shadow
  const [processListData, setProcessListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const tableTopDivRef = useRef();

  // de-> para dos campos pros nomes das colunas
  const tableColumns = {
    'Nº do Processo': 'docuNrExterno',
    Demandados: 'docuPersonagens',
    Classe: 'classeDocumento',
    'Último Andamento': 'dtUltimoAndamento',
    'Rótulo Andamento': 'ultimoAndamento',
  };

  function handlePageClick(nextPage) {
    if (nextPage < 1 || nextPage > totalPages) return;

    if (tableTopDivRef.current) {
      tableTopDivRef.current.scrollIntoView();
    }
    setPage(nextPage);
  }

  function generateButtons(list) {
    return list.map((process) => {
      const { representanteDk, docuPersonagens, docuNrExterno, docuNrMp } = process;

      let highlightedAProcessList = {};
      if (searchString) {
        Object.entries(process).forEach(([key, value]) => {
          highlightedAProcessList[key] = highlightJSX(value, searchString);
        });
      } else {
        highlightedAProcessList = process;
      }

      const investigatedNameBtn = representanteDk ? (
        <button
          type="button"
          onClick={(event) => {
            setInvestigatedProfile(representanteDk, event);
          }}
          className={investigatedProfileBtn}
        >
          {docuPersonagens}
        </button>
      ) : (
        docuPersonagens
      );

      const processNumberBtn = (
        <button
          type="button"
          onClick={(event) => {
            setProcessDetail(docuNrMp, docuNrExterno, event);
          }}
          className={processDetailBtnStyle}
        >
          {highlightedAProcessList.docuNrExterno}
        </button>
      );

      return { ...process, docuPersonagens: investigatedNameBtn, docuNrExterno: processNumberBtn };
    });
  }

  useEffect(() => {
    setPage(1);
  }, [searchString]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await Api.getProcessList(buildRequestParams(), page, searchString);
        const buttonList = generateButtons(response.data);
        setProcessListData(buttonList);
        setTotalPages(response.pages);
      } catch (e) {
        setProcessListData(false);
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
    <div className={tableCriminalOuter}>
      <div className={processListTableWrapper}>
      <h2>Lista de processos criminais</h2>
        {/* {!processListData.length && currentOffice.tipo === 7 ? (
          <p>Nenhum processo para exibir</p>
        ) : (
          <>
            <div className="investigated-table-top" ref={tableTopDivRef} />
            <CustomTable data={processListData} columns={tableColumns} showHeader />
            <Pagination
              totalPages={totalPages || 0}
              handlePageClick={(clickedPage) => handlePageClick(clickedPage)}
              currentPage={page}
            />
          </>
        )} */}
      </div>
      {currentOffice.tipo === 7  ? (
        <div className={todayTextAreaCriminal}>
          <h2>Em breve</h2>
          <p>Para mais informações consulte o manual de uso no menu lateral.</p>
        </div>
      ) : null}
    </div>
  );
}

export default ProcessListCriminal;
