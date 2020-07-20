import { snakeToCamel } from '../../utils';

export default function userTransform(userObj) {
  const res = {};
  const keys = Object.keys(userObj);
  keys.forEach(key => {
    res[snakeToCamel(key)] = userObj[key];
  });
  return res;
}
