import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../../../../components/layoutPieces/Spinner';
import MetricsFormatter from './MetricsFormatter';
import { useAppContext } from '../../../../../../core/app/App.context';

import {
  GenericTabMain,
  GenericTabUpper,
  NoData,
} from './styles.module.css';

const propTypes = {
  error: PropTypes.bool.isRequired,
  tab: PropTypes.string.isRequired,
  tabTitle: PropTypes.string.isRequired,
  map: PropTypes.shape({}),
  metrics: PropTypes.shape({}),
  isBeingDeveloped: PropTypes.bool,
};

// metrics, rank and map will be undefined until the API response comes back
const defaultProps = {
  metrics: undefined,
  map: undefined,
  isBeingDeveloped: true,
};

const { currentOffice } = useAppContext();
const type = currentOffice ? currentOffice.tipo : undefined;

function GenericTab({ tab, error, metrics, tabTitle, isBeingDeveloped }) {
  const loading = !error && !metrics;

  if (isBeingDeveloped) {
      return (
        <div className={`${GenericTabMain} ${NoData}`}>
          Esta sessão está em construção! Em breve será apresentado o detalhamento do acervo de
          Processos em Juízo desta Promotoria.
        </div>
      );
  }
  if (loading) {
    return <Spinner size="large" />;
  }
  if (error) {
    return <div className={`${GenericTabMain} ${NoData}`}>Nenhum dado para exibir</div>;
  }

  const hasMetrics = Object.keys(metrics).length;

  return (
    <div className={GenericTabMain}>
      <div className={GenericTabUpper}>
        {hasMetrics ? (
          <MetricsFormatter metrics={metrics} tab={tab} />
        ) : (
          <p>{`Não existem métricas de ${tabTitle} para o último mês.`}</p>
        )}
      </div>
    </div>
  );
}

GenericTab.propTypes = propTypes;
GenericTab.defaultProps = defaultProps;
export default GenericTab;
