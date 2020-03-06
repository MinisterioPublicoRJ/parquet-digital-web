import React from 'react';

import { SectionTitle } from '../components';
import './todayStyles.css';
import Promotron from '../assets/svg/promotronPaineis';
import Api from '../api';
import { COD_PROM, COD_PES } from '../constants';
import NOMES_PROMOTORIAS from '../utils/nomesPromotorias';

import { formatPercentage } from '../utils/formatters';

class Today extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    const res = await Api.getTodayOutData(COD_PROM);
    const percentile = formatPercentage(res || 0.657); // mock value as the database isn't complete yet

    this.setState({ percentile });
  }

  /**
   * loads/reloads info an calls formatters for second sentence data
   * @return {void}
   */
  async loadCollection() {
    const today = new Date();
    const res = await Api.getTodayCollectionData(COD_PROM, today);

    const collectionPhrase = this.analyzeCollection(res.primQ, res.terQ, res.acervoQtd);
    const groupName = NOMES_PROMOTORIAS[res.cod];
    this.setState({
      collectionPhrase,
      groupName,
    });
  }

  /**
   * loads/reloads info an calls formatters for third sentence data
   * @return {void}
   */
  async loadEntriesInfo() {
    const res = await Api.getTodayEntriesData(COD_PROM, COD_PES);

    const dayAnalysisComponent = this.analyzeEntries(res.hout, res.lout, res.numEntries);
    this.setState({ dayAnalysisComponent });
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
    const { percentile, collectionPhrase, groupName, dayAnalysisComponent } = this.state;
    const { dashboard } = this.props;
    // TODO: proper loading style/spinner
    if (!percentile || !collectionPhrase || !dayAnalysisComponent) return <div>CARREGANDO...</div>;

    return (
      <article className={`page ${dashboard ? 'dashboard' : 'compact'}`}>
        <SectionTitle value="resumo do dia" />
        <div className="todayLeftView">
          <p className="paragraphWrapper">
            Nos últimos 30 dias a sua Promotoria foi mais resolutiva que
            <span style={{ fontWeight: 'bold' }}>{` ${percentile} `}</span>
            da casa entre aquelas de mesma atribuição.
            {percentile > 0.5 && <span style={{ fontWeight: 'bold' }}>Parabéns!</span>}
          </p>
          <p className="paragraphWrapper">
            Você sabia que seu acervo é
            <span style={{ fontWeight: 'bold' }}>{` ${collectionPhrase} `}</span>
            dos seus colegas das
            <span style={{ fontWeight: 'bold' }}>{` ${groupName} `}</span>?
          </p>
          {dayAnalysisComponent}
        </div>
        <div className="todayRightView">
          <Promotron width="35vw" />
        </div>
      </article>
    );
  }
}

export default Today;
