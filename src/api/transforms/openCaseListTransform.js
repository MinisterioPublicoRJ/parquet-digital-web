export default function openCasesListTransform(data) {
  return data.map((list) => ({
    classe: list.classe,
    numeroExterno: list.numero_externo,
    dtAbertura: new Date(list.dt_abertura)
      ? Intl.DateTimeFormat('pt-br', { timeZone: 'UTC' }).format(new Date(list.dt_abertura))
      : undefined,
    numeroMprj: list.numero_mprj,
  }));
}
