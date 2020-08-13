import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../../app/authContext';
import './styles.css';
import { Spinner, SectionTitle } from '../../../components/layoutPieces';
import PerformanceChart from '../../../components/graphs/PerformanceChart';
import IntroductionPerformanceRadar from '../introduction/IntroductionPerfomanceRadar';

const propTypes = {
  getRadarData: PropTypes.func.isRequired,
  cleanMap: PropTypes.func.isRequired,
  axisLabelsTable: PropTypes.shape.isRequired,
};

function PerformanceRadar({ getRadarData, axisLabelsTable, cleanMap }) {
  const { buildRequestParams } = useAuth();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataError, setError] = useState(false);

  useEffect(() => {
    getPerformanceData();
  }, []);

  const getPerformanceData = async () => {
    let res = [];
    try {
      res = await getRadarData(buildRequestParams());
      cleanGraphData(res);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const cleanGraphData = data => {
    const cleanData = Object.entries(data)
      .filter(cat => cat[0] !== 'meta')
      .map(cleanMap);

    setChartData(cleanData);
  };

  if (loading || dataError) {
    return (
      <article className="page-radar-dashboard">
        <div className="radar-header">
          <SectionTitle value="Radar de Performance" subtitle="(últimos 180 dias)" glueToTop />
        </div>
        {loading ? <Spinner size="large" /> : 'Sem dados para exibir'}
      </article>
    );
  }

  return (
    <>
      <article className="page-radar-dashboard">
        <div className="radar-header">
          <SectionTitle value="Radar de Performance" subtitle="(últimos 180 dias)" glueToTop />
        </div>
        <figure className="radar-wrapper">
          <PerformanceChart axisLabelsTable={axisLabelsTable} data={chartData} />
        </figure>
        <figcaption className="radar-subtitles">
          <div className="radar-subtitles-item radar-subtitles-item-yourData">Sua Promotoria</div>
          <div className="radar-subtitles-item radar-subtitles-item-MPData">Perfil do MP</div>
        </figcaption>
      </article>
    </>
  );
}

PerformanceRadar.propTypes = propTypes;
export default PerformanceRadar;
