import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { dataStateWrapper } from '../../../utils';
import Api from '../../../api';

import { Table } from '../../../components';

import { getUser } from '../../../user';

class OpenCasesTable extends Component {
  static propTypes = {
    table: PropTypes.oneOf(['ate-20-dias', '20-a-30-dias', '30-ou-mais-dias']).isRequired,
  };

  state = {
    openCasesList: [],
    openCasesListLoading: true,
    openCasesListError: false,
  };

  componentDidMount() {
    this.getOpenCasesList();
  }

  componentDidUpdate({ table }) {
    if (table !== this.props.table) {
      this.getOpenCasesList();
    }
  }

  async getOpenCasesList() {
    const { table } = this.props;
    const tablesHash = {
      'ate-20-dias': 'ate_vinte',
      '20-a-30-dias': 'vinte_trinta',
      '30-ou-mais-dias': 'trinta_mais',
    };

    try {
      const openCasesList = await Api.getOpenCasesList(getUser(), tablesHash[table]);

      this.setState({ openCasesList, openCasesListLoading: false });
    } catch (e) {
      console.error('OpenCasesTable#getopenCasesList: error', e);
      this.setState({
        openCasesListError: true,
        openCasesListLoading: false,
      });
    }
  }

  render() {
    const { openCasesList, openCasesListLoading, openCasesListError } = this.state;

    const categories = {
      MPRJ: 'numero_mprj',
      'Nº Externo': 'numero_externo',
      'Último Andamento': 'dt_abertura',
      Classe: 'classe',
    };

    return dataStateWrapper(
      <Table data={openCasesList} columns={categories} showHeader />,
      openCasesListLoading,
      openCasesListError,
    );
  }
}

export default OpenCasesTable;
