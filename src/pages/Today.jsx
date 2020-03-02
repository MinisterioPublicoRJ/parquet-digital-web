import React from 'react';

import { SectionTitle } from '../components';
import'./todayStyles.css';
// import Promotron from '../../assets/svgs/promotronPaineis';
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
    // this.loadEntriesInfo();
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
    // if (!amount) {
    //   return (
    //     <Text style={Styles.paragraphs}>Percebi que ainda não temos vistas abertas para hoje!</Text>
    //   );
    // }
    // let dayTipe = 'típico';
    // if (amount < lout || amount > hout) {
    //   dayTipe = 'atípico';
    // }
    // return (
    //   <Text style={Styles.paragraphs}>
    //     Hoje temos um dia
    //     <Text style={Styles.bold}>{` ${dayTipe} `}</Text>
    //     com a entrada de
    //     <Text style={Styles.bold}>{` ${amount} `}</Text>
    //     novos feitos.
    //   </Text>
    // );
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

    // if (!percentile || !collectionPhrase || !dayAnalysisComponent)
    //   return <div>CARREGANDO...</div>;

    return (
      <div className="outerWrapper">
        <div className="leftView">
          <SectionTitle value="resumo do dia" />
          {/*<View style={Styles.paragraph}>
            <Text style={Styles.paragraphs}>
              Nos últimos 30 dias a sua Promotoria foi mais resolutiva que
              <Text style={Styles.bold}>{` ${percentile} `}</Text>
              da casa entre aquelas de mesma atribuição.
              {percentile > 0.5 && <Text style={Styles.bold}>Parabéns!</Text>}
            </Text>
          </View>*/}
          {/*<View style={Styles.paragraph}>
            <Text style={Styles.paragraphs}>
              Você sabia que seu acervo é<Text style={Styles.bold}>{` ${collectionPhrase} `}</Text>
              dos seus colegas das
              <Text style={Styles.bold}>{` ${groupName} `}</Text>?
            </Text>
          </View>
          <View style={Styles.paragraph}>{dayAnalysisComponent}</View>
        </View>*/}
        {/*<View style={Styles.rightView}>
          <Promotron width={Styles._promotron.width} />*/}
        </div>
      </div>
    );
  }
}

export default Today;
