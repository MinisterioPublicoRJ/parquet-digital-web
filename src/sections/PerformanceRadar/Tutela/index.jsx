import React from 'react';

import RadarCommon from '../RadarCommon';
import Api from '../../../api';

const RadarTutelaHOC = props => <RadarCommon {...props} getRadarData={Api.getRadarData} />;

export default RadarTutelaHOC;
