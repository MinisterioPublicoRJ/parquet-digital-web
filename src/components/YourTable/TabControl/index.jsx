import React from 'react';
import PropTypes from 'prop-types';

import TabControlItem from './TabControlItem';
import './styles.css';

const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      tab: PropTypes.string,
    }).isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    openCases: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    openInvestigations: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    courtCases: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    closedCases: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
};

const TabControl = ({ match, data }) => {
  const { openCases = 0, openInvestigations = 0, courtCases = 0, closedCases = 0 } = data;

  return (
    <div className="tab-control">
      <TabControlItem
        match={match}
        forfeit
        to="vistas-abertas"
        spotlight={openCases}
        subtitle="vistas abertas"
      />
      <TabControlItem
        match={match}
        to="investigacoes-em-curso"
        spotlight={openInvestigations}
        subtitle="investigações em curso"
      />
      <TabControlItem
        match={match}
        to="processos-em-juizo"
        spotlight={courtCases}
        subtitle="processos em juízo"
      />
      <TabControlItem success spotlight={closedCases} subtitle="finalizados últimos 30 dias" />
    </div>
  );
};

TabControl.propTypes = propTypes;

export default TabControl;
