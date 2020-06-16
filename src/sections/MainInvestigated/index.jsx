import React, { Component } from 'react';
import './styles.css';
import { Table, Spinner, SectionTitle } from '../../components';
import Api from '../../api';
import TackIcon from '../../assets/svg/tack';
import BinIcon from '../../assets/svg/bin';
import { getUser } from '../../user';

class MainInvestigated extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      tableData: [],
      mainInvestigatedData: [],
    };

    this.tableColumns = {
      INVESTIGADO: 'investigado',
      'No. DE INQUÉRITOS': 'numero_inquerito',
      ' ': 'pin',
      '  ': 'bin',
    };

    this.data = [
      {
        investigado: 'Teste 1',
        numero_inquerito: '0000001',
        pin: <TackIcon activated={false} />,
        bin: <BinIcon />,
      },
    ];

    this.actionMainInvestigated = this.actionMainInvestigated.bind();
  }

  componentDidMount() {
    this.getMainInvestigated();
  }

  parseMainInvestigated = dataFromApi => {
    //is_removed
    dataFromApi = dataFromApi.filter(item => item.is_removed === false);
    //Ordering by nr_investigacoes Desc
    dataFromApi.sort((a, b) => b.nr_investigacoes - a.nr_investigacoes);
    // Ordering by is_pinned
    dataFromApi.sort(function(x, y) {
      // true first
      return x.is_pinned === y.is_pinned ? 0 : x.is_pinned ? -1 : 1;
      // false first
      // return (x.is_pinned === .is_pinned)? 0 : x.is_pinned ? 1 : -1;
    });
    //format data to render
    const parseResult = dataFromApi.map(item => ({
      id: item.representante_dk,
      investigado: item.nm_investigado,
      numero_inquerito: item.nr_investigacoes,
      pin: (
        <button
          onClick={() =>
            this.actionMainInvestigated({
              action: item.is_pinned ? 'unpin' : 'pin',
              representante_dk: item.representante_dk,
            })
          }
        >
          <TackIcon activated={item.is_pinned} />
        </button>
      ),
      bin: (
        <button
          onClick={() =>
            this.actionMainInvestigated({
              action: 'remove',
              representante_dk: item.representante_dk,
            })
          }
        >
          <BinIcon />
        </button>
      ),
    }));

    return parseResult;
  };

  /**
   * Function that fetches the main investigated data
   */
  async getMainInvestigated() {
    this.setState({ loading: true });

    let error = false;
    try {
      const response = await Api.getMainInvestigated(getUser());
      this.setState({
        loading: false,
        mainInvestigatedData: response,
        tableData: this.parseMainInvestigated(response),
      });
    } catch (e) {
      error = true;
    }
  }

  /**
   * Function that update the main investigated data
   */
  actionMainInvestigated = ({ action, representante_dk }) => {
    const { orgao, cpf, token } = getUser();

    Api.actionMainInvestigated({ orgao, cpf, token, action, representante_dk })
      .then(response => {
        if (response.status === 'Success!') {
          const cloneData = [...this.state.mainInvestigatedData];
          const itemKey = cloneData.findIndex(item => item.representante_dk == representante_dk);
          switch (action) {
            case 'remove':
              console.log('action', action, representante_dk);

              cloneData[itemKey].is_removed = true;
              //cloneData = cloneData.filter(item => representante_dk != item.representante_dk);
              console.log(cloneData);
              this.setState({
                mainInvestigatedData: cloneData,
                tableData: this.parseMainInvestigated(cloneData),
              });
              return;
            case 'pin':
              cloneData[itemKey].is_pinned = true;
              this.setState({
                mainInvestigatedData: cloneData,
                tableData: this.parseMainInvestigated(cloneData),
              });
              return;
            case 'unpin':
              cloneData[itemKey].is_pinned = false;
              this.setState({
                mainInvestigatedData: cloneData,
                tableData: this.parseMainInvestigated(cloneData),
              });
              return;
          }
          console.log('after', this.state);
        }
      })
      .catch(error => {
        error = true;
      });
  };

  render() {
    const { loading, tableData } = this.state;
    // verifica se esta carregando os dados da api
    if (loading) {
      return <Spinner size="medium" />;
    }

    return (
      <>
        <div className="mainInvestigated-outer">
          <SectionTitle value="Principais Investigados" />
          <div className="mainInvestigated-tableWrapper">
            <Table data={tableData} columns={this.tableColumns} showHeader />
          </div>
        </div>
      </>
    );
  }
}

export default MainInvestigated;
