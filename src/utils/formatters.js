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
