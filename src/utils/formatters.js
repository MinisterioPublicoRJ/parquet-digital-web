/**
 * formats from float to integer percentage
 * @param  {number} float a float smaller than zero (like 0.657)
 * @return {string}       the float turned into percentage + symbol (66%)
 */
export function formatPercentage(float) {
  return `${(float * 100).toFixed(0)}%`;
}

/**
 * formats from date obj to YYYY-MM-DD
 * @param  {date} dateObj [description]
 * @return {string}         YYYY-MM-DD
 */
export function formatDateObjForBackend(dateObj) {
  return dateObj.toISOString().substr(0, 10);
}

/**
 * Fill left of the string with some char
 * @param  {string} w the original string
 * @param  {number} len the length that the string must have
 * @param  {string} char the char taht will be used to fill the difference. defaults to ' '
 * @return {string} the new string
 */
export const leftPad = (w, len, char) => {
  let str = String(w);
  const ch = !char && char !== 0 ? ' ' : char;
  const l = len - str.length;

  for (let i = 0; i < l; i += 1) {
    str = ch + str;
  }

  return str;
};

export const formatPercent = n => `${(Math.abs(n) * 100).toFixed(2)}%`;
