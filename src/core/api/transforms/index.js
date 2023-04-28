export * from './loginTransform';

export { default as todayEntriesTransform } from './todayEntriesTransform';
export { default as todayOutliersTransform } from './todayOutliersTransform';
export { default as openCasesDetailsTransform } from './openCasesDetailsTransform';
export { default as deskTabTransform } from './deskTabTransforms';
export { default as courtCasesDetailsTransform } from './courtCasesDetailsTransform';
export { default as openInvestigationsDetailsTransform } from './openInvestigationsDetailsTransform';
export { default as openCasesListTransform } from './openCasesListTransform';
export { default as radarTransform } from './radarTransform';
export { default as pipRadarTransform } from './pipRadarTransform';
export { default as radarCriminalTransform } from './radarCriminalTransform';
export { default as alertsTransform } from './alertsTransform';
export { default as totalAlertsTransform } from './totalAlertsTransform';
export { default as hiresAlertsTransform } from './hiresAlertsTransform';
export { default as cavlAlertsTransform } from './cavlAlertsTransform';
export { default as misconductAlertsTransform } from './misconductAlertsTransform';
export { default as processingTimeTransform } from './processingTimeTransform';
export { default as processListTransform } from './processListTransform';
export { default as ongoingInvestigationsListTransform } from './ongoingInvestigationsListTransform';
export { default as successIndicatorsTransform } from './succesIndicatorsTransform';
export { default as investigatedProfileTransform } from './investigatedProfileTransform';
export { default as radarCompareTransform } from './radarCompareTransform';
export { default as snakeToCamelTransform } from './snakeToCamelTransform';

export const todayOutTransform = ({ percent_rank }) => percent_rank;

export const deskIntegratedTransform = ({ nr_documentos }) => nr_documentos;
