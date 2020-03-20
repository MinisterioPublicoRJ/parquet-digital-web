export { default as todayEntriesTransform } from './todayEntries';
export { default as todayOutliersTransform } from './todayOutliers';
export { default as openCasesDetailsTransform } from './openCasesDetails';
export { default as courtCasesDetailsTransform } from './courtCasesDetails';
export { default as openInvestigationsDetailsTransform } from './openInvestigationsDetails';
export { default as alertsTransform } from './alertsTransform';

export const closedCasesTransform = ({ suamesa_finalizados }) => suamesa_finalizados;
export const openCasesTransform = ({ suamesa_vistas }) => suamesa_vistas;
export const openInvestigationsTransform = ({ suamesa_investigacoes }) => suamesa_investigacoes;
export const courtCasesTransform = ({ suamesa_processos }) => suamesa_processos;
export const todayOutTransform = ({ percent_rank }) => percent_rank;
export const openCasesListTransform = data => data;
