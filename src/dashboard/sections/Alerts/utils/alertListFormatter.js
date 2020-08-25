import individualAlertFormatter from './individualAlertFormatter';

export default function alertListFormatter(list, countList) {
  const typedAlerts = {};
  const availableTypes = Object.keys(countList);

  availableTypes.forEach(type => {
    const allAlertsOfType = list
      .filter(alert => alert.alertCode === type)
      .map(alert => individualAlertFormatter(alert));
    typedAlerts[type] = allAlertsOfType;
  });
  return typedAlerts;
}
