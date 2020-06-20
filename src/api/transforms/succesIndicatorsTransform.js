import { snakeToCamel } from '../../utils';

export default function successIndicatorsTransform(data) {
  const res = {};

  data.forEach(indicator => {
    res[snakeToCamel(indicator.tipo)] = [{ x: 1, y: indicator.indice }];
  });

  return res;
}
