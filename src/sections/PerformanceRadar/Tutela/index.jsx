import React from 'react';

import RadarCommon from '../RadarCommon';
import Api from '../../../api';

const axisLabelsTable = {
  archives: {
    label: 'Arquivamentos',
    position: 'N',
  },
  actions: {
    label: 'Ações_Civil_Públicas',
    position: 'E',
  },
  rejections: {
    label: 'Indeferimentos_de Plano',
    position: 'SE',
  },
  instaurations: {
    label: 'Instauração de_Investigações',
    position: 'SW',
  },
  tac: {
    label: 'Termos_de Ajuste_de Conduta',
    position: 'W',
  },
};

const cleanMap = ([category, { maxValues, averages, variations, percentages, numbers }]) => ({
  category,
  value: `(máx atribuição ${maxValues})`, // variations == null || variations === -1 ? '—' : formatPercent(variations),
  isAboveAverage: null, // variations == null || variations === -1 ? null : variations >= 0,
  median: 100 * (averages / maxValues),
  x: category,
  y: percentages * 100,
  numbers,
});

const RadarTutelaHOC = props => (
  <RadarCommon
    {...props}
    axisLabelsTable={axisLabelsTable}
    getRadarData={Api.getRadarData}
    cleanMap={cleanMap}
  />
);

export default RadarTutelaHOC;
