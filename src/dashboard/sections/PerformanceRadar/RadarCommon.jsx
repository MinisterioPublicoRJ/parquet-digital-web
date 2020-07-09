import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../../app/authContext';
import Api from '../../../api';
import './styles.css';
import { Spinner, SectionTitle } from '../../../components/layoutPieces';
import  PerformanceChart from '../../../components/graphs/PerformanceChart';


const propTypes = {
  getRadarData: PropTypes.func.isRequired,
  cleanMap: PropTypes.func.isRequired,
  axisLabelsTable: PropTypes.shape.isRequired,
};

function PerformanceRadar (){
  const { user } = useAuth();
  const [infoRadar, setinfoRadar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPerformanceData = async () => {
      setLoading(true);
      try {
        const response = await Api.getRadarData(user);
        console.log(response)
        setinfoRadar(cleanGraphData(response));
      } catch (e) {
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };
    getPerformanceData();
  }, []);


  function cleanGraphData(data) {
    const cleanMap = cleanGraphData;

    const infoRadar = Object.entries(data)
      .filter(cat => cat[0] !== 'meta')
      .map(cleanMap);

    infoRadar();
  }

    const { axisLabelsTable } = cleanGraphData;

    if (loading) return <Spinner />;

    return (
      <article className="page-radar-dashboard">
        <div className="radar-header">
          <SectionTitle value="Radar de Performance" subtitle="(últimos 180 dias)" glueToTop />
        </div>
        <figure className="radar-wrapper">
          <div className="radar-graph">
            <PerformanceChart axisLabelsTable={axisLabelsTable} data={infoRadar} />
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
