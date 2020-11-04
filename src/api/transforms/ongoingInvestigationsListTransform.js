export default function ongoingInvestigationsListTransform(data) {
  return data.map((list) => ({
    classeDocumento: list.classe_documento,
    docuEtiqueta: list.docu_etiqueta,
    docuNrExterno: list.docu_nr_externo,
    docuNrMp: list.docu_nr_mp,
    docuPersonagens: list.docu_personagens,
    dtUltimoAndamento: list.dt_ultimo_andamento
      ? new Date(list.dt_ultimo_andamento).toLocaleDateString()
      : undefined,
    idOrgao: list.id_orgao,
    ultimoAndamento: list.ultimo_andamento,
    urlTjrj: list.url_tjrj,
    representanteDk: list.representante_dk,
  }));
}
