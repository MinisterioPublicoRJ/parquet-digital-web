/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import Api from '../../../../api';
import { useAppContext } from '../../../../../core/app/App.context';
import { abbrevName, capitalizeTitle } from '../../../../utils';
import PromotronGif from '../../../../assets/gifs/promotron.gif';
import NOMES_PROMOTORIAS from '../../../../utils/nomesPromotorias';
import { MainTitle, Modal, Spinner } from '../../../../components/layoutPieces';
import OfficeSelector from './officeSelector/OfficeSelector.view';
import UserManual from '../UserManual/UserManual.view';
import Introduction from '../Introduction';
import MapaTron from '../MapaTron/Mapatron.view';
import NavbarLeft from '../../../../components/navbarLeft';
import {
  todayOuter,
  todayContent,
  todayTextArea,
  userArea,
  todayRobotPic,
  todayBtn,
} from './Today.module.css';
import InDevelopmentToday from '../../../../components/layoutPieces/InDevelopmentToday';

function Today() {
  const { user, buildRequestParams, currentOffice } = useAppContext();

  /* STATE */
  const [todayPercent, setTodayPercent] = useState(null);
  const [apiError, setApiError] = useState(0);
  const [groupName, setgroupName] = useState('');
  const [collectionAnalysis, setCollectionAnalysis] = useState('');
  const [entriesData, setEntriesData] = useState();
  const [modalType, setModalType] = useState(false);

  // runs on "mount" only
  useEffect(() => loadComponent(), []);

  function loadComponent() {
    loadTodayPercentages();
    loadCollection();
    loadEntriesInfo();
  }

  /**
   * Returns the greeting to be shown on the page
   * @return {string} [description]
   */
  function assembleGreeting() {
    const infoUser = capitalizeTitle(user.nome.split(' ')[0]);
    const hours = new Date().getHours();

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
   * loads percentage data for the first sentence
   * @return {void}
   */
  async function loadTodayPercentages() {
    let res;
    try {
      res = await Api.getTodayOutData(buildRequestParams());

      setTodayPercent(res ? `${(res * 100).toFixed(0)}%` : '0%');
    } catch (e) {
      res = undefined;
      setApiError((prevCount) => prevCount + 1);
    }
  }
  /**
   * loads/reloads info an calls formatters for second sentence data
   * @return {void}
   */
  async function loadCollection() {
    let phrase = '';
    let groupNameRes;

    try {
      const today = new Date();
      const { primQ, terQ, acervoQtd, cod } = await Api.getTodayOutliersData(
        buildRequestParams(),
        today,
      );
      phrase = analyzeCollection(primQ, terQ, acervoQtd);
      groupNameRes = NOMES_PROMOTORIAS[cod];

      setgroupName(groupNameRes);
      setCollectionAnalysis(phrase);
    } catch (e) {
      setApiError((prevCount) => prevCount + 1);
    }
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
   * loads/reloads info an calls formatters for third sentence data
   * @return {void}
   */
  async function loadEntriesInfo() {
    try {
      const {
        hout,
        lout,
        numEntries: amount,
      } = await Api.getTodayEntriesData(buildRequestParams());
      setEntriesData(
        amount
          ? { dayType: amount < lout || amount > hout ? ' atípico ' : 'típico', amount }
          : 'empty',
      );
    } catch (e) {
      setApiError((prevCount) => prevCount + 1);
    }
  }

  const loading = !(apiError === 3) && !(todayPercent || collectionAnalysis || entriesData);

  const todayText = (
    <>
      {apiError === 3 && !currentOffice.tipo === 7 && <p>Sem dados para exibir.</p>}
      {loading && <Spinner size="large" />}
      {todayPercent && !loading ? (
        <p>
          Nos últimos seis meses a sua promotoria foi mais resolutiva que
          <span style={{ fontWeight: 'bold' }}>{` ${todayPercent} `}</span>
          da casa entre aquelas de mesma atribuição.
          {todayPercent > 0.5 && <span style={{ fontWeight: 'bold' }}>Parabéns!</span>}
        </p>
      ) : null}
      {currentOffice.tipo === 7 ? (
        <p>
          Seja bem-vindo ao Parquet Digital, ferramenta de auxílio que proporciona uma visão 
          ampla do acervo da sua Promotoria de Justiça. 
          Na barra lateral é possível acessar o manual de uso e a nota metodológica. Boa navegação!
        </p>
      ) : null}
      {/*{collectionAnalysis && !loading && (
        <p>
          Você sabia que seu acervo é
          <span style={{ fontWeight: 'bold' }}>{` ${collectionAnalysis} `}</span>
          dos seus colegas das
          <span style={{ fontWeight: 'bold' }}>{` ${groupName}?`}</span>
        </p>
      )}*/}
      {entriesData && entriesData.dayType && !loading && (
        <p>
          Hoje temos um dia
          <span style={{ fontWeight: 'bold' }}>{` ${entriesData.dayType} `}</span>
          com a entrada de
          <span style={{ fontWeight: 'bold' }}>{` ${entriesData.amount} `}</span>
          novos feitos.
        </p>
      )}
      {entriesData && entriesData === 'empty' && !loading && (
        <p>Percebi que ainda não temos vistas abertas para hoje!</p>
      )}
    </>
  );

  return (
    <article className={todayOuter}>
      <NavbarLeft />
      <div className={userArea}>
        <MainTitle value={assembleGreeting()} glueToTop />
      </div>
      <div className={todayContent}>
        <button
          type="button"
          onClick={() => setModalType('officeSelector')}
          disabled={!user.orgaosValidos[0]}
        >
          <h2>Resumo do dia </h2>
          {currentOffice.nomeOrgao && ' na '}
          {currentOffice.nomeOrgao && <span>{abbrevName(currentOffice.nomeOrgao)}</span>}
        </button>
        {modalType === 'officeSelector' && (
          <Modal unpositioned close={setModalType}>
            <OfficeSelector close={setModalType} />
          </Modal>
        )}
        <div className={todayTextArea}>{currentOffice.tipo === 7 ? <InDevelopmentToday /> : todayText}</div>
      </div>
      {currentOffice.tipo === 2 && !currentOffice.isSpecialized ? (
        <>
          <button type="button" className={todayBtn} onClick={() => setModalType('mapatron')}>
            Ver mapa da atuação
          </button>
          {modalType === 'mapatron' && (
            <Modal withExitButton close={setModalType}>
              <MapaTron mapatronData={currentOffice.codigo} />
            </Modal>
          )}
        </>
      ) : null}
      <div className={todayRobotPic}>
        {modalType === 'glossary' && (
          <Modal withExitButton close={setModalType}>
            <UserManual />
          </Modal>
        )}
        {modalType === 'introduction' && (
          <Modal withExitButton close={setModalType}>
            <Introduction />
          </Modal>
        )}
        <img height="110%" width='300px' src={PromotronGif} alt="robô-promoton" />
      </div>
    </article>
  );
}

export default Today;
