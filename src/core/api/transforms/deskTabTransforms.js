function metricsTransform(metrics) {
  const transformedMetrics = {};
  Object.keys(metrics).forEach(key => {
    transformedMetrics[key] = metrics[key];
  });
  console.log(transformedMetrics);
  return transformedMetrics[0];
}


export default function deskTabTransform(raw) {
  const map = {};
  const metrics = metricsTransform(raw.metrics);
  return {
    map,
    metrics,
  };
  
}
