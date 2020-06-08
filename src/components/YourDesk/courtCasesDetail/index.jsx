import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

import { Spinner } from '../../layoutPieces';
import Badge from '../../../assets/svg/badge';
import { formatPercent, leftPad } from '../../../utils';

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    proposedActions60Days: PropTypes.number,
    proposedActionsVariation12Months: PropTypes.number,
    topProsecutors: PropTypes.arrayOf(
      PropTypes.shape({
        proposedActions60Days: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
  }).isRequired,
};

function courtCasesDetail({ data, isLoading }) {
  if (isLoading) {
    return <Spinner size="large" />;
  }

  const { proposedActions60Days, proposedActionsVariation12Months, topProsecutors } = data;

  return (
    <div className="courtCases-outer">
      <div className="courtCases-upper">
        <p className="paragraphWrapper">
          Você propôs
          <strong>{` ${proposedActions60Days} ações `}</strong>
          nos últimos 60 dias, com
          <strong>
            {proposedActionsVariation12Months >= 0
              ? ` um aumento de ${formatPercent(Math.abs(proposedActionsVariation12Months))} `
              : ` uma redução de ${formatPercent(Math.abs(proposedActionsVariation12Months))} `}
          </strong>
          nos últimos 12 meses.
        </p>
      </div>
      <div className="courtCases-lower">
        <div className="courtCases-lowerLeft">
          <h3 className="subtitle">Recorde de Ações Ajuizadas no Mês</h3>
          <ul className="courtCases-ranking">
            {topProsecutors.map(({ name, proposedActions30Days }, i) => {
              return (
                <li key={i} className="courtCases-li">
                  <span className="courtCases-icon">
                    <Badge width="45%" number={i + 1} />
                  </span>
                  <strong className="courtCases-featured">
                    {leftPad(proposedActions30Days, 2, 0)}
                  </strong>
                  <span className="courtCases-label">{name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

courtCasesDetail.propTypes = propTypes;
export default courtCasesDetail;
