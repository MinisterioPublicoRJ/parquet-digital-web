export default function alertsTransform(data) {
  return data.map(alert => ({
    alertCode: alert.sigla,
    description: alert.descricao,
    docNum: alert.num_doc,
    docDk: alert.doc_dk,
    extNum: alert.nem_ext,
    label: alert.etiqueta,
    class: alert.classe_doc,
    date: new Date(alert.data_alerta),
    orgao: alert.orgao,
    hierarchy: alert.classe_hier,
    daysPassed: alert.dias_passados,
    alertId: alert.id_alerta,
  }));
}
