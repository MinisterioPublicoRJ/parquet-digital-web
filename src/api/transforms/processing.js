export default function tramitacaoTransform(data) {
  const meta = {
    id: data.orgao_id,
    date: new Date(data.dt_calculo),
  };
  const time = {
    maxTime: data.maximo_pacote,
    minTime: data.minimo_pacote,
    mediaPromo: data.mediana_orgao,
  };

  return {
    meta,
    time,
  };
}
