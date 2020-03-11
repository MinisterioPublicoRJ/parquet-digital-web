import React, { Component } from 'react';

import CourtCasesDetails from './CourtCasesDetails';
import CourtCasesList from './CourtCasesList';
import Api from '../../../api';

import { dataStateWrapper } from '../../../utils';

import { COD_PROM } from '../../../constants';

class CourtCasesTab extends Component {
  state = {
    proposedActions60Days: 0,
    proposedActionsVariation12Months: 0,
    topProsecutors: [],
    courtCasesDetailsError: false,
    courtCasesDetailsLoading: true,
  };

  async getCourtCasesDetails() {
    try {
      const courtCasesDetails = await Api.getCourtCasesDetails(COD_PROM);

      this.setState({ ...courtCasesDetails, courtCasesDetailsLoading: false });
    } catch (e) {
      console.error('CourtCasesTab#getCourtCasesDetails', e);
      this.setState({
        courtCasesDetailsError: true,
        courtCasesDetailsLoading: false,
      });
    }
  }

  componentDidMount() {
    this.getCourtCasesDetails();
  }

  render() {
    const {
      courtCasesDetailsLoading,
      courtCasesDetailsError,
      proposedActions60Days,
      proposedActionsVariation12Months,
      topProsecutors,
    } = this.state;

    return dataStateWrapper(
      <div>
        <CourtCasesDetails
          proposedActions60Days={proposedActions60Days}
          proposedActionsVariation12Months={proposedActionsVariation12Months}
        />
        <div className="columns-2">
          <CourtCasesList topProsecutors={topProsecutors} />
          <section>
            <h3 className="subtitle">Mapa da sua atuação</h3>
          </section>
        </div>
      </div>,
      courtCasesDetailsLoading,
      courtCasesDetailsError,
    );
  }
}

export default CourtCasesTab;
