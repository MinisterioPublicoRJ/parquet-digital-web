export default function cavlAlertsTransform(data) {
    return data.map((alert) => ({
      alertCode: alert.alrt_sigla,
      contrato: alert.contratacao,
      iditem: alert.id_item,
      contrato_iditem: alert.contrato_id_item,
      item: alert.item,
      alertId: alert.alrt_key,
    }));
  }
  