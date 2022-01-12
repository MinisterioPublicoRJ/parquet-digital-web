export default function openCasesListTransform({ procedimentos, nr_paginas }) {
  const procedures = procedimentos.map((list) => ({
    classe: list.classe,
    numeroExterno: list.numero_externo,
    dtAbertura: new Date(list.dt_abertura)
      ? Intl.DateTimeFormat('pt-br', { timeZone: 'UTC' }).format(new Date(list.dt_abertura))
      : undefined,
    numeroMprj: list.numero_mprj,
    alertsCount: list.alertas_count,
    splitAlertsCount: list.alertas_split_count,
  }));
  const pages = nr_paginas;

  return {
    procedures,
    pages,
  };
}
