import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

import './styles.css';
import Api from '../../../api';
import { useAuth } from '../../../app/authContext';
import { Spinner, SectionTitle } from '../../../components/layoutPieces';
import RadarGraph from './RadarGraph';
import {
  NORTH_LABEL_PROPS,
  WEST_LABEL_PROPS,
  SOUTH_WEST_LABEL_PROPS,
  SOUTH_EAST_LABEL_PROPS,
  EAST_LABEL_PROPS,
  TUTELA_CATEGORIES,
} from './radarConstants';
// import PerformanceChart from '../../../components/graphs/PerformanceChart';

function PerformanceRadar() {
  const { user, buildRequestParams } = useAuth();
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);
  const [dataError, setError] = useState(false);

  useEffect(() => {
    getPerformanceData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getPerformanceData() {
    let res = {};
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
      generateLabels(res, tipo);
      setLoading(false);
    }
  }

  function generateLabels(graphData, organType) {
    // console.log('graphData', graphData);
    const categories = organType === 1 ? TUTELA_CATEGORIES : [];
    const labels = categories.map((cat) => {
      let positionProps;
      let label;
      const maxValues = graphData[cat] ? graphData[cat].maxValues : 0;
      switch (cat) {
        case 'archives':
          label = ['Arquivamentos', `(máx atribuição ${maxValues})`];
          positionProps = NORTH_LABEL_PROPS;
          break;
        case 'tac':
          label = ['Termos', 'de ajuste', 'de conduta', `(máx atribuição ${maxValues})`];
          positionProps = WEST_LABEL_PROPS;
          break;
        case 'instaurations':
          label = [`(máx atribuição ${maxValues})`, 'Instauração de', 'Investigações'];
          positionProps = SOUTH_EAST_LABEL_PROPS;
          break;
        case 'rejections':
          label = [`(máx atribuição ${maxValues})`, 'Indeferimentos', 'de plano'];
          positionProps = SOUTH_WEST_LABEL_PROPS;
          break;
        case 'actions':
          label = ['Ações', 'civil', 'publicas', `(máx atribuição ${maxValues})`];
          positionProps = EAST_LABEL_PROPS;
          break;
        default:
      }
      return { category: cat, label, ...positionProps };
    });
    setChartLabels(labels);
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
          <RadarGraph xAxis={chartLabels} />
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
