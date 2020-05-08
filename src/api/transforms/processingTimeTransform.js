export default function processingTimeTransform(data) {
  const meta = { id: data.id_orgao };
  const pacoteData = {
    max: data.maximo_pacote,
    maxT1: data.maximo_pacote_t1,
    maxT2: data.maximo_pacote_t2,
    average: data.media_pacote,
    averageT1: data.media_pacote_t1,
    averageT2: data.media_pacote_t2,
    median: data.mediana_pacote,
    medianT1: data.mediana_pacote_t1,
    medianT2: data.mediana_pacote_t1,
    min: data.minimo_pacote,
    minT1: data.minimo_pacote_t1,
    minT2: data.minimo_pacote_t2,
  };

  const orgaoData = {
    max: data.maximo_orgao,
    maxT1: data.maximo_orgao_t1,
    maxT2: data.maximo_orgao_t2,
    average: data.media_orgao,
    averageT1: data.media_orgao_t1,
    averageT2: data.media_orgao_t2,
    median: data.mediana_orgao,
    medianT1: data.mediana_orgao_t1,
    medianT2: data.mediana_orgao_t2,
    min: data.minimo_orgao,
    minT1: data.minimo_orgao_t1,
    minT2: data.minimo_orgao_t2,
  };
  return {
    meta,
    pacoteData,
    orgaoData,
  };
}
