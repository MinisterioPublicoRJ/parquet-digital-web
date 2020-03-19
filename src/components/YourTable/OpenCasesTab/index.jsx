import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CasesIndicator from '../CasesIndicator';
import OpenCasesTable from './OpenCasesTable';
import Api from '../../../api';
import { dataStateWrapper } from '../../../utils';

import { getUser } from '../../../user';

class OpenCasesTab extends Component {
  static propTypes = {
    table: PropTypes.oneOf(['ate-20-dias', '20-a-30-dias', '30-ou-mais-dias']),
  };

  static defaultProps = {
    table: 'ate-20-dias',
  };

  state = {
    sumUntil20: 0,
    sumBetween20And30: 0,
    sumBeyond30: 0,
    openCasesDetailsLoading: true,
    openCasesDetailsError: false,
  };

  async getOpenCasesDetails() {
    try {
      const openCasesDetails = await Api.getOpenCasesDetails(getUser());

      this.setState({ ...openCasesDetails, openCasesDetailsLoading: false });
    } catch (e) {
      console.error('OpenCasesTab#getOpenCasesDetails: error', e);
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
    const { table, match } = this.props;
    const {
      openCasesDetailsLoading,
      openCasesDetailsError,
      sumUntil20,
      sumBetween20And30,
      sumBeyond30,
    } = this.state;

    return dataStateWrapper(
      <>
        <CasesIndicator
          data={{ sumUntil20, sumBetween20And30, sumBeyond30 }}
          selected={table}
          match={match}
        />
        <OpenCasesTable table={table} />
      </>,
      openCasesDetailsLoading,
      openCasesDetailsError,
    );
  }
}

export default OpenCasesTab;
