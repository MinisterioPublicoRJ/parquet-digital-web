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

import {
  textDivToday,
  textDivDesk,
  textDivRadar,
  textDivAlerts,
  textDivMainInvestigated,
  textDivIndicators,
  textDivProcessingTime,
  textDivProcesses,
  textDivEnd,
} from './introduction.module.css';

// tipos de grid possíveis:
export const PIP_GRID = [
  { focus: 'today', component: <IntroductionResume />, class: textDivToday },
  { focus: 'desk', component: <IntroductionYourDesk />, class: textDivDesk },
  { focus: 'radar', component: <IntroductionPerfomanceRadar />, class: textDivRadar },
  { focus: 'alerts', component: <IntroductionAlerts />, class: textDivAlerts },
  { focus: 'mainInvestigated', component: <IntroductionMainInvestigated />, class: textDivMainInvestigated },
  { focus: 'indicators', component: <IntroductionSuccessIndicators />, class: textDivIndicators },
  { focus: 'processingTime', component: <IntroductionProcessingTime />, class: textDivProcessingTime },
  { focus: 'end', component: <ScreenGoodBye />, class: textDivEnd },
];
export const TUTELA_GRID = [
  { focus: 'today', component: <IntroductionResume />, class: textDivToday },
  { focus: 'desk', component: <IntroductionYourDesk />, class: textDivDesk },
  { focus: 'radar', component: <IntroductionPerfomanceRadar />, class: textDivRadar },
  { focus: 'alerts', component: <IntroductionAlerts />, class: textDivAlerts },
  { focus: 'processes', component: <IntroductionProcessList />, class: textDivProcesses },
  { focus: 'processingTime', component: <IntroductionProcessingTime />, class: textDivProcessingTime },
  { focus: 'end', component: <ScreenGoodBye />, class: textDivEnd },
];
