import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

import './styles.css';
import Api from '../../../api';
import { useAuth } from '../../../app/authContext';
import { Spinner, SectionTitle } from '../../../components/layoutPieces';
import RadarGraph from './RadarGraph';
// import PerformanceChart from '../../../components/graphs/PerformanceChart';

function PerformanceRadar() {
  const { user, buildRequestParams } = useAuth();
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [dataError, setError] = useState(false);

  useEffect(() => {
    getPerformanceData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getPerformanceData() {
    let res = [];
    const { tipo } = user.orgaoSelecionado;
    try {
      // tutela
      if (tipo === 1) {
        res = await Api.getRadarData(buildRequestParams());
      } else {
        // pip
        res = await Api.getPipRadarData(buildRequestParams());
      }
      // console.log('res', res);
      //     cleanGraphData(res);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <article style={{ gridArea: 'alerts' }} className="page-radar-dashboard">
      <div className="radar-header">
        <SectionTitle value="Radar de Performance" subtitle="(últimos 180 dias)" glueToTop />
      </div>
      {loading && !dataError && <Spinner size="large" />}
      {dataError && 'Sem dados para exibir'}
      {!loading && chartData && (
        <figure className="radar-wrapper">
          <RadarGraph xAxis={['a', 'b', 'c', 'd', 'e']} />
        </figure>
      )}
      <figcaption className="radar-subtitles">
        <div className="radar-subtitles-item radar-subtitles-item-yourData">Sua Promotoria</div>
        <div className="radar-subtitles-item radar-subtitles-item-MPData">Perfil do MP</div>
      </figcaption>
    </article>
  );
}

export default PerformanceRadar;
