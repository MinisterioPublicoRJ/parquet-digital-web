import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

import { Spinner } from '../../layoutPieces';
import Badge from '../../../assets/svg/badge';
import { formatPercent, getViewWidth, leftPad, formatPercentage } from '../../../utils';

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    collectionVariation30Days: PropTypes.number,
    topProsecutors: PropTypes.arrayOf(
      PropTypes.shape({
        collectionVariation30Days: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
  }).isRequired,
};
const defaultProps = {};

/**
 * uses variation data to pick what sentence to show
 * @param  {number} variation collectionVariation30Days prop
 * @return {string}           phrase with analyses
 */
function getCollectionPhrase(variation) {
  let ans = ' se manteve o mesmo ';

  if (variation > 0) {
    ans = ` aumentou ${formatPercent(variation)} `;
  }
  if (variation < 0) {
    ans = ` reduziu ${formatPercent(variation)} `;
  }
  return ans;
}

function OpenInvestigationDetail({ data, isLoading }) {
  if (isLoading) {
    return <Spinner size="large" />;
  }

  const { collectionVariation30Days, topProsecutors } = data;
  const collectionPhrase = getCollectionPhrase(collectionVariation30Days);
  const vw = getViewWidth();

  return (
    <div className="openInv-outer">
      <div className="openInv-upper">
        <p className="paragraphWrapper">
          Seu acervo
          <strong>{collectionPhrase}</strong>
          nos últimos 30 dias.
        </p>
      </div>
      <div className="openInv-lower">
        <div className="openInv-lower-left">
          <h3 className="subtitle">Maiores Reduções do Mês</h3>
          <ul className="openInv-ranking">
            {topProsecutors.map((item, i) => {
              return (
                <li key={i} className="openInv-li">
                  <span className="openInv-icon">
                    <Badge width="100%" number={i + 1} />
                  </span>
                  <strong className="openInv-featured">
                    {leftPad(formatPercentage(item.collectionVariation30Days), 3, 0)}
                  </strong>
                  <span className="openInv-label">{item.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="openInv-lower-right" />
      </div>
    </div>
  );
}

OpenInvestigationDetail.propTypes = propTypes;
OpenInvestigationDetail.defaultProps = defaultProps;
export default OpenInvestigationDetail;
