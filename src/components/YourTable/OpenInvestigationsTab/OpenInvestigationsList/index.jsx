import React from 'react';
import PropTypes from 'prop-types';

import { formatPercent } from '../../../../utils';

const propTypes = {
  topProsecutors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      collectionVariation30Days: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

const OpenInvestigationsTab = ({ topProsecutors }) => {
  return (
    <section>
      <h3 className="subtitle">Maiores Reduções do Mês</h3>
      <ul>
        {topProsecutors.map(({ name, collectionVariation30Days }, i) => {
          return (
            <li key={i}>
              {i + 1}. <strong>{formatPercent(collectionVariation30Days)}</strong> {name}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

OpenInvestigationsTab.propTypes = propTypes;

export default OpenInvestigationsTab;
