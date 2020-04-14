import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

import { Spinner } from '../../layoutPieces';
import Badge from '../../../assets/svg/badge';
import { formatPercent, getViewWidth, leftPad, formatPercentage } from '../../../utils';

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
                <li key={i} className="list-top-n-item">
                  <span className="list-top-n-icon">
                    <Badge width={2 * vw} height={3 * vw} number={i + 1} />
                  </span>
                  <strong className="list-top-n-featured">
                    {leftPad(formatPercentage(item.collectionVariation30Days), 3, 0)}
                  </strong>
                  <span className="list-top-n-main">{item.name}</span>
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

export default OpenInvestigationDetail;
