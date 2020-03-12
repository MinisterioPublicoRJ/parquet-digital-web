import React from 'react';
import PropTypes from 'prop-types';
import { formatPercent } from '../../../../utils';

const propTypes = {
  proposedActions60Days: PropTypes.number,
  proposedActionsVariation12Months: PropTypes.number,
};

const defaultProps = {
  proposedActions60Days: 0,
  proposedActionsVariation12Months: 0,
};

const CourtCasesDetails = ({ proposedActions60Days, proposedActionsVariation12Months }) => {
  return (
    <p className="paragraphWrapper">
      Você propôs <strong>{proposedActions60Days} ações</strong> nos últimos 60 dias, com{' '}
      <strong>
        {proposedActionsVariation12Months >= 0
          ? `um aumento de ${formatPercent(proposedActionsVariation12Months)} `
          : `uma redução de ${formatPercent(proposedActionsVariation12Months)} `}
      </strong>
      nos últimos 12 meses.
    </p>
  );
};

CourtCasesDetails.propTypes = propTypes;
CourtCasesDetails.defaultProps = defaultProps;

export default CourtCasesDetails;
