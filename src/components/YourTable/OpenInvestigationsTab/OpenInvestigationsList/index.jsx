import React from 'react';
import PropTypes from 'prop-types';

import Badge from '../../../../assets/svg/badge';

import { getViewWidth, formatPercentage, leftPad } from '../../../../utils';

const propTypes = {
  topProsecutors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      collectionVariation30Days: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

const OpenInvestigationsTab = ({ topProsecutors }) => {
  const vw = getViewWidth();

  return (
    <section>
      <h3 className="subtitle">Maiores Reduções do Mês</h3>
      <ul className="list-top-n">
        {topProsecutors.map(({ name, collectionVariation30Days }, i) => {
          return (
            <li key={i} className="list-top-n-item">
              <span className="list-top-n-icon">
                <Badge width={2 * vw} height={3 * vw} number={i + 1} />
              </span>
              <strong className="list-top-n-featured">
                {leftPad(formatPercentage(collectionVariation30Days), 3, 0)}
              </strong>
              <span className="list-top-n-main">{name}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

OpenInvestigationsTab.propTypes = propTypes;

export default OpenInvestigationsTab;
