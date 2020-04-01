export default function tramitacaoTransform(data) {
  const time = {
    maxTime: data.maximo_pacote,
    minTime: data.minimo_pacote,
    mediaPromo: data.mediana_orgao,
    maxTimeOrgao: data.min_orgao,
    minTimeOrgao: data.max_orgao,
    mediaTimeOrgao: data.media_orgao,
  };

  return {
    time,
  };
}
