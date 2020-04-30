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

export const PT_PIE_COLORS = ['#42DCA7', '#6D86EC', '#A256BA'];

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
    fontSize: 7,
  },
};
export default CHART_THEME;
