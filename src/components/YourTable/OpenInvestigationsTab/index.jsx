import React, { Component } from 'react';

import OpenInvestigationsDetails from './OpenInvestigationsDetails';
import OpenInvestigationsList from './OpenInvestigationsList';
import Api from '../../../api';

import { COD_PROM } from '../../../constants';

class OpenInvestigationsTab extends Component {
  state = {
    collectionVariation30Days: 0,
    topProsecutors: [],
    openInvestigationsDetailsError: false,
    openInvestigationsDetailsLoading: true,
  };

  async getOpenInvestigationsDetails() {
    try {
      const openInvestigationsDetails = await Api.getOpenInvestigationsDetails(COD_PROM);

      this.setState({ ...openInvestigationsDetails, openInvestigationsDetailsLoading: false });
    } catch (e) {
      console.error('ERROUUUU', e);
      this.setState({
        openInvestigationsDetailsError: true,
        openInvestigationsDetailsLoading: false,
      });
    }
  }

  componentDidMount() {
    this.getOpenInvestigationsDetails();
  }

  render() {
    const {
      openInvestigationsDetailsLoading,
      openInvestigationsDetailsError,
      collectionVariation30Days,
      topProsecutors,
    } = this.state;

    if (openInvestigationsDetailsLoading) {
      return <div>Carregando...</div>;
    }

    if (openInvestigationsDetailsError) {
      return <div>Ocorreu um problema, contate o suporte</div>;
    }

    return (
      <div>
        <OpenInvestigationsDetails collectionVariation30Days={collectionVariation30Days} />
        <div>
          <OpenInvestigationsList topProsecutors={topProsecutors} />
          <div>Mapa</div>
        </div>
      </div>
    );
  }
}

export default OpenInvestigationsTab;
