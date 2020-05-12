export default function processListTransform(data) {
  return data.map(list => ({
    classe_documento: list.classe_documento,
    docu_etiqueta: list.docu_etiqueta,
    docu_nr_externo: list.docu_nr_externo,
    docu_nr_mp: list.docu_nr_mp,
    extdocu_personagensNum: list.docu_personagens,
    dt_ultimo_andamento: new Date(list.dt_ultimo_andamento).toLocaleDateString(),
    id_orgao: list.id_orgao,
    ultimo_andamento: list.ultimo_andamento,
    url_tjrj: list.url_tjrj,
  }));
}
