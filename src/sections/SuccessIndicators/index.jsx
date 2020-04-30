import React, { useState, useEffect } from 'react';

import './styles.css';
import Api from '../../api';
import { SectionTitle } from '../../components';
import { getUser } from '../../user';

const SuccessIndicators = () => {
  // eslint-disable-next-line no-shadow
  /* const [successIndicators, setSuccessIndicators] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await Api.getListProcesses(getUser());
      setSuccessIndicators(response);
    };
    loadData();
  }, []);

  if (!successIndicators) {
    return <div>loading</div>;
  } */
  return (
    <div className="page-success-indicators">
      <SectionTitle value="Indicadores de sucesso" />
      <p>
        Percebi que dentre suas denúncias oferecidas 35% são relacionadas com Tráfico. Seguido de
        perto por Roubo com (20%) e Estelionato com (10%). Todas as outras denúncias totalizam 35%.
      </p>
      <p>Sua Taxa de Resolutividade</p>
    </div>
  );
};

export default SuccessIndicators;
