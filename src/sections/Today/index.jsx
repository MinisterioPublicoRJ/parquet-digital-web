import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import Api from '../../api';
import { getUser } from '../../user';
import Promotron from '../../assets/svg/promotronPaineis';
import NOMES_PROMOTORIAS from '../../utils/nomesPromotorias';
import { SectionTitle, MainTitle, Spinner } from '../../components';

import { formatPercentage, capitalizeTitle } from '../../utils';

const propTypes = {
  user: PropTypes.string.isRequired,
  loadedCallback: PropTypes.func.isRequired,
};

class Today extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingTodayOut: true,
      loadingTodayEntries: true,
      loadingTodayOutliers: true,
    };
  }

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
   * checks if all the info was fetched from aPI, warns parent when done
   * @param  {boolean} loadingTodayOut
   * @param  {boolean} loadingTodayEntries
   * @param  {boolean} loadingTodayOutliers
   * @return {boolean}
   */
  doneLoading(loadingTodayOut, loadingTodayEntries, loadingTodayOutliers) {
    if (!loadingTodayOut && !loadingTodayEntries && !loadingTodayOutliers) {
      // const { loadedCallback } = this.props;
      // loadedCallback();
      return true;
    }
    return false;
  }

  /**
   * laods percentage data for the first sentence
   * @return {void}
   */
  async loadPercentages() {
    const loadingTodayOut = false;
    let errorTodayOut = false;
    let percentile;
    try {
      const res = await Api.getTodayOutData(getUser());
      percentile = formatPercentage(res);
      console.log(res);
    } catch (e) {
      errorTodayOut = true;
    } finally {
      this.setState(({ loadingTodayEntries, loadingTodayOutliers }) => {
        const doneLoading = this.doneLoading(false, loadingTodayEntries, loadingTodayOutliers);
        return { percentile, loadingTodayOut, errorTodayOut, doneLoading };
      });
    }
  }

  /**
   * loads/reloads info an calls formatters for second sentence data
   * @return {void}
   */
  async loadCollection() {
    let collectionPhrase;
    let groupName;
    let errorTodayOutliers = false;
    try {
      const today = new Date();
      const { primQ, terQ, acervoQtd, cod } = await Api.getTodayOutliersData(getUser(), today);

      collectionPhrase = this.analyzeCollection(primQ, terQ, acervoQtd);
      groupName = NOMES_PROMOTORIAS[cod];
    } catch (e) {
      errorTodayOutliers = true;
    } finally {
      this.setState(({ loadingTodayEntries, loadingTodayOut }) => {
        const doneLoading = this.doneLoading(loadingTodayOut, loadingTodayEntries, false);
        return {
          collectionPhrase,
          loadingTodayOutliers: false,
          errorTodayOutliers,
          doneLoading,
          groupName,
        };
      });
    }
  }

  /**
   * loads/reloads info an calls formatters for third sentence data
   * @return {void}
   */
  async loadEntriesInfo() {
    let entriesParagraph;
    let errorTodayEntries = false;
    try {
      const { hout, lout, numEntries } = await Api.getTodayEntriesData(getUser());

      entriesParagraph = this.analyzeEntries(hout, lout, numEntries);
    } catch (e) {
      errorTodayEntries = true;
    } finally {
      this.setState(({ loadingTodayOut, loadingTodayOutliers }) => {
        const doneLoading = this.doneLoading(loadingTodayOut, false, loadingTodayOutliers);
        return { entriesParagraph, loadingTodayEntries: false, errorTodayEntries, doneLoading };
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

  /**
   * Returns the greeting to be shown on the page
   * @return {string} [description]
   */
  assembleGreeting() {
    const user = this.cleanUsername();
    const hours = new Date().getHours();
    let timeGreeting;

    if (hours >= 6 && hours < 12) {
      timeGreeting = 'bom dia';
    } else if (hours >= 12 && hours < 18) {
      timeGreeting = 'boa tarde';
    } else {
      timeGreeting = 'boa noite';
    }

    return `Olá ${user}, ${timeGreeting}!`;
  }

  /**
   * Gets the original string returned from the API, trims and prettifies it.
   * @return {string} First and last names, just the first letter of each capitalized
   */
  cleanUsername() {
    const { user } = this.props;
    const cleanUsername = user.split(/(\s).+\s/).join('');
    return capitalizeTitle(cleanUsername);
  }

  render() {
    const { percentile, collectionPhrase, groupName, entriesParagraph, doneLoading } = this.state;

    const greeting = this.assembleGreeting();

    const percentParagraph = !percentile ? null : (
      <p className="paragraphWrapper">
        Nos últimos 30 dias a sua Promotoria foi mais resolutiva que
        <span style={{ fontWeight: 'bold' }}>{` ${percentile} `}</span>
        da casa entre aquelas de mesma atribuição.
        {percentile > 0.5 && <span style={{ fontWeight: 'bold' }}>Parabéns!</span>}
      </p>
    );

    const collectionParagraph = !collectionPhrase ? null : (
      <p className="paragraphWrapper">
        Você sabia que seu acervo é
        <span style={{ fontWeight: 'bold' }}>{` ${collectionPhrase} `}</span>
        dos seus colegas das
        <span style={{ fontWeight: 'bold' }}>{` ${groupName}`}</span>?
      </p>
    );

    return (
      <article className="today-outer">
        <div className="today-header">
          <MainTitle value={greeting} />
        </div>
        {!doneLoading && (
          <div className="today-spinner">
            <Spinner size="medium" />
          </div>
        )}
        <div className="today-content">
          <SectionTitle value="resumo do dia" />
          <div className="today-textArea">
            {doneLoading && percentParagraph}
            {doneLoading && collectionParagraph}
            {doneLoading && entriesParagraph}
          </div>
        </div>
        <div className="today-robotPic">
          <Promotron height="100%" />
        </div>
      </article>
    );
  }
}

Today.propTypes = propTypes;
export default Today;
