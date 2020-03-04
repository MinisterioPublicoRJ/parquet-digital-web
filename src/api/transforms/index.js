export { default as openCasesDetailsTransform } from './openCasesDetails';
export { default as courtCasesDetailsTransform } from './courtCasesDetails';
export { default as openInvestigationsDetailsTransform } from './openInvestigationsDetails';

export const closedCasesTransform = ({ suamesa_finalizados }) => suamesa_finalizados;
export const openCasesTransform = ({ suamesa_vistas }) => suamesa_vistas;
export const openInvestigationsTransform = ({ suamesa_investigacoes }) => suamesa_investigacoes;
export const courtCasesTransform = ({ suamesa_processos }) => suamesa_processos;
