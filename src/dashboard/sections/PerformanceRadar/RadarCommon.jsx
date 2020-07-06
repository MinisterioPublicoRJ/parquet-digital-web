import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import { getUser } from '../../../user';
import { Spinner, SectionTitle } from '../../../components/layoutPieces';
import  PerformanceChart from '../../../components/graphs/PerformanceChart';


const propTypes = {
  getRadarData: PropTypes.func.isRequired,
  cleanMap: PropTypes.func.isRequired,
  axisLabelsTable: PropTypes.shape.isRequired,
};

class PerformanceRadar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getPerformanceData();
  }

  async getPerformanceData() {
    const { getRadarData } = this.props;
    const res = await getRadarData(getUser());
    this.cleanGraphData(res);
  }

  cleanGraphData(data) {
    const { cleanMap } = this.props;

    const chartData = Object.entries(data)
      .filter(cat => cat[0] !== 'meta')
      .map(cleanMap);

    this.setState({ chartData });
  }

  render() {
    const { axisLabelsTable } = this.props;
    const { chartData } = this.state;

    if (!chartData) return <Spinner />;

    return (
      <article className="page-radar-dashboard">
        <div className="radar-header">
          <SectionTitle value="Radar de Performance" subtitle="(últimos 180 dias)" />
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
}

PerformanceRadar.propTypes = propTypes;
export default PerformanceRadar;
