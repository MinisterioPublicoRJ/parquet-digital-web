import React, { Component } from 'react';

import OpenInvestigationsDetails from './OpenInvestigationsDetails';
import OpenInvestigationsList from './OpenInvestigationsList';
import Api from '../../../api';
import { getUser } from '../../../user';

import { dataStateWrapper } from '../../../utils';

class OpenInvestigationsTab extends Component {
  state = {
    collectionVariation30Days: 0,
    topProsecutors: [],
    openInvestigationsDetailsError: false,
    openInvestigationsDetailsLoading: true,
  };

  async getOpenInvestigationsDetails() {
    try {
      const openInvestigationsDetails = await Api.getOpenInvestigationsDetails(getUser());

      this.setState({ ...openInvestigationsDetails, openInvestigationsDetailsLoading: false });
    } catch (e) {
      console.error('OpenInvestigationsTab#getOpenInvestigationsDetails', e);
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

    return dataStateWrapper(
      <div>
        <OpenInvestigationsDetails collectionVariation30Days={collectionVariation30Days} />
        <div className="columns-2">
          <OpenInvestigationsList topProsecutors={topProsecutors} />
          <section>
            <h3 className="subtitle">Mapa da sua atuação</h3>
          </section>
        </div>
      </div>,
      openInvestigationsDetailsLoading,
      openInvestigationsDetailsError,
    );
  }
}

export default OpenInvestigationsTab;
