import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  topProsecutors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      proposedActions30Days: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

const CourtCasesTab = ({ topProsecutors }) => {
  return (
    <section>
      <h3 className="subtitle">Recorde de Ações Ajuizadas no Mês</h3>
      <ul>
        {topProsecutors.map(({ name, proposedActions30Days }, i) => {
          return (
            <li key={i}>
              {i + 1}. <strong>{proposedActions30Days}</strong>
              {name}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

CourtCasesTab.propTypes = propTypes;

export default CourtCasesTab;
