import React from 'react';

import RadarCommon from '../RadarCommon';
import Api from '../../../api';

const RadarPipHOC = props => <RadarCommon {...props} getRadarData={Api.getPipRadarData} />;

export default RadarPipHOC;
