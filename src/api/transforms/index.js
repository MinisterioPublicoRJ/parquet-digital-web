export { default as alertsTransform } from './alertsTransform';
export { default as courtCasesDetailsTransform } from './courtCasesDetailsTransform';
export { default as openCasesDetailsTransform } from './openCasesDetailsTransform';
export { default as openInvestigationsDetailsTransform } from './openInvestigationsDetailsTransform';
export { default as processingTimeTransform } from './processingTimeTransform';
export { default as radarTransform } from './radarTransform';
export { default as todayEntriesTransform } from './todayEntriesTransform';
export { default as todayOutliersTransform } from './todayOutliersTransform';

export const closedCasesTransform = ({ suamesa_finalizados }) => suamesa_finalizados;
export const courtCasesTransform = ({ suamesa_processos }) => suamesa_processos;
export const processListTransform = data => data;
export const openCasesListTransform = data => data;
export const openCasesTransform = ({ suamesa_vistas }) => suamesa_vistas;
export const openInvestigationsTransform = ({ suamesa_investigacoes }) => suamesa_investigacoes;
export const todayOutTransform = ({ percent_rank }) => percent_rank;
