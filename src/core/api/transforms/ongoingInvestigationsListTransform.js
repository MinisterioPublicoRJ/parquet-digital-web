export default function ongoingInvestigationsListTransform({ procedimentos, nr_paginas }) {
  const data = procedimentos.map((list) => ({
    classeDocumento: list.classe_documento,
    docuEtiqueta: list.docu_etiqueta,
    docuNrExterno: list.docu_nr_externo ? list.docu_nr_externo : '-',
    docuNrMp: list.docu_nr_mp,
    docuPersonagens: list.docu_personagens,
    dtUltimoAndamento: new Date(list.dt_ultimo_andamento)
      ? Intl.DateTimeFormat('pt-br', { timeZone: 'UTC' }).format(new Date(list.dt_ultimo_andamento))
      : undefined,
    idOrgao: list.id_orgao,
    ultimoAndamento: list.ultimo_andamento,
    urlTjrj: list.url_tjrj,
    representanteDk: list.representante_dk,
  }));

  return {
    data,
    pages: nr_paginas,
  };
}
