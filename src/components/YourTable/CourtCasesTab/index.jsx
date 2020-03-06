import React, { Component } from 'react';

import CourtCasesDetails from './CourtCasesDetails';
import CourtCasesList from './CourtCasesList';
import Api from '../../../api';

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
      console.error('ERROUUUU', e);
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

    if (courtCasesDetailsLoading) {
      return <div>Carregando...</div>;
    }

    if (courtCasesDetailsError) {
      return <div>Ocorreu um problema, contate o suporte</div>;
    }

    return (
      <div>
        <CourtCasesDetails
          proposedActions60Days={proposedActions60Days}
          proposedActionsVariation12Months={proposedActionsVariation12Months}
        />
        <div>
          <CourtCasesList topProsecutors={topProsecutors} />
          <div>Mapa</div>
        </div>
      </div>
    );
  }
}

export default CourtCasesTab;
