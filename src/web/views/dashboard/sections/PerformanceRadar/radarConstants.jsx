// just the names of the categories for each tipe of organ
export const TUTELA_CATEGORIES = [
  'archives',
  'tac',
  'instaurations',
  'rejections',
  'actions'
];
export const PIP_CATEGORIES = [
  'archives',
  'agreements',
  'openCases',
  'precautionary',
  'complaints',
];
export const CRIMINAL_CATEGORIES = [
  'complaints',
  'appeal',
  'agreements',
  'audience',
  'arguments'
];


// used to change Victory's aut generated label positioning for the axis
export const NORTH_LABEL_PROPS = {
  dx: 0,
  dy: 20,
  textAnchor: 'middle',
};

export const WEST_LABEL_PROPS = {
  dx: 15,
  dy: -15,
  textAnchor: 'end',
};

export const SOUTH_WEST_LABEL_PROPS = {
  dx: 10,
  dy: -15,
  textAnchor: 'end',
};

export const SOUTH_EAST_LABEL_PROPS = {
  dx: -10,
  dy: -15,
  textAnchor: 'start',
};

export const EAST_LABEL_PROPS = {
  dx: -15,
  dy: -15,
  textAnchor: 'start',
};

// used to change Victory's auto generated graph label positioning
// every item on the array is the same index as the axis would be in the chart
// N = 0 W = 1 SW = 2 SE = 3 E = 4
// It is small when the y value on the graph is less than 60% and large otherwise
// the first value on the array is how X should be changed, the second is Y
export const GRAPH_LABELS_TABLE = [
  { small: [0, -15], large: [0, 25] },
  { small: [-15, -15], large: [10, 10] },
  { small: [-5, 10], large: [-20, -20] },
  { small: [5, 10], large: [20, -20] },
  { small: [15, 15], large: [-20, 10] },
];
