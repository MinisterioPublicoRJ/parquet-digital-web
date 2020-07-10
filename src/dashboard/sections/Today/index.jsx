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
    loadPercentages();
  }, []);

  
  const loadPercentages = async () => {
    let percentile;
    try {
      const res = await Api.getTodayOutData(user);
      console.log(res)
      percentile = formatPercentage(res);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
        return { percentile, loadingTodayOut, dataError };
      };
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
    const percentile = loadingTodayOut
    const percentParagraph = !percentile ? null : (
      <p className="today-textArea-paragraphWrapper">
        No último mês a sua promotoria foi mais resolutiva que
        <span style={{ fontWeight: 'bold' }}>{` ${percentile} `}</span>
        da casa entre aquelas de mesma atribuição.
        {percentile > 0.5 && <span style={{ fontWeight: 'bold' }}>Parabéns!</span>}
      </p>
    );

    return (
      <article className="today-outer">
        <div className="today-header">
          {/*<MainTitle value={greeting} />*/}
        </div>
        <div className="today-content">
          <SectionTitle value="resumo do dia" glueToTop />
          <div className="today-textArea">
            {percentParagraph}
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