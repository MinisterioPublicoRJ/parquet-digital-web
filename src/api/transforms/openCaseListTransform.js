export default function openCasesListTransform(data) {
  return data.map(list => ({
    classe: list.classe,
    numeroExterno: list.numero_externo,
    dtAbertura: new Date(list.dt_abertura).toLocaleDateString(),
    numeroMprj: list.numero_mprj,
  }));
}
