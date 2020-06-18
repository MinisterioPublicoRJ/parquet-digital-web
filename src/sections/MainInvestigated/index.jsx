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
    };

    this.tableColumns = {
      INVESTIGADO: 'investigado',
      'No. DE INQUÉRITOS': 'numero_inquerito',
      ' ': 'pin',
      '  ': 'bin',
    };

    this.actionMainInvestigated = this.actionMainInvestigated.bind();
  }

  componentDidMount() {
    this.getMainInvestigated();
  }

  filterTableData = tableData => {
    let filteredTableData = [];

    //is_removed
    filteredTableData = tableData.filter(item => item.removed === false);
    //Ordering by nr_investigacoes Desc
    filteredTableData.sort((x, y) => y.numero_inquerito - x.numero_inquerito);

    return filteredTableData;
  };

  parseMainInvestigated = dataFromApi => {
    //format data to render
    let parseResult = dataFromApi.map((item, index) => ({
      id: item.representante_dk,
      key: index.toString(),
      pinned: item.is_pinned,
      removed: item.is_removed,
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

    // Ordering by is_pinned (true)
    parseResult.sort(function(x, y) {
      return x.pinned === y.pinned ? 0 : x.pinned ? -1 : 1;
    });

    parseResult = this.filterTableData(parseResult);

    return parseResult;
  };

  /**
   * Function that fetches the main investigated data
   */
  async getMainInvestigated() {
    const { orgao, cpf, token } = getUser();
    this.setState({ loading: true });

    let error = false;
    try {
      const response = await Api.getMainInvestigated(getUser());

      // const apiMainInvestigated = new MainInvestigatedService();
      // const response = await apiMainInvestigated.getMainInvestigated({
      //   orgao,
      //   cpf,
      //   token,
      // });
      this.setState({
        loading: false,
        tableData: this.parseMainInvestigated(response),
      });
    } catch (e) {
      error = true;
    }
  }

  /**
   * Function that update the main investigated data
   */
  actionMainInvestigated = async ({ action, representante_dk }) => {
    const { orgao, cpf, token } = getUser();
    const actions = { pin: 'pinned', unpin: 'pinned', remove: 'removed' };
    const field = actions[action];
    try {
      Api.actionMainInvestigated({ orgao, cpf, token, action, representante_dk }).then(response => {
        if (response.status === 'Success!') {
          const cloneData = [...this.state.tableData];
          const itemKey = cloneData.findIndex(item => item.id == representante_dk);
          cloneData[itemKey][field] = !cloneData[itemKey][field];
          if (['pin', 'unpin'].includes(action)) {
            cloneData[itemKey].pin = (
              <button
                onClick={() =>
                  this.actionMainInvestigated({
                    action: cloneData[itemKey][field] ? 'unpin' : 'pin',
                    representante_dk: representante_dk,
                  })
                }
              >
                <TackIcon activated={cloneData[itemKey][field]} />
              </button>
            );
          }
          this.setState({
            tableData: this.filterTableData(cloneData),
          });
        }
      });
    } catch (error) {
      error = true;
    }
  };

  render() {
    const { loading, tableData } = this.state;
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
