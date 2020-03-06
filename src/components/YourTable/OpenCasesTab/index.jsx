import React, { Component } from 'react';

import CasesIndicator from '../CasesIndicator';
import Api from '../../../api';

import { COD_PROM, COD_PES } from '../../../constants';

class OpenCasesTab extends Component {
  state = {
    sumUntil20: 0,
    sumBetween20And30: 0,
    sumBeyond30: 0,
    openCasesDetailsLoading: true,
    openCasesDetailsError: false,
  };

  async getOpenCasesDetails() {
    try {
      const openCasesDetails = await Api.getOpenCasesDetails(COD_PROM, COD_PES);

      this.setState({ ...openCasesDetails, openCasesDetailsLoading: false });
    } catch (e) {
      console.error('ERROUUUU', e);
      this.setState({
        openCasesDetailsError: true,
        openCasesDetailsLoading: false,
      });
    }
  }

  componentDidMount() {
    this.getOpenCasesDetails();
  }

  render() {
    const {
      openCasesDetailsLoading,
      openCasesDetailsError,
      sumUntil20,
      sumBetween20And30,
      sumBeyond30,
    } = this.state;

    if (openCasesDetailsLoading) {
      return <p className="paragraphWrapper">Carregando...</p>;
    }

    if (openCasesDetailsError) {
      return <p className="paragraphWrapper">Ocorreu um problema, contate o suporte</p>;
    }

    return <CasesIndicator data={{ sumUntil20, sumBetween20And30, sumBeyond30 }} />;
  }
}

export default OpenCasesTab;
