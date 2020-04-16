import React, { useState, useEffect } from 'react';
import './styles.css';
import MarkMind from '../../assets/svg/markMind';
import Markfaster from '../../assets/svg/markFaster';
import MarkSlower from '../../assets/svg/markSlower';

const ChartPointComponent = () => {
  const [ChartPointComponent, setchartPointComponent] = useState(null);

  return (
    <div className="box-chart-point">
      <MarkMind />
      <MarkSlower />
      <Markfaster />
    </div>
  );
};

export default ChartPointComponent;
