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
  const [todayPercent, setTodayPercent] = useState([]);
  const [phrase, setPhrase] = useState([]);
  const [dataError, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPercentages();
    loadCollection();
    loadEntriesInfo();

  }, []);

   /**
   * checks if all the info was fetched from aPI, warns parent when done
   * @param  {boolean} dataError
   * @return {boolean}
   */

  const loadPercentages = async () => {
    let percentile;
    let res = []
    try {
      res = await Api.getTodayOutData(user);
      console.log(res)
      percentile = formatPercentage(res);
      setTodayPercent(percentile);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const loadCollection = async () => {
    let collectionPhrase;
    let groupName;
    try {
      const today = new Date();
      const { primQ, terQ, acervoQtd, cod } = await Api.getTodayOutliersData(user, today);
      //collectionPhrase = analyzeCollection(primQ, terQ, acervoQtd);
      groupName = NOMES_PROMOTORIAS[cod];
      console.log(primQ, terQ, acervoQtd, cod)
      console.log(groupName)
      setPhrase(primQ, terQ, acervoQtd, cod);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }
   
  const loadEntriesInfo = async () => {
    let entriesParagraph;
    try {
      const { hout, lout, numEntries } = await Api.getTodayEntriesData(user);
      console.log(hout, lout, numEntries)
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
      return [entriesParagraph];
    }
  }
  
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
          {/*<MainTitle value={greeting} />*/}
        </div>
          <div className="today-content">
            <SectionTitle value="resumo do dia" glueToTop />
            <div className="today-textArea">
            <p className="today-textArea-paragraphWrapper">
            No último mês a sua promotoria foi mais resolutiva que
            <span style={{ fontWeight: 'bold' }}>{` ${todayPercent} `}</span>
            da casa entre aquelas de mesma atribuição.
            {todayPercent > 0.5 && <span style={{ fontWeight: 'bold' }}>Parabéns!</span>}
            </p>
           {/*collectionParagraph}
            {entriesParagraph*/}
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