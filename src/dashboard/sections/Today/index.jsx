import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import Api from '../../../api';
import { useAuth } from '../../../app/authContext';
import PromotronGif from '../../../assets/gifs/promotron.gif';
import NOMES_PROMOTORIAS from '../../../utils/nomesPromotorias';
import { formatPercentage, abbrevName, capitalizeTitle } from '../../../utils';
import { GlossaryBook, IntroScreenInterrogation } from '../../../assets';
import { SectionTitle, MainTitle, Spinner } from '../../../components/layoutPieces';

const propTypes = {
  setIsSelectorOpen: PropTypes.func.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  setIsIntroOpen: PropTypes.func.isRequired,
};

function Today({ setIsSelectorOpen, setIsModalOpen, setIsIntroOpen }) {
  const { user, buildRequestParams, currentOffice, logout } = useAuth();
  const [todayPercent, setTodayPercent] = useState([]);
  const [phrase, setPhrase] = useState([]);
  const [groupName, setgroupName] = useState([]);
  const [entriesGroup, setEntriesGroup] = useState([]);
  const [fullError, setfullError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLogoutBtnVisible, setIsLogoutBtnVisible] = useState(false);

  /**
   * laods percentage data for the first sentence
   * @return {void}
   */
  const loadPercentages = async () => {
    let percentile;
    let res = [];
    let errorPercent = false;
    try {
      res = await Api.getTodayOutData(buildRequestParams());
      percentile = formatPercentage(res);
    } catch (e) {
      errorPercent = true;
    }
    return [percentile, errorPercent];
  };

  /**
   * loads/reloads info an calls formatters for second sentence data
   * @return {void}
   */
  const loadCollection = async () => {
    let collectionPhrase;
    let organName;
    let errorPhrase = false;
    try {
      const today = new Date();
      const { primQ, terQ, acervoQtd, cod } = await Api.getTodayOutliersData(
        buildRequestParams(),
        today,
      );
      collectionPhrase = analyzeCollection(primQ, terQ, acervoQtd);
      organName = NOMES_PROMOTORIAS[cod];
    } catch (e) {
      errorPhrase = true;
    }
    return [collectionPhrase, organName, errorPhrase];
  };

  /**
   * loads/reloads info an calls formatters for third sentence data
   * @return {void}
   */
  const loadEntriesInfo = async () => {
    let entriesParagraph;
    let errorParagraph = false;
    try {
      const { hout, lout, numEntries } = await Api.getTodayEntriesData(buildRequestParams());
      entriesParagraph = analyzeEntries(hout, lout, numEntries);
    } catch (e) {
      errorParagraph = true;
    }
    return [entriesParagraph, errorParagraph];
  };

  async function loadComponent() {
    const [percentile, errorPercentList] = await loadPercentages();
    const [collectionPhrase, organName, errorPhraseList] = await loadCollection();
    const [entriesParagraph, errorParagraphList] = await loadEntriesInfo();

    const apiError = errorPercentList && errorPhraseList && errorParagraphList;

    setTodayPercent(percentile);
    setPhrase(collectionPhrase);
    setgroupName(organName);
    setEntriesGroup(entriesParagraph);
    setfullError(apiError);
    setLoading(false);
  }

  // runs on "mount" only
  useEffect(() => {
    loadComponent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * compares the number of entries to the business rules to decide which phrase to show. A day can be typical, atypical or empty
   * @param  {Number} hout   how many entries are on the upper boundary of a typical day
   * @param  {Number} lout   how many entries are on the lower boundary of a typical day
   * @param  {Number} amount amount of entries on given day
   * @return {Node}        React element to be inserted on View
   */
  function analyzeEntries(hout, lout, amount) {
    if (!amount) {
      return <p>Percebi que ainda não temos vistas abertas para hoje!</p>;
    }
    let dayTipe = 'típico';
    if (amount < lout || amount > hout) {
      dayTipe = 'atípico';
    }
    return (
      <p>
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
    const infoUser = cleanUsername();
    const hours = new Date().getHours();
    // const gender = infoUser.sexo;

    let timeGreeting;

    if (hours >= 6 && hours < 12) {
      timeGreeting = 'bom dia';
    } else if (hours >= 12 && hours < 18) {
      timeGreeting = 'boa tarde';
    } else {
      timeGreeting = 'boa noite';
    }

    return `Olá Dr(a). ${infoUser}, ${timeGreeting}!`;
  }
  /**
   * Gets the original string returned from the API, trims and prettifies it.
   * @return {string} First and last names, just the first letter of each capitalized
   */
  function cleanUsername() {
    const { nome } = user;
    return capitalizeTitle(nome.split(' ')[0]);
  }

  if (loading || fullError) {
    return (
      <article className="today-outer">
        <div className="today-header">
          <SectionTitle value="Resumo do dia" glueToTop />
        </div>
        {loading ? <Spinner size="large" /> : 'Sem dados para exibir'}
      </article>
    );
  }
  const greeting = assembleGreeting();

  const percentParagraph = !todayPercent ? null : (
    <p>
      No último mês a sua promotoria foi mais resolutiva que
      <span style={{ fontWeight: 'bold' }}>{` ${todayPercent} `}</span>
      da casa entre aquelas de mesma atribuição.
      {todayPercent > 0.5 && <span style={{ fontWeight: 'bold' }}>Parabéns!</span>}
    </p>
  );
  const collectionParagraph = !phrase ? null : (
    <p>
      Você sabia que seu acervo é<span style={{ fontWeight: 'bold' }}>{` ${phrase} `}</span>
      dos seus colegas das
      <span style={{ fontWeight: 'bold' }}>{` ${groupName}`}</span>?
    </p>
  );

  return (
    <article className="today-outer">
      <div className="user-area">
        <MainTitle value={greeting} glueToTop />
        {user.orgaosValidos && user.orgaosValidos.length ? (
          <button
            type="button"
            className={`logout-arrow ${isLogoutBtnVisible ? 'logout-arrow--rotated' : ''}`}
            onClick={() => setIsLogoutBtnVisible(prevValue => !prevValue)}
          />
        ) : null}
        <button
          type="button"
          className={`logout-btn ${isLogoutBtnVisible ? 'logout-btn--visible' : ''}`}
          disabled={!isLogoutBtnVisible}
          onClick={logout}
        >
          CLIQUE PRA SAIR
        </button>
      </div>
      <div className="today-content">
        <button type="button" onClick={setIsSelectorOpen} disabled={!user.orgaosValidos[0]}>
          <h2>Resumo do dia </h2>
          {`${abbrevName(currentOffice.nomeOrgao)}` && ' na '}
          {`${abbrevName(currentOffice.nomeOrgao)}` && (
            <span>{`${abbrevName(currentOffice.nomeOrgao)}`}</span>
          )}
        </button>
        {percentParagraph}
        {collectionParagraph}
        {entriesGroup}
      </div>
      {currentOffice.tipo === 2 ? (
        <a
          href={`https://geo.mprj.mp.br/portal/apps/opsdashboard/index.html#/9062e8f6462349978f249fb63c5f68a5?pip=${currentOffice.codigo}&dp=${currentOffice.dps}`}
          className="today-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver mapa da atuação
        </a>
      ) : null}
      <div className="today-robotPic">
        <div className="today-glossaryBtn" onClick={() => setIsModalOpen(true)}>
          <GlossaryBook />
        </div>
        <div className="today-introBtn" onClick={() => setIsIntroOpen(true)}>
          <IntroScreenInterrogation />
        </div>
        <img height="100%" src={PromotronGif} alt="robô-promoton" />
      </div>
    </article>
  );
}

Today.propTypes = propTypes;
export default Today;
