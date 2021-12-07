export default function openCasesListTransform({ procedimentos, nr_paginas }) {
  const procedures = procedimentos.map((list) => ({
    classe: list.classe,
    numeroExterno: list.numero_externo,
    dtAbertura: new Date(list.dt_abertura)
      ? Intl.DateTimeFormat('pt-br', { timeZone: 'UTC' }).format(new Date(list.dt_abertura))
      : undefined,
    numeroMprj: list.numero_mprj,
    alertSigla: list.alrt_sigla,
    // alertCount: list.alrt_count,
    alertCount: 3,
  }));
  const pages = nr_paginas;

  return {
    procedures,
    pages,
  };
}
