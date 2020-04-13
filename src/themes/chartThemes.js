/* COLORS */
const primary = '#28a7e0';
const secondary = '#b5b5b5';
const dark = '#3b3b3b';
const darkBlue = '#374354';
const success = '#71d0a4';
const warning = '#f8bd6c';
const danger = '#f86c72';
const white = '#ffffff';
const gray = '#b5b5b5';
const grayLight = '#e8e8e8';
const grayLinks = '#CECECE';
const red = '#FB745B';
const green = '#7ED321';

// style={{
//   axis: { stroke: 'none' },
//   tickLabels: { fill: 'none' },
//   grid: { stroke: 'grey', strokeDasharray: '4, 8' },
// }}

const CHART_THEME = {
  polarAxis: {
    axis: { stroke: gray, strokeWidth: 1 },
    tickLabels: { fill: 'none' },
    grid: { strokeWidth: 0 },
  },
  gridGroup: {
    data: { fillOpacity: 0, strokeWidth: 1, stroke: gray, strokeOpacity: 0.5 },
  },
  axisLabel: {
    fill: darkBlue,
    fontSize: 12,
    fontWeight: 'bold',
  },
  axisLabelBad: {
    fill: red,
    fontSize: 12,
  },
  axisLabelGood: {
    fill: green,
    fontSize: 12,
  },
  axisLabelNeutral: {
    fill: gray,
    fontSize: 12,
  },
};
export default CHART_THEME;
