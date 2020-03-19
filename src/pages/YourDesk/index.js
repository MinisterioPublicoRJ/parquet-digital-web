import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  SectionTitle,
  TabControl,
  OpenCasesTab,
  OpenInvestigationsTab,
  CourtCasesTab,
} from '../../components';

import Api from '../../api';
import { dataStateWrapper } from '../../utils';

import './styles.css';

import { getUser } from '../../user';

const Tab = ({ tab, table, match }) => {
  if (!tab || tab === 'vistas-abertas') {
    return <OpenCasesTab table={table} match={match} />;
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

    loadingOpenCases: true,
    loadingOpenInvestigations: true,
    loadingCourtCases: true,
    loadingClosedCases: true,

    errorOpenCases: false,
    errorOpenInvestigations: false,
    errorCourtCases: false,
    errorClosedCases: false,
  };

  async getOpenCases() {
    try {
      const openCases = await Api.getOpenCases(getUser());

      this.setState({ openCases, loadingOpenCases: false });
    } catch (e) {
      console.error('YourDesk#getOpenCases(): error', e);
      this.setState({ loadingOpenCases: false, errorOpenCases: true });
    }
  }

  async getOpenInvestigations() {
    try {
      const openInvestigations = await Api.getOpenInvestigations(getUser());

      this.setState({ openInvestigations, loadingOpenInvestigations: false });
    } catch (e) {
      console.error('YourDesk#getOpenInvestigations(): error', e);
      this.setState({ loadingOpenInvestigations: false, errorOpenInvestigations: true });
    }
  }

  async getClosedCases() {
    try {
      const closedCases = await Api.getClosedCases(getUser());

      this.setState({ closedCases, loadingClosedCases: false });
    } catch (e) {
      console.error('YourDesk#getClosedCases(): error', e);
      this.setState({ loadingClosedCases: false, errorClosedCases: true });
    }
  }

  async getCourtCases() {
    try {
      const courtCases = await Api.getCourtCases(getUser());

      this.setState({ courtCases, loadingCourtCases: false });
    } catch (e) {
      console.error('YourDesk#getCourtCases(): error', e);
      this.setState({ loadingCourtCases: false, errorCourtCases: true });
    }
  }

  componentDidMount() {
    this.getOpenCases();
    this.getOpenInvestigations();
    this.getClosedCases();
    this.getCourtCases();
  }

  render() {
    const { match, dashboard } = this.props;
    const { tab, table } = match?.params;

    const {
      openCases,
      openInvestigations,
      courtCases,
      closedCases,
      loadingOpenCases,
      loadingOpenInvestigations,
      loadingCourtCases,
      loadingClosedCases,
      errorOpenCases,
      errorOpenInvestigations,
      errorCourtCases,
      errorClosedCases,
    } = this.state;

    return (
      <article className={`page ${dashboard ? 'dashboard' : 'compact'}`}>
        <SectionTitle value="Sua Mesa" />
        <TabControl
          match={match}
          data={{
            openCases: dataStateWrapper(openCases, loadingOpenCases, errorOpenCases, 'ERR', '...'),
            openInvestigations: dataStateWrapper(
              openInvestigations,
              loadingOpenInvestigations,
              errorOpenInvestigations,
              'ERR',
              '...',
            ),
            courtCases: dataStateWrapper(
              courtCases,
              loadingCourtCases,
              errorCourtCases,
              'ERR',
              '...',
            ),
            closedCases: dataStateWrapper(
              closedCases,
              loadingClosedCases,
              errorClosedCases,
              'ERR',
              '...',
            ),
          }}
        />
        <div>
          <Tab tab={tab} table={table} match={match} />
        </div>
      </article>
    );
  }
}

export default YourDesk;
