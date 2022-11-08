export default function hiresAlertsTransform(data) {
  return data.map((alert) => ({
    alertCode: alert.sigla,
    contrato: alert.contrato,
    iditem: alert.iditem,
    contrato_iditem: alert.contrato_iditem,
    alertId: alert.alrt_key,
    item: alert.item,
  }));
}
