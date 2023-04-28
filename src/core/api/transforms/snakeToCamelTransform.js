import { snakeToCamel } from '../../utils';

export default function snakeToCamelTransform(obj) {
  const res = {};
  const keys = Object.keys(obj);
  keys.forEach(key => {
    res[snakeToCamel(key)] = obj[key];
  });
  return res;
}
