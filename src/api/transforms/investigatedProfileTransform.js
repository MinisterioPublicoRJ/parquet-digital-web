export default function investigatedProfileTransform({ perfil, similares, procedimentos }) {
  const procedures = procedimentos.map((list) => ({
    documento_nr_mp: list.documento_nr_mp,
    nm_orgao: list.nm_orgao,
    assuntos: list.assuntos,
    coautores: list.coautores,
    fase_documento: list.fase_documento,
    dt_ultimo_andamento: new Date(list.dt_ultimo_andamento)
      ? Intl.DateTimeFormat().format(new Date(list.dt_ultimo_andamento))
      : null,

    desc_ultimo_andamento: list.desc_ultimo_andamento,
  }));

  return {
    profile: perfil,
    procedures,
    similars: similares,
  };
}
