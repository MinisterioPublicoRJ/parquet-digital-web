import React, { useState, useEffect } from 'react';
import './styles.css';
import MarkMind from '../../assets/svg/markMind';
import Markfaster from '../../assets/svg/markFaster';
import MarkSlower from '../../assets/svg/markSlower';

const ChartPoint = () => {
  const [chartPointGraphic, setchartPointGraphic] = useState(null);

  const buildPoints = raw =>{
  }

  return (
    <div>
      <MarkMind />
      <MarkSlower />
      <Markfaster />
    </div>
  );
};

export default ChartPoint;
