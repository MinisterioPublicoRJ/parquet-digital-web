/* eslint-disable camelcase */
export { default as alertsTransform } from './alertsTransform';
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

export const closedCasesTransform = ({ suamesa_finalizados }) => suamesa_finalizados;
export const courtCasesTransform = ({ suamesa_processos }) => suamesa_processos;
export const openCasesTransform = ({ suamesa_vistas }) => suamesa_vistas;
export const openInvestigationsTransform = ({ suamesa_investigacoes }) => suamesa_investigacoes;
export const todayOutTransform = ({ percent_rank }) => percent_rank;
