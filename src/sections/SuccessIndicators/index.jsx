import React, { useState, useEffect } from 'react';
import { formatPercent } from '../../utils'
import './styles.css';
import Api from '../../api';
import { SectionTitle, Spinner } from '../../components';
import { getUser } from '../../user';
import SuccessIndicatorsChart from '../../components/graphs/SuccessIndicatorsChart';

const SuccessIndicators = () => {
  const [successIndicators, setSuccessIndicators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      let percentile;
      try {
        const response = await Api.getsuccessIndicators(getUser());
        console.log(response)
        percentile = formatPercent(response);
        console.log(percentile)

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
    <article className="successIndicators-outer">
      <SectionTitle value="Indicadores de sucesso" glueToTop />
      <div className="successIndicators-main">
        <div className="successIndicators-item">
          <h3>Resolutividade</h3>
          <span>Denúncias + arquivamentos + acordos/vistas abertas("i")</span>
          <div className="first-box-tooltip">
            <strong>100%</strong>
          </div>
          <SuccessIndicatorsChart className="chart" data={successIndicators.taxaResolutivdade} color="#F86C72" />
        </div>

        <div className="successIndicators-item">
          <h3>Índice de Elucidação - Denúncias.</h3>
          <span>Número de procedimentos com denúncia("i")</span>
          <div className="second-box-tooltip">
            <strong>30%</strong>
          </div>
          <SuccessIndicatorsChart data={successIndicators.pElucidacoes} color="#F8BD6C" />
        </div>

        <div className="successIndicators-item">
          <h3>Índice de Finalização</h3>
          <span>Andamentos que finalizam o processo("i")</span>
          <div className="third-box-tooltip">
            <strong>40%</strong>
          </div>
          <SuccessIndicatorsChart className="chart" data={successIndicators.pFinalizacoes} color="#71D0A4" />
        </div>
      </div>
    </article>
  );
};

export default SuccessIndicators;
