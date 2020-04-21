import React, { Component } from 'react';

import './styles.css';
import { SectionTitle, ControlButton } from '../../components';
import Api from '../../api';
import { Table } from '../../components/index';

class MainInvestigated extends React.Component {
  constructor(props) {
    super(props);

    this.data = [
      {
        investigado: 'teste',
        numero_inquerito: '0000000',
        pin: 'pin.svg',
        bin: 'bin.svg',
      },
    ];

    this.tableColumns = {
      INVESTIGADO: 'investigado',
      'NÚMERO DE INQUÉRITOS': 'numero_inquerito',
      PIN: 'pin',
      BIN: 'bin',
    };
  }

  componentDidMount() {
    this.getMainInvestigatedList();
  }

  /**
   * Function that fetches the main investigated data
   * @param  {string}  user
   * @return {void}     just saves to state
   */
  async getMainInvestigatedList() {}

  render() {
    return (
      <>
        <div class="mainInvestigated">
          <h2>Principais Investigados</h2>
          {<Table data={this.data} columns={this.tableColumns} showHeader />}
        </div>
      </>
    );
  }
}

export default MainInvestigated;
