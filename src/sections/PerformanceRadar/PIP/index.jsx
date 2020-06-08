import React from 'react';

import RadarCommon from '../RadarCommon';
import Api from '../../../api';

const axisLabelsTable = {
  archives: {
    label: 'Arquivamentos',
    position: 'N',
  },
  agreements: {
    label: 'Acordos_de não_Persecução',
    position: 'W',
  },
  openCases: {
    label: 'Abertura_de Vista',
    position: 'SW',
  },
  complaints: {
    label: 'Denúncias',
    position: 'E',
  },
  precautionary: {
    label: 'Medidas_Cautelares',
    position: 'SE',
  },
};

const cleanMap = ([category, { maxValues, averages, variations, percentages, numbers }]) => ({
  category,
  value: `(máx atribuição ${maxValues})`, // variations == null || variations === -1 ? '—' : formatPercent(variations),
  isAboveAverage: null, // variations == null || variations === -1 ? null : variations >= 0,
  median: 100 * (averages / (maxValues || 1)),
  x: category,
  y: percentages * 100,
  numbers,
});

const RadarPipHOC = props => (
  <RadarCommon
    {...props}
    axisLabelsTable={axisLabelsTable}
    getRadarData={Api.getPipRadarData}
    cleanMap={cleanMap}
  />
);

export default RadarPipHOC;
