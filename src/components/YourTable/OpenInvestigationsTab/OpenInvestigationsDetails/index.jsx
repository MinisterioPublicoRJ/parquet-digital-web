import React from 'react';
import PropTypes from 'prop-types';

import { formatPercent } from '../../../../utils';

const propTypes = {
  collectionVariation30Days: PropTypes.number,
};

const defaultProps = {
  collectionVariation30Days: 0,
};

const OpenInvestigationsDetails = ({ collectionVariation30Days }) => {
  return (
    <p className="paragraphWrapper">
      Seu acervo{' '}
      <strong>
        {collectionVariation30Days > 0
          ? `aumentou ${formatPercent(collectionVariation30Days)} `
          : collectionVariation30Days < 0
          ? `reduziu ${formatPercent(collectionVariation30Days)} `
          : 'se manteve o mesmo '}
      </strong>
    </p>
  );
};

OpenInvestigationsDetails.propTypes = propTypes;
OpenInvestigationsDetails.defaultProps = defaultProps;

export default OpenInvestigationsDetails;
