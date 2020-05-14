import React, { useState, useEffect } from 'react';

import './styles.css';
import Api from '../../api';
import { SectionTitle, Spinner } from '../../components';
import { getUser } from '../../user';
import SuccessIndicatorsChart from '../../components/graphs/SuccessIndicatorsChart';

const SuccessIndicators = () => {
  // eslint-disable-next-line no-shadow
  const [successIndicators, setSuccessIndicators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await Api.getsuccessIndicators(getUser());
        setSuccessIndicators(response);
      } catch (e) {
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <Spinner size="medium" />;
  }
  return (
    <div className="page-success-indicators">
      <SectionTitle value="Indicadores de sucesso" />
      <p>
        Percebi que dentre suas denúncias oferecidas <strong>35%</strong> são relacionadas com <strong>Tráfico</strong>. Seguido
        <strong>por Roubo com (20%)</strong> e <strong>Estelionato com (10%)</strong>.
      </p>
      <p>Todas as outras denúncias totalizam <strong>35%.</strong></p>
      <SuccessIndicatorsChart />
    </div>
  );
};

export default SuccessIndicators;
