import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../../app/authContext';

import './styles.css';
import Api from '../../../api';
import PromotronGif from '../../../assets/gifs/promotron.gif';
import NOMES_PROMOTORIAS from '../../../utils/nomesPromotorias';
import { SectionTitle, MainTitle, Spinner } from '../../../components/layoutPieces';

import { formatPercentage, capitalizeTitle } from '../../../utils';

const propTypes = {
  user: PropTypes.string.isRequired,
};

function Today () {
  const { user } = useAuth();
  const [loadingTodayOut, setLoadingTodayOut] = useState([]);
  const [loadingTodayEntries, setLoadingTodayEntries] = useState([]);
  const [loadingTodayOutliers, setLoadingTodayOutliers] = useState([]);
  const [dataError, setError] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    getUserData();
  }, []);

  /**
   * loads/reloads all page info
   * @return {void}
   */
  function getUserData() {
    loadPercentages();
    loadEntriesInfo();
    loadCollection();
  }

  /**
   * checks if all the info was fetched from aPI, warns parent when done
   * @param  {boolean} loadingTodayOut
   * @param  {boolean} loadingTodayEntries
   * @param  {boolean} loadingTodayOutliers
   * @return {boolean}
   */
  function doneLoading(loadingTodayOut, loadingTodayEntries, loadingTodayOutliers) {
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
  const loadPercentages = async () => {
    const loadingTodayOut = false;
    let errorTodayOut = false;
    let percentile;
    try {
      const res = await Api.getTodayOutData(user);
      percentile = formatPercentage(res);
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

  // loadCollection Tutela
  const loadCollection = async () => {
    let collectionPhrase;
    let groupName;
    let errorTodayOutliers = false;
    try {
      const today = new Date();
      const { primQ, terQ, acervoQtd, cod } = await Api.getTodayOutliersData(user, today);

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
  const loadEntriesInfo = async () => {
    let entriesParagraph;
    let errorTodayEntries = false;
    try {
      const { hout, lout, numEntries } = await Api.getTodayEntriesData(user);
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

  function analyzeEntries(hout, lout, amount) {
    if (!amount) {
      return (
        <p className="today-textArea-paragraphWrapper">
          Percebi que ainda não temos vistas abertas para hoje!
        </p>
      );
    }
    let dayTipe = 'típico';
    if (amount < lout || amount > hout) {
      dayTipe = 'atípico';
    }
    return (
      <p className="today-textArea-paragraphWrapper">
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
  function analyzeCollection(lower, higher, amount) {
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
  function assembleGreeting() {
    const user = this.cleanUsername();
    const hours = new Date().getHours();
    const gender = this.props.user.sexo;

    let timeGreeting;

    if (hours >= 6 && hours < 12) {
      timeGreeting = 'bom dia';
    } else if (hours >= 12 && hours < 18) {
      timeGreeting = 'boa tarde';
    } else {
      timeGreeting = 'boa noite';
    }

    return `Olá ${gender === 'M' ? 'Dr. ' : 'Dra.'} ${user}, ${timeGreeting}!`;
  }

  /**
   * Gets the original string returned from the API, trims and prettifies it.
   * @return {string} First and last names, just the first letter of each capitalized
   */
  function cleanUsername() {
    const { userName } = this.props;
    const cleanUsername = userName.split(' ')[0];
    return capitalizeTitle(cleanUsername);
  }

    const { percentile, collectionPhrase, groupName, entriesParagraph } = this.state;

    const greeting = assembleGreeting();

    const percentParagraph = !percentile ? null : (
      <p className="today-textArea-paragraphWrapper">
        No último mês a sua promotoria foi mais resolutiva que
        <span style={{ fontWeight: 'bold' }}>{` ${percentile} `}</span>
        da casa entre aquelas de mesma atribuição.
        {percentile > 0.5 && <span style={{ fontWeight: 'bold' }}>Parabéns!</span>}
      </p>
    );
    const collectionParagraph = !collectionPhrase ? null : (
      <p className="today-textArea-paragraphWrapper">
        Você sabia que seu acervo é
        <span style={{ fontWeight: 'bold' }}>{` ${collectionPhrase} `}</span>
        dos seus colegas das
        <span style={{ fontWeight: 'bold' }}>{` ${groupName}`}</span>
        ?
      </p>
    );

    if (loading || dataError) {
      return (
        <article className="today-outer">
          <div className="today-header">
            <SectionTitle value="Resumo do dia" glueToTop />
          </div>
          {loading ? <Spinner size="large" /> : 'Sem dados para exibir'}
        </article>
      );
    }
  
    return (
      <article className="today-outer">
        <div className="today-header">
          <MainTitle value={greeting} />
        </div>
        <div className="today-content">
          <SectionTitle value="resumo do dia" glueToTop />
          <div className="today-textArea">
            {percentParagraph}
            {collectionParagraph}
            {entriesParagraph}
          </div>
        </div>
        <button type="button" className="today-btn">
          Ver mapa da atuação
        </button>
        <div className="today-robotPic">
          <img height="100%" src={PromotronGif} alt="robô-promoton" />
        </div>
      </article>
    );
  }

Today.propTypes = propTypes;
export default Today;
