import React, { Component } from 'react';

import { SectionTitle } from '../../components';
import './styles.css';
import Promotron from '../../assets/svg/promotronPaineis';
import Api from '../../api';
import { COD_PROM, COD_PES } from '../../constants';
import NOMES_PROMOTORIAS from '../../utils/nomesPromotorias';

import { dataStateWrapper, formatPercentage } from '../../utils';

class Today extends Component {
  state = {
    loadingTodayOut: true,
    loadingTodayEntries: true,
    loadingTodayOutliers: true,

    errorTodayOut: false,
    errorTodayEntries: false,
    errorTodayOutliers: false,
  };

  componentDidMount() {
    this.getUserData();
  }

  /**
   * loads/reloads all page info
   * @return {void}
   */
  getUserData() {
    this.loadPercentages();
    this.loadCollection();
    this.loadEntriesInfo();
  }

  /**
   * laods percentage data for the first sentence
   * @return {void}
   */
  async loadPercentages() {
    try {
      const res = await Api.getTodayOutData(COD_PROM);
      const percentile = formatPercentage(res || 0.657); // mock value as the database isn't complete yet

      this.setState({ percentile, loadingTodayOut: false });
    } catch (e) {
      console.error('Today#loadPercentages error', e);
      this.setState({
        errorTodayOut: true,
        loadingTodayOut: false,
      });
    }
  }

  /**
   * loads/reloads info an calls formatters for second sentence data
   * @return {void}
   */
  async loadCollection() {
    try {
      const today = new Date();
      const { primQ, terQ, acervoQtd, cod } = await Api.getTodayOutliersData(COD_PROM, today);

      const collectionPhrase = this.analyzeCollection(primQ, terQ, acervoQtd);
      const groupName = NOMES_PROMOTORIAS[cod];

      this.setState({
        collectionPhrase,
        groupName,
        loadingTodayOutliers: false,
      });
    } catch (e) {
      console.error('Today#loadCollection error', e);
      this.setState({
        errorTodayOutliers: true,
        loadingTodayOutliers: false,
      });
    }
  }

  /**
   * loads/reloads info an calls formatters for third sentence data
   * @return {void}
   */
  async loadEntriesInfo() {
    try {
      const { hout, lout, numEntries } = await Api.getTodayEntriesData(COD_PROM, COD_PES);

      const dayAnalysisComponent = this.analyzeEntries(hout, lout, numEntries);
      this.setState({ dayAnalysisComponent, loadingTodayEntries: false });
    } catch (e) {
      console.error('Today#loadEntriesInfo error', e);
      this.setState({
        errorTodayEntries: true,
        loadingTodayEntries: false,
      });
    }
  }

  /**
   * compares the number of entries to the business rules to decide which phrase to show. A day can be typical, atypical or empty
   * @param  {Number} hout   how many entries are on the upper boundary of a typical day
   * @param  {Number} lout   how many entries are on the lower boundary of a typical day
   * @param  {Number} amount amount of entries on given day
   * @return {Node}        React element to be inserted on View
   */
  analyzeEntries(hout, lout, amount) {
    if (!amount) {
      return (
        <p className="paragraphWrapper">Percebi que ainda não temos vistas abertas para hoje!</p>
      );
    }
    let dayTipe = 'típico';
    if (amount < lout || amount > hout) {
      dayTipe = 'atípico';
    }
    return (
      <p className="paragraphWrapper">
        Hoje temos um dia
        <span style={{ fontWeight: 'bold' }}>{` ${dayTipe} `}</span>
        com a entrada de
        <span style={{ fontWeight: 'bold' }}>{` ${amount} `}</span>
        novos feitos.
      </p>
    );
  }

  /**
   * returns the right comment based on collection size
   * @param  {number} lower  1st quartile limit
   * @param  {number} higher 3rd quartile limit
   * @param  {number} amount current collection
   * @return {string}        sentence to be used in second paragraph
   */
  analyzeCollection(lower, higher, amount) {
    if (amount < lower) {
      return 'razoavelmente menor que os';
    }

    if (amount > higher) {
      return 'razoavelmente maior que os';
    }

    return 'de volume regular comparado aos';
  }

  render() {
    const {
      percentile,
      collectionPhrase,
      groupName,
      dayAnalysisComponent,
      loadingTodayOut,
      loadingTodayEntries,
      loadingTodayOutliers,

      errorTodayOut,
      errorTodayEntries,
      errorTodayOutliers,
    } = this.state;

    const { dashboard } = this.props;

    return (
      <article className={`page ${dashboard ? 'dashboard' : 'compact'}`}>
        <SectionTitle value="resumo do dia" />
        <div className="leftView">
          {dataStateWrapper(
            <p className="paragraphWrapper">
              Nos últimos 30 dias a sua Promotoria foi mais resolutiva que
              <span style={{ fontWeight: 'bold' }}>{` ${percentile} `}</span>
              da casa entre aquelas de mesma atribuição.
              {percentile > 0.5 && <span style={{ fontWeight: 'bold' }}>Parabéns!</span>}
            </p>,
            loadingTodayOut,
            errorTodayOut,
          )}
          {dataStateWrapper(
            <p className="paragraphWrapper">
              Você sabia que seu acervo é
              <span style={{ fontWeight: 'bold' }}>{` ${collectionPhrase} `}</span>
              dos seus colegas das
              <span style={{ fontWeight: 'bold' }}>{` ${groupName}`}</span>?
            </p>,
            loadingTodayOutliers,
            errorTodayOutliers,
          )}
          {dataStateWrapper(dayAnalysisComponent, loadingTodayEntries, errorTodayEntries)}
        </div>
        <div className="rightView">
          <Promotron width="35vw" />
        </div>
      </article>
    );
  }
}

export default Today;
