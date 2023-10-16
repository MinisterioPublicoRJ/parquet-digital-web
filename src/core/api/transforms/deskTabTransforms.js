function metricsTransform(metrics) {
  
  const transformedMetrics = {};
  Object.keys(metrics).forEach(key => {
    transformedMetrics[key] = metrics[key];
  });
  return transformedMetrics[0];
}


export default function deskTabTransform(raw) {
  const metrics = metricsTransform(raw.metrics);
  return {
    metrics,
  };
  
}
