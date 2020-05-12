/* COLORS */
const darkBlue = '#374354';
const gray = '#b5b5b5';
const red = '#FB745B';
const green = '#7ED321';

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
    fill: '#555',
    fontSize: 12,
    lineHeight: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
};
export default CHART_THEME;
