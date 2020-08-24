/* COLORS */
const darkBlue = '#374354';
const gray = '#b5b5b5';

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
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    lineHeight: 200,
  },
  axisLabelNeutral: {
    fill: '#777',
    fontWeight: 'bold',
    fontSize: 10,
    letterSpacing: 0,
  },
};
export default CHART_THEME;
