import { snakeToCamel, formatPercentage, abbrevName } from '../../utils';

function metricsTransform(metrics) {
  const transformedMetrics = {};
  Object.keys(metrics).forEach(key => {
    transformedMetrics[snakeToCamel(key)] = metrics[key];
  });
  return transformedMetrics;
}

function rankingsTransform(rankArray) {
  return rankArray.map(rankObj => {
    const cleanData = rankObj.data.map(item => ({
      text: item.nm_orgao ? abbrevName(item.nm_orgao) : item.nm_orgao,
      value: item.valor_percentual ? formatPercentage(item.valor_percentual) : item.valor,
    }));
    return {
      name: rankObj.ranking_fieldname,
      data: cleanData,
    };
  });
}

export default function deskTabTransform(raw) {
  const map = {};
  const metrics = metricsTransform(raw.metrics);
  const ranks = rankingsTransform(raw.rankings);

  console.log('metrics ', metrics);
  const result = {
    map,
    metrics,
    ranks,
  };

  console.log('result: ', result);
  return result;
}
