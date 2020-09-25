export { default as courtCasesDetailsTransform } from './courtCasesDetailsTransform';
export { default as openCasesDetailsTransform } from './openCasesDetailsTransform';
export { default as openInvestigationsDetailsTransform } from './openInvestigationsDetailsTransform';
export { default as processingTimeTransform } from './processingTimeTransform';
export { default as radarTransform } from './radarTransform';
export { default as pipRadarTransform } from './pipRadarTransform';
export { default as todayEntriesTransform } from './todayEntriesTransform';
export { default as todayOutliersTransform } from './todayOutliersTransform';
export { default as processListTransform } from './processListTransform';
export { default as openCasesListTransform } from './openCaseListTransform';
export { default as alertsTransform } from './alertsTransform';
export { default as totalAlertsTransform } from './totalAlertsTransform';
export { default as hiresAlertsTransform } from './hiresAlertsTransform';
export { default as successIndicatorsTransform } from './succesIndicatorsTransform';
export { default as deskTabTransform } from './deskTabTransforms';
export * from './loginTransform';
export { default as radarCompareTransform } from './radarCompareTransform';

export { default as snakeToCamelTransform } from './snakeToCamelTransform';
/* eslint-disable camelcase */
export const deskIntegratedTransform = ({ nr_documentos }) => nr_documentos;
export const todayOutTransform = ({ percent_rank }) => percent_rank;
