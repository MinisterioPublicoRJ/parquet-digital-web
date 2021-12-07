import React from 'react';

import IntroductionResume from './introductionResume';
import IntroductionPerfomanceRadar from './IntroductionPerfomanceRadar';
import IntroductionAlerts from './IntroductionAlerts';
import IntroductionYourDesk from './IntroductionYourDesk';
import IntroductionProcessList from './introductionProcessList';
import IntroductionProcessingTime from './IntroductionProcessingTime';
import IntroductionSuccessIndicators from './introductionSuccessIndicators';
import IntroductionMainInvestigated from './IntroductionMainInvestigated';
import ScreenGoodBye from './screenGoodBye';

// tipos de grid possíveis:
export const PIP_GRID = [
  { focus: 'today', component: <IntroductionResume /> },
  { focus: 'desk', component: <IntroductionYourDesk /> },
  { focus: 'radar', component: <IntroductionPerfomanceRadar /> },
  { focus: 'alerts', component: <IntroductionAlerts /> },
  { focus: 'mainInvestigated', component: <IntroductionMainInvestigated /> },
  { focus: 'indicators', component: <IntroductionSuccessIndicators /> },
  { focus: 'processingTime', component: <IntroductionProcessingTime /> },
  { focus: 'end', component: <ScreenGoodBye /> },
];
export const TUTELA_GRID = [
  { focus: 'today', component: <IntroductionResume /> },
  { focus: 'desk', component: <IntroductionYourDesk /> },
  { focus: 'radar', component: <IntroductionPerfomanceRadar /> },
  { focus: 'alerts', component: <IntroductionAlerts /> },
  { focus: 'processes', component: <IntroductionProcessList /> },
  { focus: 'processingTime', component: <IntroductionProcessingTime /> },
  { focus: 'end', component: <ScreenGoodBye /> },
];
