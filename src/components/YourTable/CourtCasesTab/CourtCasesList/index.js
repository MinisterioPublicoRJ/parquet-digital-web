import React from 'react';
import PropTypes from 'prop-types';

import { getViewWidth, leftPad } from '../../../../utils';

import Badge from '../../../../assets/svg/badge';

const propTypes = {
  topProsecutors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      proposedActions30Days: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

const CourtCasesTab = ({ topProsecutors }) => {
  const vw = getViewWidth();

  return (
    <section>
      <h3 className="subtitle">Recorde de Ações Ajuizadas no Mês</h3>
      <ul className="list-top-n">
        {topProsecutors.map(({ name, proposedActions30Days }, i) => {
          return (
            <li key={i} className="list-top-n-item">
              <span className="list-top-n-icon">
                <Badge width={2 * vw} height={3 * vw} number={i + 1} />
              </span>
              <strong className="list-top-n-featured">
                {leftPad(proposedActions30Days, 2, 0)}
              </strong>
              <span className="list-top-n-main">{name}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

CourtCasesTab.propTypes = propTypes;

export default CourtCasesTab;
