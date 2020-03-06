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
      return <p className="paragraphWrapper">Carregando...</p>;
    }

    if (openInvestigationsDetailsError) {
      return <p className="paragraphWrapper">Ocorreu um problema, contate o suporte</p>;
    }

    return (
      <div>
        <OpenInvestigationsDetails collectionVariation30Days={collectionVariation30Days} />
        <div class="columns-2">
          <OpenInvestigationsList topProsecutors={topProsecutors} />
          <section>
            <h3 className="subtitle">Mapa da sua atuação</h3>
          </section>
        </div>
      </div>
    );
  }
}

export default OpenInvestigationsTab;
