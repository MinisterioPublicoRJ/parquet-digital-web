import individualAlertFormatter from './individualAlertFormatter';

export default function alertListFormatter(list, countList, cpf, token) {
  const typedAlerts = {};
  const availableTypes = Object.keys(countList);

  availableTypes.forEach(type => {
    const allAlertsOfType = list
      .filter(alert => alert.alertCode === type)
      .map(alert => individualAlertFormatter(alert, cpf, token));
    typedAlerts[type] = allAlertsOfType;
  });
  return typedAlerts;
}
