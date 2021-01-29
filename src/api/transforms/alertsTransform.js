export default function alertsTransform(data) {
  return data.map((alert) => {
    return {
      alertCode: alert.sigla,
      description: alert.descricao,
      docNum: alert.num_doc,
      docDk: alert.doc_dk,
      extNum: alert.nem_ext,
      label: alert.etiqueta,
      class: alert.classe_doc,
      date: alert.data_alerta ? new Date(alert.data_alerta) : undefined,
      orgao: alert.orgao,
      hierarchy: alert.classe_hierarquia,
      daysPassed: alert.dias_passados,
      alertId: alert.alrt_key,
    };
  });
}
