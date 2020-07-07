export default function totalAlertsTransform(rawData) {
  const cleanData = {};
  rawData.forEach(alertType => {
    cleanData[alertType.sigla] = { count: alertType.count };
  });
  return cleanData;
}
