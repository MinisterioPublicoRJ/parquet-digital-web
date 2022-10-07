export default function cavlAlertsTransform(data) {
    return data.map((alert) => ({
      alertCode: alert.alrt_sigla,
      contrato: alert.contratacao,
      iditem: alert.iditem,
      contrato_iditem: alert.contrato_iditem,
      item: alert.item,
      alertId: alert.alrt_key,
    }));
  }
  