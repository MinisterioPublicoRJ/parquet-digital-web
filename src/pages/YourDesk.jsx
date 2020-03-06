import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  SectionTitle,
  TabControl,
  OpenCasesTab,
  OpenInvestigationsTab,
  CourtCasesTab,
} from '../components';

import Api from '../api';

import { COD_PROM, COD_PES } from '../constants';

const Tab = ({ tab }) => {
  if (!tab || tab === 'vistas-abertas') {
    return <OpenCasesTab />;
  }

  if (tab === 'investigacoes-em-curso') {
    return <OpenInvestigationsTab />;
  }

  if (tab === 'processos-em-juizo') {
    return <CourtCasesTab />;
  }
};

class YourDesk extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        tab: PropTypes.string,
      }).isRequired,
      path: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    openCases: 0,
    openInvestigations: 0,
    courtCases: 0,
    closedCases: 0,
  };

  async getOpenCases() {
    const openCases = await Api.getOpenCases(COD_PROM, COD_PES);

    this.setState({ openCases });
  }

  async getOpenInvestigations() {
    const openInvestigations = await Api.getOpenInvestigations(COD_PROM);

    this.setState({ openInvestigations });
  }

  async getClosedCases() {
    const closedCases = await Api.getClosedCases(COD_PROM);

    this.setState({ closedCases });
  }

  async getCourtCases() {
    const courtCases = await Api.getCourtCases(COD_PROM);

    this.setState({ courtCases });
  }

  componentDidMount() {
    this.getOpenCases();
    this.getOpenInvestigations();
    this.getClosedCases();
    this.getCourtCases();
  }

  render() {
    const { match } = this.props;
    const { tab } = match.params;
    const { openCases, openInvestigations, courtCases, closedCases } = this.state;

    return (
      <div>
        <SectionTitle value="Sua Mesa" />
        <TabControl
          match={match}
          data={{ openCases, openInvestigations, courtCases, closedCases }}
        />
        <div>
          <Tab tab={tab} />
        </div>
      </div>
    );
  }
}

export default YourDesk;
