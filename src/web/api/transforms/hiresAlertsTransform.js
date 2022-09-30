export default function hiresAlertsTransform(data) {
  console.log(data, "Compras");
  return data.map((alert) => ({
    alertCode: alert.sigla,
    contrato: alert.contrato,
    iditem: alert.iditem,
    contrato_iditem: alert.contrato_iditem,
    item: alert.item,
    alertId: alert.alrt_key,
  }));
}
