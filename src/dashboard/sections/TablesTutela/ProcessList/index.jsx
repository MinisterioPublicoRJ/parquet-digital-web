import React, { useState, useEffect } from 'react';
import Api from '../../../../api';
import { CustomTable, Spinner } from '../../../../components';
import { useAuth } from '../../../../app/authContext';

const ProcessList = ({ isActive }) => {
  const { buildRequestParams } = useAuth();
  // eslint-disable-next-line no-shadow
  const [processListData, setProcessListData] = useState([]);
  const [loading, setLoading] = useState(true);

  // de-> para dos campos pros nomes das colunas
  const tableColumns = {
    'Nº do Processo': 'docuNrExterno',
    Investigados: 'docuPersonagens',
    Classe: 'classeDocumento',
    'Último Andamento': 'dtUltimoAndamento',
    'Rótulo Andamento': 'ultimoAndamento',
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await Api.getProcessList(buildRequestParams());
        setProcessListData(response);
      } catch (e) {
        setProcessListData(false);
      } finally {
        setLoading(false);
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Spinner size="medium" />;
  }

  return (
    <div className={`${isActive ? 'processList-outer processList--active' : 'processList-outer'}`}>
      {!processListData.length ? (
        <p className="paragraphWrapper"> Nenhum processo para exibir</p>
      ) : (
        <div className="processList-tableWrapper">
          <CustomTable data={processListData} columns={tableColumns} showHeader />
        </div>
      )}
    </div>
  );
};

export default ProcessList;
