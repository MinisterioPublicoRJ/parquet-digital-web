import React from 'react';
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
      loading: true,
      tableData: [],
    };

    this.tableColumns = {
      INVESTIGADO: 'investigado',
      'No. DE INQUÉRITOS': 'numero_investigacoes',
      ' ': 'pin',
    };
  }

  componentDidMount() {
    this.getMainInvestigated();
  }

  /**
   * Function that fetches the main investigated data
   * @return {void}
   */
  async getMainInvestigated() {
    let response;
    let error = false;
    try {
      response = await Api.getMainInvestigated(getUser());
    } catch (e) {
      error = true;
    } finally {
      const tableData = response ? this.parseMainInvestigated(response) : null;
      this.setState({
        loading: false,
        error,
        tableData,
      });
    }
  }

  filterTableData(tableData) {
    let filteredTableData = [];

    // is_removed - Server já está filtrando
    filteredTableData = tableData.filter(item => item.removed === false);
    // Ordering by nr_investigacoes Desc
    filteredTableData.sort((x, y) => y.pinned - x.pinned);

    return filteredTableData;
  }

  parseMainInvestigated(dataFromApi) {
    // format data to render
    let parseResult = dataFromApi.map((item, index) => ({
      id: item.representante_dk,
      key: index.toString(),
      pinned: item.is_pinned,
      removed: item.is_removed,
      investigado: item.nm_investigado,
      numero_investigacoes: item.nr_investigacoes,
      pin: (
        <>
          <button
            type="button"
            onClick={() =>
              this.actionMainInvestigated({
                action: item.is_pinned ? 'unpin' : 'pin',
                representante_dk: item.representante_dk,
              })
            }
          >
            <TackIcon activated={item.is_pinned} />
          </button>
          <button
            type="button"
            onClick={() =>
              this.actionMainInvestigated({
                action: 'remove',
                representante_dk: item.representante_dk,
              })
            }
          >
            <BinIcon />
          </button>
        </>
      ),
    }));

    // Ordering by is_pinned (true) - Dentro da função filterTableData() vai reorganizar após as actions pin/unpin
    parseResult.sort(function(x, y) {
      return x.pinned === y.pinned ? 0 : x.pinned ? -1 : 1;
    });
    parseResult = this.filterTableData(parseResult);

    return parseResult;
  }

  async actionMainInvestigated({ action, representante_dk }) {
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
              <>
                <button
                  type="button"
                  onClick={() =>
                    this.actionMainInvestigated({
                      action: cloneData[itemKey][field] ? 'unpin' : 'pin',
                      representante_dk,
                    })
                  }
                >
                  <TackIcon activated={cloneData[itemKey][field]} />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    this.actionMainInvestigated({
                      action: 'remove',
                      representante_dk: representante_dk,
                    })
                  }
                >
                  <BinIcon />
                </button>
              </>
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
  }

  render() {
    const { loading, tableData, error } = this.state;
    if (loading) {
      return <Spinner size="medium" />;
    }

    if (error) {
      return (
        <article className="mainInvestigated-outer">
          <SectionTitle value="Principais Investigados" />
          Nenhum investigado para exibir
        </article>
      );
    }

    return (
      <article className="mainInvestigated-outer">
        <SectionTitle value="Principais Investigados" />
        <div className="mainInvestigated-tableWrapper">
          <Table data={tableData} columns={this.tableColumns} showHeader />
        </div>
      </article>
    );
  }
}

export default MainInvestigated;
