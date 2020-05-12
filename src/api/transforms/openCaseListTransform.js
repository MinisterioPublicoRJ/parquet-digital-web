export default function openCasesListTransform(data) {
  return data.map(list => ({
    classe: list.classe,
    numero_externo: list.numero_externo,
    dt_abertura: new Date(list.dt_abertura).toLocaleDateString(),
    numero_mprj: list.numero_mprj,
  }));
}
