import { snakeToCamel } from '../../utils/formatters';

function processingTimeTypeFormatter(typeObj) {
  const orgaoData = {
    min: typeObj.minimo_orgao,
    average: typeObj.media_orgao,
    median: typeObj.mediana_orgao,
    max: typeObj.maximo_orgao,
  };
  const pacoteData = {
    min: typeObj.minimo_pacote,
    average: typeObj.media_pacote,
    median: typeObj.mediana_pacote,
    max: typeObj.maximo_pacote,
  };
  return {
    orgaoData,
    pacoteData,
  };
}

export default function processingTimeTransform(dataArray) {
  const res = {};
  dataArray.forEach(obj => {
    res[snakeToCamel(obj.tp_tempo)] = processingTimeTypeFormatter(obj);
  });

  return res;
}
