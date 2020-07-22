import { snakeToCamel } from '../../utils';

export default function loginTransform(userObj) {
  const res = {};
  const keys = Object.keys(userObj);
  keys.forEach(key => {
    res[snakeToCamel(key)] = userObj[key];
  });
  return res;
}
