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
        console.log(response)
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

  let obj = successIndicators
  return (
    <div className="page-success-indicators">
      <SectionTitle value="Indicadores de sucesso" />
      <p>
        Percebi que dentre suas denúncias oferecidas
        <strong> ({obj.ranking[0].perc.toFixed(0)}%)</strong> são relacionadas com <strong> {obj.ranking[0].assunto}</strong>.
        Seguido de perto por <strong> {obj.ranking[1].assunto}</strong> <strong> ({obj.ranking[1].perc.toFixed(0)}%)</strong>
        e <strong> {obj.ranking[2].assunto}</strong> <strong> ({obj.ranking[2].perc.toFixed(0)}%)</strong>
      </p>
      <p>Todas as outras denúncias totalizam <strong>({obj.others.perc.toFixed(0)}%)</strong></p>
      <SuccessIndicatorsChart data={obj.taxa_resolutivdade} />
    </div>
  );
};

export default SuccessIndicators;
