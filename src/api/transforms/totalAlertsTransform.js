export default function totalAlertsTransform(data) {
  return data.map(alert => ({
    sigla: alert.sigla,
    description: alert.descricao,
    orgao: alert.orgao,
    count: alert.count,
  }));
}
