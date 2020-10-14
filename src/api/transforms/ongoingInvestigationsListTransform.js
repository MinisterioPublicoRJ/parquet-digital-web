export default function ongoingInvestigationsListTransform(data) {
  return data.map(list => ({
    classeDocumento: list.classe_documento,
    docuEtiqueta: list.docu_etiqueta,
    docuNrExterno: list.docu_nr_externo,
    docuNrMp: list.docu_nr_mp,
    docuPersonagens: list.docu_personagens,
    dtUltimoAndamento: new Date(list.dt_ultimo_andamento).toLocaleDateString(),
    idOrgao: list.id_orgao,
    ultimoAndamento: list.ultimo_andamento,
    url_tjrj: list.url_tjrj,
  }));
}
