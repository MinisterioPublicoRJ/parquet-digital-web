import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../../app/authContext';
import './styles.css';
import { Spinner, SectionTitle } from '../../../components/layoutPieces';
import  PerformanceChart from '../../../components/graphs/PerformanceChart';


const propTypes = {
  getRadarData: PropTypes.func.isRequired,
  cleanMap: PropTypes.func.isRequired,
  axisLabelsTable: PropTypes.shape.isRequired,
};

function PerformanceRadar ({ getRadarData, axisLabelsTable, cleanMap }) {
  const { user } = useAuth();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPerformanceData();
  }, [])

  const getPerformanceData = async () => {
    let res = []
    setLoading(true);
    try {
    res = await getRadarData(user);
    console.log(res)
    setChartData(res);
    cleanGraphData(res);
    } catch (e) {
    setLoading(true);
    } finally {
    setLoading(false);
    }
  }

  const cleanGraphData = (data) => {
    const chartData = Object.entries(data)
      .filter(cat => cat[0] !== 'meta')
      .map(cleanMap);

    setChartData(chartData);
  }
    if (loading) {
      return (
        <article className="page-radar-dashboard">
          <Spinner size="large" />
        </article>
      );
    }
  
    return (
      <article className="page-radar-dashboard">
        <div className="radar-header">
          <SectionTitle value="Radar de Performance" subtitle="(últimos 180 dias)" glueToTop />
        </div>
        <figure className="radar-wrapper">
          <div className="radar-graph">
            <PerformanceChart axisLabelsTable={axisLabelsTable} data={chartData} />
          </div>
          <figcaption className="radar-subtitles">
            <div className="radar-subtitles-item radar-subtitles-item-yourData">Sua Promotoria</div>
            <div className="radar-subtitles-item radar-subtitles-item-MPData">Perfil do MP</div>
          </figcaption>
        </figure>
      </article>
    );
}

PerformanceRadar.propTypes = propTypes;
export default PerformanceRadar;
