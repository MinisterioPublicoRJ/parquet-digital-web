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
    <div>
      <div>Recorde de Ações Ajuizadas no Mês</div>
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
    </div>
  );
};

CourtCasesTab.propTypes = propTypes;

export default CourtCasesTab;
